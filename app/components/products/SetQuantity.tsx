'use client'

import { CartProductType } from "@/app/product/[productId]/ProductDetails"

interface SetQtyProps {
  cartCounter: boolean
  cartProduct: CartProductType;
  handleQtyIncrease: () => void
  handleQtyDecrease: () => void
}




const SetQuantity: React.FC<SetQtyProps> = ({ cartCounter, cartProduct, handleQtyIncrease, handleQtyDecrease }) => {
  return (
    <div className="flex gap-8  items-center">
      {cartCounter ? null : <div className="font-semibold">QUANTITY:</div>}
      <div className="flex gap-4 items-center text-center">
        <button className="btn btn-sm rounded-md  btn-outline  hover:bg-primary duration-300 font-bold " onClick={handleQtyDecrease} >-</button>
        <div>{cartProduct.quantity}</div>
        <button className="btn btn-sm rounded-md  btn-outline  hover:bg-primary duration-300 font-bold " onClick={handleQtyIncrease} >+</button>

      </div>
    </div>
  )
}

export default SetQuantity