"use client"; 
import { useState } from "react"; 
import Image from "next/image"; 
import Link from "next/link"; 
import "./home.css"; 
import { Search, SlidersHorizontal, Home, Calendar, ShoppingCart, Bookmark } from "lucide-react"; 
import { FiClock } from "react-icons/fi"; 
import { useRouter } from "next/navigation"; 
import { recipes } from "../data/recipes"; 
import { usePathname } from "next/navigation"; 
import { User } from "lucide-react";
import Navbar from "../components/Navbar"; 
import SmartSuggest from "../components/SmartSuggest";

export default function HomePage() { 
  const pathname = usePathname() 
  const cuisines = ["All", "Italian", "Thai", "Indian", "Middle east"]; 
  const [selectedCategory, setSelectedCategory] = useState("All"); 
  const router = useRouter() 
  const [filterTime, setFilterTime] = useState("All")
   const [showFilters, setShowFilters] = useState(false) 
   const categories = [ { id: 1, name: "Breakfast", image: "/imgs/breakfast.jpg" },
     { id: 2, name: "Meal", image: "/imgs/meal.jpg" }, 
     { id: 3, name: "Dessert", image: "/imgs/dessert.jpg" }, 
   ]
     const [searchTerm, setSearchTerm] = useState("") 
     const [selectedRecipe, setSelectedRecipe] = useState(null) // ✅ Corretto: filtriamo in base al valore di category
     
     const filteredRecipes = recipes.filter((r)=> { 
      const matchCategory = selectedCategory === "All" || r.category === selectedCategory 
      const matchSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || r.category.toLowerCase().includes(searchTerm.toLowerCase()) || r.mealType?.toLowerCase().includes(searchTerm.toLowerCase() || "")
      
      let matchTime = true;
      if (r.time) { // solo se r.time esiste
    // estrai numero dai minuti (es: "30 min" -> 30)
    const timeNumber = parseInt(r.time.replace(/\D/g, ""), 10);

    if (filterTime === "under30") {
      matchTime = timeNumber <= 30;
    } else if (filterTime === "under60") {
      matchTime = timeNumber <= 60;
    }
  }
      return matchCategory && matchSearch && matchTime; 
      })



       return ( <div className="min-h-screen bg-[#0f1114] text-white px-5 pb-24"> 
               
                 <button
                    onClick={()=> router.push("/profile")}
                    className="profile-icon">
                  <User size={24} />
                 </button>
                  {/* Header */} 
                <div className="pt-10"> 
                  <h1 className="home-title text-3xl font-bold text-[#f4b860]">testy</h1> 
                  <h2 className="home-subtitle text-lg text-gray-300 mt-1"> What do you want to cook today? </h2> 
               
                  </div> 
                {/* Search bar */}
              <div className="mt-6">
  <div className="flex items-center bg-[#1a1c1f] rounded-full px-4 py-3 search-bar">
    <Search size={18} />
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search your recipes"
      className="input flex-1 bg-transparent outline-none px-3 text-sm"
    />

   
      <SlidersHorizontal
        onClick={() => setShowFilters(true)}
        className="slider-horizontal"
        size={18}
      />
  {/* 🔥 Quando showFilters è vero, mostra il filtro */}
  {showFilters && (
    <div className="filter-menu bg-[#1a1c1f] p-4 roundede-lg mt-2"> 
    <select className="select-filter" 
    onChange={(e)=> setFilterTime(e.target.value)}
    >
       <option value="all">All</option> 
       <option value="under30">Under 30 min</option> 
       <option value="under60">Under 1 hour</option> 
       </select> 
  </div> 
) }
 </div>
  </div>

                                 {/* Cuisine Filters */}
                                 <div className="mt-6"> 
                                  <div className="cuisine-filters flex gap-3 overflow-x-auto no-scrollbar"> 
                                    {cuisines.map((cat) => ( 
                                          <button key={cat} 
                                                  onClick={() => setSelectedCategory(cat)} 
                                                  className={`btn-cuisine ${ selectedCategory === cat ? "active" : "" }`} > 
                                                  {cat} </button>
                                                   ))} 
                                                   </div> 
                                                   </div> 
                            {/* Popular Recipes */} 
                            <div className="popular-section mt-8">
                             <h3 className="text-lg font-semibold mb-3 text-[#f4b860]"> Popular today </h3> 
                             <div className="popular-list flex gap-4 overflow-x-auto no-scrollbar"> 
                              {filteredRecipes.map((r) => (
                                   < Link key={r.id} href={`/recipe/${r.id}`} 
                                        className="recipe-card"> 
                                      <Image src={r.image} alt={r.title} width={180} height={120} 
                                            className="rounded-xl mb-2 object-cover" 
                                            /> 
                                        <h4 className="recipe-title text-sm font-semibold">{r.title}</h4> 
                                        <p className="time text-xs mt-1 flex items-center justify-center gap-1"> 
                                          <FiClock className="icon" />
                                           {r.time} 
                                           </p> 
                                           </Link>
                                            ))} 
                                            </div> 
                                            {filteredRecipes.length === 0 && ( 
                                              <p className="text-center text-gray-400 mt-4">
                                                No recipes found for "{searchTerm}"
                                                </p>
                                                 )} 
                                                 </div> 
                                  {/* Categories */} 
                                  <div className="mt-8"> 
                                    <h3 className="text-lg font-semibold mb-3 text-[#f4b860]">Categories</h3> 
                                    <div className="categories-list flex gap-4 overflow-x-auto no-scrollbar"> 
                                      {categories.map((c) => (
                                         <div key={c.id} className=" category-card flex flex-col items-center" 
                                              onClick={()=> router.push(`/categories/${c.name.toLowerCase()}`)}
                                              > 
                                            <Image src={c.image} alt={c.name} width={100} height={100} 
                                                    className=" w-[120px] h-[120px] rounded-2xl object-cover mb-2" 
                                                    /> 
                                                <div className="category-overlay"> 
                                                <span className="categroy-name">{c.name}</span> 
                                                </div> 
                                                </div> 
                                                ))}
                                                 </div>
                                                  </div>
                                                   <Navbar/>
                                                    
                                  <SmartSuggest />
                                 
                                 
                          </div>
                                                     
                        ); }
