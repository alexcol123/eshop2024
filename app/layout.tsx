import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Navbar from './components/nav/Navbar'
import Footer from './components/footer/Footer'
import CartProvider from '@/providers/CartProvider'
import { Toaster } from 'react-hot-toast'
//import { getCurrentUser } from '@/actions/getCurrentUser'


const poppins = Poppins({ subsets: ['latin'], weight: ["400", "700"] })

export const metadata: Metadata = {
  title: 'E-shop',
  description: 'Best deals on electronics',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

// const currentUser = await getCurrentUser()
// console.log('current user')
// console.log(currentUser)

  return (
    <html lang="en">
      <body className={`${poppins.className} text-base-secondary`}>
        < Toaster
          position="bottom-center"


          toastOptions={{
            style: {
              background: 'rgb(51 65 85)', color: '#fff'
            }
          }} />
        <CartProvider  >
          <div className='flex flex-col min-h-screen'>

            <Navbar />
            <main className='flex-grow' >   {children}</main>
            < Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
