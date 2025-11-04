"use client"
import { useEffect, useState} from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Trash2 } from "lucide-react"
import "./bookmark.css"
export default function BookmarksPage() {
    const [bookmarks, setBookmarks] = useState<any[]>([])
    const router = useRouter();

    useEffect(()=>{
        const saved = JSON.parse(localStorage.getItem("bookmarks" )|| "[]");
    setBookmarks(saved);

    },[])

    const removeBookmark = (id: number) => {
        const updated = bookmarks.filter((r)=> r.id !== id);
    setBookmarks(updated);
localStorage.setItem("bookmarks", JSON.stringify(updated))
    }
if(bookmarks.length === 0) {
    return (
        <div className="p-6 flex flex-col items-center">
            <button onClick={()=> router.push("/home")}
                className="back-btn">
                <ArrowLeft size={20}/>
            </button>
            <p>
                Nessun segnalibro salvato
            </p>
        </div>
    )
}

return (
    <div className="bookmark-page">
   <button
            onClick={()=> router.push("/home")}
            className="back-btn">
            <ArrowLeft size={20}/>
        </button>
        <h1 className="bookmark-title">I tuoi segnalibri</h1>
         
        <div className="bookmark-list">
            {
                bookmarks.map((recipe)=>(
                    <div key={recipe.id}
                        className="bookmark-recipe">
                            <div className="b-header">
                                <div className="b-info">
                                    <h2 className="b-title">{recipe.title}</h2>
                                    <p>{recipe.time}</p>
                                </div>
                       
                            </div>
                                    <button
                                onClick={()=> removeBookmark(recipe.id)}
                                className="remove-bookmark">
                                <Trash2 size={18} />
                            </button>
                            <div className="b-content">
<Image
                                src={recipe.image}
                                alt={recipe.title}
                                width={250}
                                height={250}
                                className="bookmark-image"
                                />
                        
                            <div className="b-details">
                                <h3 className="ing-title">
                                    Ingredienti:
                                </h3>
                                 <ul>
                                {recipe.ingredients?.map((ing: string, i: number)=>(
                                    <li key={i}>{ing}</li>
                                ))}
                            </ul>
                            <h3 className="passaggi-title">Passaggi:</h3>
                            <ol>
                                {recipe.steps?.map((step: string, i:number)=>(
                                    <li key={i}>{step}</li>
                                ))}
                            
                            </ol>

                            </div>
                            </div>
                            
                           
                    </div>
                ))
            }
        </div>
    </div>
)
}