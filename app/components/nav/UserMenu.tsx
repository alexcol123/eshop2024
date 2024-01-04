'use client'

import { useCallback, useState } from 'react'
import Avatar from '../Avatar'
import { AiFillCaretDown } from 'react-icons/ai'
import Link from 'next/link'
import MenuItem from './MenuItem'
import { signOut } from 'next-auth/react'
import Backdrop from './Backdrop'
import { SafeUser } from '@/types'
import { IoMdLogOut, IoMdLogIn } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa";
import { PiUserCirclePlusBold } from "react-icons/pi";

interface UserMenuProps {
  currentUser: SafeUser | null
}


const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {

  const [isOpen, setisOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setisOpen((prev) => !prev)
  }, [])

  return (
    <>
      <div className="relative z-30">
        <div onClick={toggleOpen}
          className='p-2 border-[1px]  border-primary flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md hover:shadow-primary transition  '
        >
          <Avatar src={currentUser?.image}/>
          <AiFillCaretDown />
        </div>

        {isOpen && (<div className='absolute  rounded-md shadow-md shadow-primary w-[170px] overflow-hidden right-0  top-12 text-sm flex flex-col cursor-pointer '>


          {currentUser ? <div>
            <Link href='/orders'>
              <MenuItem onClick={toggleOpen}>
                Your Orders
              </MenuItem>
            </Link>

            <Link href='/admin'>
              <MenuItem onClick={toggleOpen}>
                Admin Dashboard
              </MenuItem>

              <hr />
            </Link>

            <MenuItem onClick={() => { toggleOpen(), signOut() }}>
              <div className="flex items-center justify-start gap-2">
                Logout
                <IoMdLogOut size={22} className='rounded-full ' />
              </div>
            </MenuItem>

          </div> :

            <div>
              <Link href='/login'>
                <MenuItem onClick={toggleOpen}>
                  <div className="flex items-center justify-start gap-2">
                    Login
                    <IoMdLogIn size={22} className=' rounded-full ' />
                  </div>
                </MenuItem>
              </Link>

              <hr />

              <Link href='/register'>
              <MenuItem onClick={toggleOpen}>
                  <div className="flex items-center justify-start gap-2">
                    Register
                    <PiUserCirclePlusBold size={22} className=' rounded-full ' />
                  </div>
                </MenuItem>
              </Link>
            </div>}


        </div>
        )}
      </div>
      {isOpen ? <Backdrop onClick={toggleOpen} /> : null}
    </>
  )
}

export default UserMenu