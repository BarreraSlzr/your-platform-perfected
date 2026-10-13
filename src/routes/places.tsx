import { createFileRoute } from '@tanstack/react-router'
import { BuyerApp, buyerHead } from '@/components/buyer-app'
export const Route = createFileRoute('/places')({ head: () => buyerHead('My places', 'Keep your favorite neighborhood places close in your personal Grutikos space.'), component: () => <BuyerApp view="places"/> })