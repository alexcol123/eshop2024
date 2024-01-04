'use client'

import Heading from "@/app/components/Heading"
import Status from "@/app/components/Status"
import { formatPrice } from "@/utils/formatPrice"
import { Order } from "@prisma/client"
import moment from "moment"
import { useRouter } from "next/navigation"
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md"
import OrderItem from "./OrderItem"


interface OrderDetailProps {
  order: Order
}

const OrderDetails: React.FC<OrderDetailProps> = ({ order }) => {

  const router = useRouter()

  return (
    <div className="max-w-[1150px] m-auto flex flex-col gap-2 " >

      <div className="mt-8">
        <Heading title="Order Details" />
      </div>

      <div>Order ID: {order.id}</div>
      <div>Total Amount: <span className="font-bold">{formatPrice(order.amount)}</span></div>

      <div className="flex gap-4 items-center">
        <div>Payment Status</div>
        <div className="w-fit">
          {order.status === "pending" ?
            <Status text='pending' icon={MdAccessTimeFilled} bg='bg-slate-700 px-4' color='text-slate-200' /> :
            order.status === 'complete' ?
              <Status text='complete' icon={MdDone} bg='bg-green-700 px-4' color='text-green-200' /> :
              <></>
          }
        </div>
      </div>


      <div className="flex gap-4 items-center">
        <div>Delivery Status</div>
        <div className="w-fit">
          {order.deliveryStatus === "pending" ?
            <Status text='pending' icon={MdAccessTimeFilled} bg='bg-slate-700 px-4' color='text-slate-200' /> :
            order.deliveryStatus === 'dispatched' ?
              <Status text='dispatched' icon={MdDeliveryDining} bg='bg-purple-700 px-4' color='text-purple-200' /> :
              order.deliveryStatus === 'delivered' ?
                <Status text='delivered' icon={MdDeliveryDining} bg='bg-green-700 px-4' color='text-green-200' /> :
                <></>
          }
        </div>
      </div>

      <div>Date: {moment(order.createdDate).fromNow()}</div>

      <div>
        <h2 className="font-semibold mt-4 mb-2">Products Ordered:</h2>
        <div className="grid grid-cols-5 text-xs gap-4 p-2  items-center justify-center bg-primary/10 rounded  ">

          <div className="col-span-2  justify-self-start " >PRODUCT</div>
          <div className="justify-self-center" >PRICE</div>
          <div className="justify-self-center" >QTY</div>
          <div className="justify-self-end" >TOTAL</div>
        </div>
        {order.products && order.products.map((item) => {
          return < OrderItem key={item.id} item={item} />
        })}


      </div>


    </div>
  )
}

export default OrderDetails