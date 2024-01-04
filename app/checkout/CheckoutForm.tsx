'use client'

interface CheckoutFormProps {
  clientSecret: string,
  handlePaymentSuccess: (value: boolean) => void
}

import { useCart } from '@/hooks/useCart'
import { useState, useEffect } from 'react'

import {
  PaymentElement,
  AddressElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import toast from 'react-hot-toast';
import Heading from '../components/Heading';
import { formatPrice } from '@/utils/formatPrice';
import MyButton from '../components/MyButton';

const CheckoutForm: React.FC<CheckoutFormProps> = ({ clientSecret, handlePaymentSuccess }) => {

  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent, } = useCart()
  const stripe = useStripe()
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false)
  const formattedPrice = formatPrice(cartTotalAmount)

  useEffect(() => {
    if (!stripe) return
    if (!clientSecret) return
    handlePaymentSuccess(false)

  }, [stripe])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }


    setIsLoading(true)

    stripe.confirmPayment({
      elements, redirect: 'if_required'
    }).then(result => {
      if (!result.error) {
        toast.success('Payment successfull')
        handleClearCart()
        handlePaymentSuccess(true)
        handleSetPaymentIntent(null)
      }
      setIsLoading(false)
    })

  }


  return (
    <form onSubmit={handleSubmit} id='payment-form' className=''>
      <div className="mb-6">
        <Heading title='Enter your payment details to complete checkout' />
      </div>
      <h2 className='font-semibold  mb-2 text-center'>Address information</h2>
      <AddressElement options={{ mode: "shipping", allowedCountries: ['US'] }} />
      <h2 className='font-semibold mt-4 mb-2 text-center '>Payment information</h2>
      <PaymentElement id='payment-element' options={{ layout: 'tabs' }} />

      <div className='py-4 text-center font-bold text-xl'>
        total: {formattedPrice }
      </div>
      <MyButton label={isLoading? 'Processing':'Pay Now'} disabled={isLoading || !stripe || !elements} 
      onClick={()=> {}}
      />
    </form>
  )
}

export default CheckoutForm