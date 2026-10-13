// Illustrative catalog of events and places the recommender can choose from.
export type DiscoverItem = { id: string; kind: 'event' | 'place'; name: string; area: string; when?: string; tags: string[]; blurb: string }

export const discoverCatalog: DiscoverItem[] = [
  { id: 'e-latte-art', kind: 'event', name: 'Latte art morning at Café Luna', area: 'Roma Norte', when: 'Sat, Oct 17 · 10 AM', tags: ['coffee', 'workshop', 'morning'], blurb: 'Learn to pour hearts and tulips with the Luna baristas.' },
  { id: 'e-taco-night', kind: 'event', name: 'Seasonal taco tasting', area: 'Condesa', when: 'Fri, Oct 16 · 8 PM', tags: ['food', 'tacos', 'night'], blurb: 'A five-course tasting at Maíz & Fuego with mezcal pairings.' },
  { id: 'e-vinyl', kind: 'event', name: 'Vinyl & vermouth listening session', area: 'Juárez', when: 'Thu, Oct 15 · 7 PM', tags: ['music', 'drinks', 'night'], blurb: 'Jazz and bossa records spun on a hi-fi system.' },
  { id: 'e-market', kind: 'event', name: 'Sunday makers market', area: 'Coyoacán', when: 'Sun, Oct 18 · 11 AM', tags: ['shopping', 'crafts', 'family'], blurb: 'Local ceramics, textiles, and small-batch snacks.' },
  { id: 'e-run', kind: 'event', name: 'Chapultepec 5K social run', area: 'Chapultepec', when: 'Sat, Oct 17 · 7 AM', tags: ['fitness', 'outdoors', 'morning'], blurb: 'Easy-pace group run followed by coffee.' },
  { id: 'e-dia-muertos', kind: 'event', name: 'Papel picado workshop', area: 'San Rafael', when: 'Wed, Oct 21 · 6 PM', tags: ['culture', 'crafts', 'workshop'], blurb: 'Make your own decorations ahead of Día de Muertos.' },
  { id: 'p-pan', kind: 'place', name: 'Panadería Rosetta', area: 'Roma Norte', tags: ['bakery', 'coffee', 'morning'], blurb: 'Famous guava rolls and a cozy counter.' },
  { id: 'p-books', kind: 'place', name: 'Under the Volcano Books', area: 'Condesa', tags: ['books', 'quiet', 'culture'], blurb: 'Second-hand English and Spanish books.' },
  { id: 'p-mezcal', kind: 'place', name: 'La Clandestina mezcalería', area: 'Condesa', tags: ['drinks', 'night', 'mezcal'], blurb: 'Small-producer mezcal in a candlelit room.' },
  { id: 'p-market', kind: 'place', name: 'Mercado de Medellín', area: 'Roma Sur', tags: ['food', 'market', 'budget'], blurb: 'Regional produce and some of the city’s best fondas.' },
  { id: 'p-garden', kind: 'place', name: 'Huerto Roma Verde', area: 'Roma Sur', tags: ['outdoors', 'family', 'sustainability'], blurb: 'Community garden with weekend workshops.' },
  { id: 'p-vegan', kind: 'place', name: 'Forte Verde', area: 'Juárez', tags: ['food', 'vegan', 'healthy'], blurb: 'Plant-based tacos and fresh juices.' },
]
