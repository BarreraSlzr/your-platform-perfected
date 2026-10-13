import { createFileRoute } from '@tanstack/react-router'
import { BuyerApp, buyerHead } from '@/components/buyer-app'
export const Route = createFileRoute('/')({ head: () => buyerHead('Your everyday, connected', 'Your tickets, favorite places, rewards, and portable identity in one personal space.'), component: () => <BuyerApp view="home"/> })
