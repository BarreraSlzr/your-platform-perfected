import { useState } from 'react'
import { useServerFn } from '@tanstack/react-start'
import { CalendarDays, MapPin, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { discoverCatalog } from '@/lib/discover-catalog'
import { recommendForInterests, type Recommendation } from '@/lib/recommend.functions'

const examples = ['Slow coffee mornings and good books', 'Live music, mezcal, late nights', 'Family weekends outdoors']

export function DiscoverPanel() {
  const recommend = useServerFn(recommendForInterests)
  const [interests, setInterests] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [picks, setPicks] = useState<Recommendation[] | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError(''); setPicks(null)
    try {
      const r = await recommend({ data: { interests } })
      if (r.error) setError(r.error); else setPicks(r.picks)
    } catch (err) { setError(err instanceof Error ? err.message : 'Something went wrong.') }
    finally { setLoading(false) }
  }

  return <div className="profile-layout">
    <form className="profile-block" onSubmit={submit}>
      <h2>What are you into?</h2>
      <label htmlFor="interests">Describe your interests, mood, or plans</label>
      <textarea id="interests" className="search-input" rows={3} maxLength={600} required placeholder="e.g. I love specialty coffee, quiet bookstores and small workshops on weekends" value={interests} onChange={e => setInterests(e.target.value)} />
      <div className="filter-bar mt-3">{examples.map(x => <Button key={x} type="button" variant="outline" size="sm" onClick={() => setInterests(x)}>{x}</Button>)}</div>
      <Button className="mt-4" type="submit" disabled={loading || interests.trim().length < 3}><Sparkles />{loading ? 'Finding your picks…' : 'Get recommendations'}</Button>
      {error && <p role="alert" className="preview-note mt-3 text-destructive">{error}</p>}
    </form>
    {picks && <section className="profile-block">
      <h2>Picked for you</h2>
      {picks.length === 0 && <p className="preview-note">Nothing matched yet — try describing it differently.</p>}
      {picks.map(p => { const item = discoverCatalog.find(i => i.id === p.id)!; return <div key={p.id} className="connection-row">
        {item.kind === 'event' ? <CalendarDays className="text-primary" /> : <MapPin className="text-primary" />}
        <div><h3>{item.name}</h3><p>{item.kind === 'event' ? `${item.when} · ` : ''}{item.area}</p><p className="mt-1">{p.reason}</p></div>
      </div> })}
      <p className="preview-note mt-3">Suggestions come from a sample list of events and places.</p>
    </section>}
  </div>
}
