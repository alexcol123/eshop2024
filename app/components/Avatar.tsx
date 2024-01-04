

import Image from 'next/image'
import React from 'react'
import {FaUserCircle} from 'react-icons/fa'

interface AvatarProps {
  src?: string | null
  user?: string 
}

const Avatar: React.FC<AvatarProps> = ({ src, user }) => {

  if (src) {
    return <Image src={src} alt='avatar' className='rounded-full  w-10 h-10 object-cover' height={30} width={30} />
  }

   return ( <FaUserCircle  size={30}  /> )

  // return ( <div  className=' flex items-center justify-center w-10 h-10 text-slate-200 bg-primary rounded-full text-2xl font-bold'> {user?.substring(0,1)}</div> )


}

export default Avatar