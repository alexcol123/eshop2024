import Link from "next/link"
import Container from "../Container"
import ThemeToggle from "../ThemeToggle"

import { Redressed } from "next/font/google"
import CartCount from "./CartCount"
import UserMenu from "./UserMenu"
import { getCurrentUser } from "@/actions/getCurrentUser"
import Categories from "./Categories"
import SearchBar from "../SearchBar"

const redressed = Redressed({ subsets: ['latin'], weight: ['400'] })

const Navbar = async () => {

  const currentUser = await getCurrentUser()

  return (
    <div className="sticky top-0 w-full bg-base-300 z-30 shadow-sm border-b border-primary">

      <div className="py-4 border-b-1">
        <Container >

          <div className="flex items-center justify-between gap-3 md:gap-0  ">
            <Link href='/' className={`${redressed.className} font-bold text-2xl `} > <span className="text-primary" >SHOP</span>-EZ</Link>
            <div className="hidden md:flex" >
              <SearchBar />
            </div>
            <div className="flex items-center gap-3 md:gap-12">

              <div>
                < CartCount />
              </div>
              <div>CartCount</div>
              <UserMenu currentUser={currentUser} />
              < ThemeToggle />

            </div>
          </div>
        </Container>

      </div>

      {/* categories */}
      <Categories />
    </div>
  )
}

export default Navbar

