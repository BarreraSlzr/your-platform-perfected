import { createFileRoute } from '@tanstack/react-router'
import { BuyerApp, buyerHead } from '@/components/buyer-app'
export const Route = createFileRoute('/discover')({ head: () => buyerHead('Discover', 'Describe what you love and get personal picks for events and places in Mexico City.'), component: () => <BuyerApp view="discover"/> })
