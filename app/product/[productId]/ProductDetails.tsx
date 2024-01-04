'use client'

import MyButton from "@/app/components/MyButton"
import Ratings from "@/app/components/Ratings"
import ProductImages from "@/app/components/products/ProductImages"
import SetColor from "@/app/components/products/SetColor"
import SetQuantity from "@/app/components/products/SetQuantity"
import { useCart } from "@/hooks/useCart"
import { useRouter } from "next/navigation"
import { useState, useEffect, useReducer } from "react"
import { MdCheckCircle } from "react-icons/md"


interface ProductDetailsProps {
  product: any
}

export type CartProductType = {
  id: string
  name: string
  description: string
  category: string
  brand: string
  selectedImg: SelectedImgType
  quantity: number
  price: number

}

export type SelectedImgType = {
  color: string
  colorCode: string
  image: string
}


const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {

  console.log(product)

  const router = useRouter()

  const [isProductInCart, setisProductInCart] = useState(false)

  const { handleAddProductToCart, cartProducts } = useCart()





  const productRating = product?.reviews.reduce((acc: number, item: any) => (acc += item.rating / product.reviews.length), 0)

  useEffect(() => {
    setisProductInCart(false)

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex((item) => item.id === product.id)
      if (existingIndex > -1) {
        setisProductInCart(true)
      }

    }

  }, [cartProducts])



  const Horizontal = () => {
    return <hr className="w-60 opacity-80" />
  }


  const [cartProduct, setcartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  })

  const handleColorSelect = (value: SelectedImgType) => {
    setcartProduct((prev) => {
      return { ...prev, selectedImg: value }
    })
  }



  const handleQtyDecrease = () => {
    setcartProduct((prev) => {
      return { ...prev, quantity: prev.quantity <= 1 ? 1 : --prev.quantity }
    })
  }

  const handleQtyIncrease = () => {

    setcartProduct((prev) => {
      return { ...prev, quantity: prev.quantity > 25 ? 25 : ++prev.quantity }
    })

  }

  const cartCounter = () => {

  }




  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-10">
      {/* Images */}
      <ProductImages cartProduct={cartProduct} product={product} handleColorSelect={handleColorSelect} />

      {/* Details */}
      <div className="flex flex-col  items-start justify-center gap-2">
        <h2 className="text-3xl font-medium">{product.name}</h2>
        <div className="flex items-center justify-center gap-2" >
          <Ratings productRating={productRating} />
          {product.reviews.length} reviews
        </div>
        < Horizontal />
        <div className="text-justify opacity-80" >{product.description}</div>
        < Horizontal />
        <>
          <div >
            <span className="font-semibold mr-2 ">CATEGORY:</span>{product.category}
          </div>
          <div >
            <span className="font-semibold mr-2 ">Brand:</span>{product.brand}
          </div>
          <div >
            <span className="font-semibold mr-2 ">Availability:</span  >
            <span className={!product.inStock ? 'text-red-500' : 'text-secondary'}>{product.inStock ? 'In Stock' : "Out of Stock"} </span>
          </div>
        </>
        < Horizontal />

        {isProductInCart
          ?
          <>
          <p className="mb-2 text-primary flex  items-center gap-1">
            < MdCheckCircle size={20} className="text-accent" />
            <span>Product Added to cart </span>
   
          </p>
          <div className="w-[350px]">
          <MyButton
                onClick={() => router.push('/cart')}
                label="View In Cart"
                outline
              />
          </div>

          </>
          :
          <>
            <SetColor cartProduct={cartProduct} images={product.images} handleColorSelect={handleColorSelect} />

            < Horizontal />
            <SetQuantity
              cartProduct={cartProduct}
              handleQtyDecrease={handleQtyDecrease}
              handleQtyIncrease={handleQtyIncrease}
              cartCounter={cartCounter}
            />

            < Horizontal />
            <div className="w-[350px]">
              <MyButton
                onClick={() => handleAddProductToCart(cartProduct)}
                label="Add To Cart"
              />
            </div>
          </>
        }

      </div>
    </div >
  )
}

export default ProductDetails