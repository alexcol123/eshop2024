import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { products } from "@/utils/products";
import { log } from "console";
import { createContext, useCallback, useContext, useState, useEffect } from "react";
import toast from 'react-hot-toast';

interface CartContextType {
  cartTotalQty: number
  cartTotalAmount: number
  cartProducts: CartProductType[] | null
  handleAddProductToCart: (product: CartProductType) => void
  handleRemoveProductFromCart: (product: CartProductType) => void
  handleQtyIncrease: (product: CartProductType) => void
  handleQtyDecrease: (product: CartProductType) => void
  handleClearCart: () => void
  paymentIntent: string | null
  handleSetPaymentIntent: (val: string | null) => void

}

export const CartContext = createContext<CartContextType | null>(null)


interface Props {
  [propName: string]: any
}

export const CartContextProvider = (props: Props) => {

  const [cartTotalAmount, setcartTotalAmount] = useState(0)
  const [cartTotalQty, setcartTotalQty] = useState(0)
  const [cartProducts, setcartProducts] = useState<CartContextType[] | null>(null)


  const [paymentIntent, setPaymentIntent] = useState<string | null>(null)


  useEffect(() => {
    const cartItems: any = localStorage.getItem('eShopCartItems')
    const cProducts: CartProductType[] | null = JSON.parse(cartItems)

    const eshopPaymentIntent: any = localStorage.getItem('eShopPaymentIntent')
    const paymentIntent: string | null = JSON.parse(eshopPaymentIntent)

    setcartProducts(cProducts)
    setPaymentIntent(paymentIntent)
  }, [])


  useEffect(() => {

    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce((acc, item) => {
          const itemTotal = item.price * item.quantity

          acc.total += itemTotal
          acc.qty += item.quantity

          return acc

        }, { total: 0, qty: 0 })

        setcartTotalAmount(total)
        setcartTotalQty(qty)
      }
    }

    getTotals()
  }, [cartProducts])



  // console.log({
  //   cartTotalAmount,
  //   cartTotalQty
  // })


  const handleAddProductToCart = useCallback((product: CartProductType) => {

    setcartProducts((prev) => {
      let updatedCart
      if (prev) {
        updatedCart = [...prev, product]
      } else {
        updatedCart = [product]
      }
      localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))

      return updatedCart
    })
    return toast.success('Product added to cart.');
  }, [])


  const handleRemoveProductFromCart = useCallback((product: CartProductType) => {

    // console.log('CART-PRODUCTS ============>>>')
    // console.log(cartProducts)
    // console.log(cartProducts)

    if (cartProducts) {
      const filteredProducts = cartProducts.filter((item) => {

        return item.id !== product.id
      })

      setcartProducts(filteredProducts)

      localStorage.setItem('eShopCartItems', JSON.stringify(filteredProducts))
    }


    return toast.success('cart is empty.');
  }, [cartProducts])


  const handleQtyIncrease = useCallback((product: CartProductType) => {

    let updatedCart

    if (product.quantity >= 20) {
      return toast.error(" Opps! Maximun reached", { id: 'addProduct' })
    }
    if (cartProducts) {
      updatedCart = [...cartProducts]

      const exitstingIndex = cartProducts.findIndex((item) => item.id === product.id)

      if (exitstingIndex > -1) {
        updatedCart[exitstingIndex].quantity = ++updatedCart[exitstingIndex].quantity
      }

      setcartProducts(updatedCart)
      localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))

    }

    return toast.success('Product added to cart.', { id: 'addProduct' });
  }, [cartProducts])


  const handleQtyDecrease = useCallback((product: CartProductType) => {

    let updatedCart

    if (product.quantity === 1) {
      return toast.error(" Opps! Minimun reached", { id: 'removeProduct' })
    }
    if (cartProducts) {
      updatedCart = [...cartProducts]

      const exitstingIndex = cartProducts.findIndex((item) => item.id === product.id)

      if (exitstingIndex > -1) {
        updatedCart[exitstingIndex].quantity = --updatedCart[exitstingIndex].quantity
      }

      setcartProducts(updatedCart)
      localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))

    }

    return toast.success('Product removed from cart.', { id: 'removeProduct' });
  }, [cartProducts])


  const handleClearCart = useCallback(() => {

    setcartProducts(null)
    setcartTotalQty(0)

    localStorage.setItem('eShopCartItems', JSON.stringify(null))

    return toast.success('Product removed from cart.', { id: 'removeProduct' });
  }, [cartProducts])


  const handleSetPaymentIntent = useCallback((val: string | null) => {
    setPaymentIntent(val)
    localStorage.setItem('eShopPaymentIntent', JSON.stringify(val))
  }, [cartTotalAmount])


  const value = {
    cartTotalQty,
    cartProducts,
    cartTotalAmount,
    paymentIntent,

    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleQtyIncrease,
    handleQtyDecrease,
    handleClearCart,
    handleSetPaymentIntent
  }

  return <CartContext.Provider value={value} {...props} />
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (context === null) {
    throw new Error('userCart must be use within a CartContextProvider')
  }


  return context
}