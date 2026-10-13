import { createFileRoute } from '@tanstack/react-router'
import { BuyerApp, buyerHead } from '@/components/buyer-app'
export const Route = createFileRoute('/rewards')({ head: () => buyerHead('My rewards', 'Discover little thank-yous and loyalty rewards from the places you love.'), component: () => <BuyerApp view="rewards"/> })