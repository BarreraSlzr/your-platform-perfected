import cafe from '@/assets/cafe.jpg'
import tacos from '@/assets/tacos.jpg'

export const places = [
  { id: 'luna', name: 'Café Luna', category: 'Coffee & slow mornings', area: 'Roma Norte', image: cafe, icon: '☕', visits: 6 },
  { id: 'maiz', name: 'Maíz & Fuego', category: 'A little heat. A lot of heart.', area: 'Condesa', image: tacos, icon: '🌮', visits: 3 },
]
export const tickets = [
  { id: 'GL-02481', place: 'Café Luna', date: 'Today, 9:42 AM', amount: '$145.00', items: ['Flat white · $65.00', 'Almond croissant · $80.00'], image: cafe, status: 'Paid', category: 'Coffee' },
  { id: 'GL-02463', place: 'Maíz & Fuego', date: 'Oct 11, 2026 · 2:15 PM', amount: '$280.00', items: ['Seasonal tacos · $220.00', 'Agua fresca · $60.00'], image: tacos, status: 'Paid', category: 'Food' },
  { id: 'GL-02402', place: 'Café Luna', date: 'Oct 8, 2026 · 10:08 AM', amount: '$65.00', items: ['Flat white · $65.00'], image: cafe, status: 'Paid', category: 'Coffee' },
] as const
export type BuyerTicket = typeof tickets[number]