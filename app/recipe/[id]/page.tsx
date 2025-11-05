import Image from "next/image";
import { recipes } from "@/app/data/recipes";
import { ArrowLeft, Clock, Star } from "lucide-react";
import "./recipe.css"
import Link from "next/link";

export default async function RecipeDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // 👈 aspetta i params
const recipeId = parseInt(id)
const recipe = recipes.find((r)=> r.id === recipeId)
    if(!recipe)
        return (
    <div className="text-center text-white p-10">
            <p>Loading recipe...</p>
    </div>
        )

    return(
        <div className="detail-content">
            {/** back button */}
           <Link
        href="/home"
        className="recipe-btn"
      >
        <ArrowLeft className="mr-2" />
      </Link>
            {/**Recipe Header */}
            <div className="recipe-header">
                <Image
                    src={recipe.image}
                    alt={recipe.title}
                    width={300}
                    height={200}
                    className="recipe-img"
                    />
                <div>
                    <h1 className="recipe-title">
                        {recipe.title}
                    </h1>
                    <p className="recipe-time">
                        <Clock size={16}/> {recipe.time}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                        {Array.from({ length:5}, (_ , i)=> (
                            <Star
                                key={i}
                                size={18}
                                fill={i <Math.floor(recipe.rating ?? 0)? "#f4b860" : "none"}
                                stroke="#f4b860"
                                />
                        ))}
                    </div>
                </div>
            </div>
            {/**Ingredients */}
            <div className="ingred-inst">
<section className="mt-10">
                        <h2 className="text-xl font-semibold text-[#f4b860] mb-4">Ingredients</h2>
            <ul className=" ul grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                        {recipe.ingredients.map((ing: string, idx: number)=>(
                            <li key={idx} className="bg-[#1a1c1f] p-2 rounded-lg text-gray-300">
                                {ing}
                            </li>
                        ))}
            </ul>
            </section>
            {/** Steps */}
            <section className="mt-10 mb-20">
                <h2 className="text-xl font-semibold text-[#f4b860] mb-4">
                    Instructions
                </h2>
                <ol className=" ol space-y-3 text-sm">
                    {recipe.steps.map((step: string, idx: number)=>(
                        <li
                            key={idx}
                            className="bg-[#1a1c1f] p-3 rounded-lg text-gray-300 border-l-4 border-[#f4b860]">
                                <span className="font-bold text-[#f4b860] mr-2">{idx + 1}</span>
                                {step}
                        </li>
                    ))}
                </ol>
            </section>
            </div>
            
        </div>
    )
}

