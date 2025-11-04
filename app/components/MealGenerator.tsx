"use client"

import { useState } from "react"
import { recipes } from "../data/recipes"
import { div } from "framer-motion/client"

export default function MealGenerator() {
    const [days, setDays] = useState(3)
    const [mealsPerDay, setMealsPerDay] = useState(3)
    const [plan, setPlan] = useState<any[]>([])


    const generate = () => {
     const pool = [...recipes]
     const newPlan: any[] = []
     
     for (let d= 0; d< days; d++) {
        const dayMeals: any[]= []
        for (let m = 0; m < mealsPerDay; m++) {
            if (pool.length === 0) break
            const idx = Math.floor(Math.random() * pool.length)
            const chosen = pool.splice(idx, 1)[0]
            dayMeals.push(chosen)
        }
        setPlan(newPlan)
     }

     return(
        <div className="meak-gen">
            <h3>Genera un piano pasti</h3>
            <div style={{ display: "flex", gap:8, marginBottom:8}}>
                    <input type="number"
                            min={1}
                            max={14}
                            value={days}
                            onChange={(e)=> setDays(Number(e.target.value))} />
                    <input type="number"
                            min={1}
                            max={5}
                            value={mealsPerDay}
                            onChange={(e)=> setMealsPerDay(Number(e.target.value))} />        
                    <button onClick={generate}>Genera</button>
            </div>  

            <div>
                {plan.map((day, i) => (
                    <div key={i} style={{marginBottom:12}}>
                        <h4>Day {i+1}</h4>
                        <ul>
                            {day.map((r:any)=> <li key={r.id}>{r.title} - {r.time}</li>)}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
     )
    }
}