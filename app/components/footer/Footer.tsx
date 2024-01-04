import Link from "next/link"
import Container from "../Container"
import FooterList from "./FooterList"

import { MdFacebook } from 'react-icons/md'
import { AiFillTwitterCircle, AiFillInstagram, AiFillYoutube } from 'react-icons/ai'

const Footer = () => {
  return (
    <footer className="bg-base-300  text-sm mt-16">
      < Container >
        <div className="flex flex-col  md:flex-row justify-between pt-16 pb-8 ">

          < FooterList >
            <h3 className=" text-primary text-base font-bold mb-2">Shop Categories</h3>
            < Link href='#' className="hover:text-accent"> Phones</Link>
            < Link href='#' className="hover:text-accent"> Laptops</Link>
            < Link href='#' className="hover:text-accent"> Desktops</Link>
            < Link href='#' className="hover:text-accent"> Watches</Link>
            < Link href='#' className="hover:text-accent"> TVs</Link>
            <Link href='#' className="hover:text-accent"> Accessories</Link>
          </FooterList>

          < FooterList >
            <h3 className=" text-primary text-base font-bold mb-2">Custormer Service</h3>
            < Link href='#' className="hover:text-accent"> Contact Us</Link>
            < Link href='#' className="hover:text-accent"> Shipping Policy</Link>
            < Link href='#' className="hover:text-accent"> Returns & Exchange</Link>
            < Link href='#' className="hover:text-accent"> Watches</Link>
            < Link href='#' className="hover:text-accent"> FAQS</Link>
          </FooterList>

          < div className="w-full md:w-1/3  mb-6 md:mb-0" >
            <h3 className=" text-primary text-base font-bold mb-2">About Us</h3>
            <p className="mb-2">At our electronics store, we are dedicated to providing the latest and greatest devices and accessories to our customers. With a wide selection of phones, TVs, Laptops, and accesories!</p>

            <p>&copy; {new Date().getFullYear()} SHOP-EZ. All rights reserved.</p>
          </div>

          < FooterList >
            <h3 className=" text-primary text-base font-bold mb-2">Follow Us</h3>
            <div className="flex gap-2">

              <Link href='#' className="hover:text-accent">
                <MdFacebook size={24} />
              </Link>



              <Link href='#' className="hover:text-accent">
                <AiFillTwitterCircle size={24} />
              </Link>

              <Link href='#' className="hover:text-accent">
                <AiFillInstagram size={24} />
              </Link>

              <Link href='#' className="hover:text-accent">
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </FooterList>


        </div>
      </Container>
    </footer>
  )
}

export default Footer