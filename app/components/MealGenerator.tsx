"use client"

import { useState } from "react"
import { recipes } from "../data/recipes"
import { div } from "framer-motion/client"

export default function MealGenerator() {
    const [days, setDays] = useState(3)
    const [mealsPerDay, setMealsPerDay] = useState(3)
    const [plan, setPlan] = useState<any[]>([])


   const generate = () => {
    const pool = [...recipes];
    const newPlan: any[] = [];

    for (let d = 0; d < days; d++) {
      const dayMeals: any[] = [];
      for (let m = 0; m < mealsPerDay; m++) {
        if (pool.length === 0) break;
        const idx = Math.floor(Math.random() * pool.length);
        const chosen = pool.splice(idx, 1)[0];
        dayMeals.push(chosen);
      }
      newPlan.push(dayMeals);
    }

    setPlan(newPlan);
  };

 return (
    <div className="meal-gen p-4 text-white">
      <h3 className="text-lg font-semibold mb-2 text-[#f4b860]">
        Genera un piano pasti
      </h3>

      <div className="flex gap-2 mb-4">
        <input
          type="number"
          min={1}
          max={14}
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="bg-[#1a1c1f] p-2 rounded text-white w-20"
        />
        <input
          type="number"
          min={1}
          max={5}
          value={mealsPerDay}
          onChange={(e) => setMealsPerDay(Number(e.target.value))}
          className="bg-[#1a1c1f] p-2 rounded text-white w-20"
        />
        <button
          onClick={generate}
          className="bg-[#f4b860] text-[#0f1114] px-4 py-2 rounded hover:bg-[#f6c970] transition"
        >
          Genera
        </button>
      </div>

      <div>
        {plan.map((day, i) => (
          <div key={i} className="mb-4">
            <h4 className="text-[#f4b860]">Giorno {i + 1}</h4>
            <ul className="list-disc ml-5">
              {day.map((r: any) => (
                <li key={r.id}>
                  {r.title} - <span className="text-gray-400">{r.time}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
