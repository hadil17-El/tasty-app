"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Bookmark} from "lucide-react"
import "./profile.css"
import { div } from "framer-motion/client"

export default function ProfilePage(){
const router = useRouter()


const user = {
    name: "John Doe",
    email:"john@example.com",
    image:"/imgs/profile-avatar.jpg"
}

return (
    <div className="profile-container">
        <button onClick={()=> router.push("/home")}
                className="back-btn">
            <ArrowLeft size={22}/>
        </button>

        <div className="profile-header">
            <Image
                src={user.image}
                alt="User profile"
                width={120}
                height={120}
                className="profile-avatar"
                />

                <h2 className="user-name">{user.name}</h2>
                <p className="user-email">{user.email}</p>
        </div>
        {/* Sezioni*/}
        <div className="profile-actions">
            
            <button
                onClick={()=> router.push("/bookmarks")}
                className="profile-btn">
                <Bookmark size={20}/>
                <span>My Bookmarked Recipes</span>
            </button>

            <button className="profile-btn logout"
                    onClick={() => router.push("/")}>
                <span>Logout</span>
            </button>
        </div>
    </div>
)
}