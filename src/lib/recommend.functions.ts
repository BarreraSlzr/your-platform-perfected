import { createServerFn } from '@tanstack/react-start'
import { discoverCatalog } from './discover-catalog'

export type Recommendation = { id: string; reason: string }
export type RecommendResult = { picks: Recommendation[]; error?: string }

const schema = {
  type: 'object', additionalProperties: false, required: ['picks'],
  properties: { picks: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['id', 'reason'], properties: { id: { type: 'string' }, reason: { type: 'string' } } } } },
}

export const recommendForInterests = createServerFn({ method: 'POST' })
  .inputValidator((input: { interests: string }) => {
    const interests = String(input?.interests ?? '').trim()
    if (interests.length < 3) throw new Error('Tell us a little more about what you enjoy.')
    return { interests: interests.slice(0, 600) }
  })
  .handler(async ({ data }): Promise<RecommendResult> => {
    const apiKey = process.env['LOVABLE_API_KEY']
    if (!apiKey) return { picks: [], error: 'Recommendations are not configured yet.' }
    const catalog = discoverCatalog.map(({ id, kind, name, area, when, tags, blurb }) => ({ id, kind, name, area, when, tags, blurb }))
    const res = await fetch('https://ai.gateway.lovable.dev/v1/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Lovable-API-Key': apiKey, 'X-Lovable-AIG-SDK': 'fetch' },
      body: JSON.stringify({
        model: 'openai/gpt-6-astra', stream: true, store: false, reasoning: { effort: 'low' },
        instructions: 'You recommend events and places in Mexico City to a buyer. Choose 3 to 5 items ONLY from the provided catalog, by id. For each, write one warm, specific sentence (max 25 words) explaining why it fits their interests. Reply in the language the buyer wrote in.',
        input: `Buyer interests: ${data.interests}\n\nCatalog:\n${JSON.stringify(catalog)}`,
        text: { format: { type: 'json_schema', name: 'recommendations', strict: true, schema } },
      }),
    })
    if (!res.ok || !res.body) {
      const body = await res.text().catch(() => '')
      console.error('AI gateway error', res.status, body)
      const msg = res.status === 429 ? 'Lots of requests right now — try again in a moment.' : res.status === 402 ? 'AI credits are used up for this workspace.' : 'We couldn’t get recommendations right now.'
      return { picks: [], error: msg }
    }
    // Consume SSE stream server-side and accumulate the final text.
    const reader = res.body.getReader(); const dec = new TextDecoder(); let buf = ''; let text = ''; let refused = false
    for (;;) {
      const { done, value } = await reader.read(); if (done) break
      buf += dec.decode(value, { stream: true })
      let idx
      while ((idx = buf.indexOf('\n\n')) >= 0) {
        const frame = buf.slice(0, idx); buf = buf.slice(idx + 2)
        for (const line of frame.split('\n')) {
          if (!line.startsWith('data:')) continue
          const payload = line.slice(5).trim(); if (!payload || payload === '[DONE]') continue
          try {
            const ev = JSON.parse(payload)
            if (ev.type === 'response.output_text.delta') text += ev.delta
            else if (ev.type === 'response.refusal.delta') refused = true
            else if (ev.type === 'response.failed' || ev.type === 'error') console.error('AI stream error', payload)
          } catch { /* ignore partial */ }
        }
      }
    }
    if (refused) return { picks: [], error: 'We can’t make recommendations for that request.' }
    try {
      const parsed = JSON.parse(text) as { picks: Recommendation[] }
      const ids = new Set(discoverCatalog.map(i => i.id))
      return { picks: parsed.picks.filter(p => ids.has(p.id)).slice(0, 5) }
    } catch {
      return { picks: [], error: 'We couldn’t read the recommendations. Please try again.' }
    }
  })
