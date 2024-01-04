import { IoStar, IoStarHalfOutline, IoStarOutline } from "react-icons/io5";

const Ratings = ({ productRating }: { productRating: number }) => {



  const startsList = []


  for (let i = 1; i <= 5; i++) {

    if (productRating >= .75) {
      startsList.push('1')
      productRating--
    } else if (productRating >= .3 && productRating < .75) {
      startsList.push('1/2')
      productRating--
    } else {
      startsList.push('0')
      productRating--
    }
  }



  return (
    <div className="flex mt-1 mb-2 gap-1 items-center justify-center ">

      {startsList.map((item, index) => {
        if (item === '1') return <IoStar
          key={index} className="text-yellow-500" size={17} />
        else if (item === '1/2') return <IoStarHalfOutline
          size={17} key={index} className="text-yellow-500" />
        else if (item === '0') return <IoStarOutline
          key={index} size={17} className="text-yellow-500" />
      })}

    </div>
  )
}

export default Ratings