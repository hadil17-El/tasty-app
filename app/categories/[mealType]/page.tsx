"use client";

import { useRouter } from "next/navigation";
import { recipes } from "@/app/data/recipes";
import Image from "next/image";
import "./mealType.css";
import { useState, useEffect } from "react";
import { Bookmark, ArrowLeft, BookmarkCheck } from "lucide-react";

export default function MealCategoryPage({
  params,
}: {
  params: { mealType: string };
}) {
  const router = useRouter();
  const [openRecipeId, setOpenRecipeId] = useState<number | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<number[]>([]); // ✅ mantiene ID multipli

  const { mealType } = params;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setSavedRecipes(stored.map((r: any) => r.id));
  }, []);

  // 🧠 Logica di aggiunta/rimozione singola ricetta
  const toggleBookmark = (e: React.MouseEvent, recipe: any) => {
    e.stopPropagation(); // evita l’apertura dei dettagli
    const stored = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    const exists = stored.find((r: any) => r.id === recipe.id);

    let updated;
    if (exists) {
      updated = stored.filter((r: any) => r.id !== recipe.id);
    } else {
      updated = [...stored, recipe];
    }

    // salva su localStorage e aggiorna stato locale senza toccare gli altri
    localStorage.setItem("bookmarks", JSON.stringify(updated));
    setSavedRecipes(updated.map((r: any) => r.id));
  };

  const formattedMealType =
    mealType.charAt(0).toUpperCase() + mealType.slice(1);
  const filtered = recipes.filter(
    (r) => r.mealType?.toLowerCase() === formattedMealType.toLowerCase()
  );

  const groupedByCountry = filtered.reduce((acc: any, recipe) => {
    if (!acc[recipe.category]) acc[recipe.category] = [];
    acc[recipe.category].push(recipe);
    return acc;
  }, {});

  return (
    <div className="meal-page">
      <button onClick={() => router.push("/home")} className="back-btn">
        <ArrowLeft size={24} />
      </button>
      <h1 className="page-title">{mealType} Recipes</h1>

      {Object.keys(groupedByCountry).map((country) => (
        <div key={country} className="meal-section">
          <h2 className="meal-title">{country}</h2>
          <div className="meal-grid">
            {groupedByCountry[country].map((r: any) => {
              const isSaved = savedRecipes.includes(r.id); // ✅ controlla singolarmente
              return (
                <div
                  key={r.id}
                  onClick={() =>
                    setOpenRecipeId(openRecipeId === r.id ? null : r.id)
                  }
                  className="recipe-card"
                >
                  <Image
                    src={r.image}
                    alt={r.title}
                    width={200}
                    height={150}
                    className="image"
                    priority={r.id === 1}
                  />
                  <h4 className="recipe-title">{r.title}</h4>
                  <p className="recipe-time">{r.time}</p>

                  <button
                    onClick={(e) => toggleBookmark(e, r)}
                    className="bookmark-btn"
                  >
                    {isSaved ? (
                      <>
                        <BookmarkCheck size={20} />
                        <span>Bookmarked</span>
                      </>
                    ) : (
                      <>
                        <Bookmark size={20} />
                        <span>Add to Bookmark</span>
                      </>
                    )}
                  </button>

                  {openRecipeId === r.id && (
                    <div className="recipe-details">
                      <h5 className="font-semibold mt-2 text-[#f4b860]">
                        Ingredients:
                      </h5>
                      <ul className="list-disc list-inside">
                        {r.ingredients.map((ing: string, i: number) => (
                          <li key={i}>{ing}</li>
                        ))}
                      </ul>

                      <h5 className="font-semibold mt-2 text-[#f4b860]">
                        Steps:
                      </h5>
                      <ol className="list-decimal list-inside">
                        {r.steps.map((step: string, i: number) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
