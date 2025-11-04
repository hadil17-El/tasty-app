"use client"
import { useRouter, usePathname } from "next/navigation"
import { Home, Calendar, ShoppingCart, Bookmark} from "lucide-react"

export default function Navbar() {
const router = useRouter();
const pathname= usePathname()
    return(
       
      <div className="navbar">
        <button onClick={() => router.push("/home")} className={`home-btn ${pathname === "/home" ? "active" : ""}`}>
          <Home size={20} />
          Home
        </button>
        <button onClick= {() => router.push("/shopping")} className={`shopping-btn ${pathname === "/shopping" ? "active" : ""}`}>
          <ShoppingCart size={20} />
          Shopping list
        </button>
        <button  onClick= {() => router.push("/planner")} className={`calendar-btn  ${pathname === "/planner" ? "active" : ""}`}>{/**Il pulsante “Planner” sarà evidenziato solo quando ti trovi su /planner. */}
          <Calendar size={20} />
          Planner
        </button>
        <button  onClick={()=> router.push("/bookmarks")} className={`book-btn ${pathname === "/bookmark" ? "active" : ""}`}>
          <Bookmark size={20} />
          Bookmark
        </button>
      </div>
    )
}