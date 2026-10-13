import { createFileRoute } from '@tanstack/react-router'
import { BuyerApp, buyerHead } from '@/components/buyer-app'
export const Route = createFileRoute('/tickets')({ head: () => buyerHead('My tickets', 'Revisit your purchases and bring your tickets together across your favorite places.'), component: () => <BuyerApp view="tickets"/> })