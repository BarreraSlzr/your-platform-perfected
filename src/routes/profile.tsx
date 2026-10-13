import { createFileRoute } from '@tanstack/react-router'
import { BuyerApp, buyerHead } from '@/components/buyer-app'
export const Route = createFileRoute('/profile')({ head: () => buyerHead('My portable profile', 'Manage your personal profile and explore portable identity connections with Grutikos.'), component: () => <BuyerApp view="profile"/> })