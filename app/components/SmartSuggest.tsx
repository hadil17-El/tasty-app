"use client"
import { useState } from "react"
import Image from "next/image"
import { recipes } from "../data/recipes"
import Link from "next/link"
import { div, p } from "framer-motion/client"
import "./SmartSuggest.css"
type Recipe = {
    id: number;
    title: string;
    ingredients: string[]
    image: string
    time?: string
    category?: string
    mealType?: string
}

function normalize(text: string) {
    return text
                .normalize("NFD")// decomposizione Unicode (accenti diventano combinazioni)
                .replace(/[\u0300-\u036f]/g, "") // rimuove i segni diacritici (accents)
                .toLowerCase()// minuscole
                .replace(/[^a-z0-9\s]/g,"") // rimuove tutto tranne lettere ascii, numeri e spazi
                .trim()  // rimuove spazi iniziali/finali
}


function parseIngredientsInput(input: string) {
    return input
        .split(/[,;]+/)//Divide la stringa ogni volta che trova una virgola (,) o un punto e virgola (;).+ → se ci sono più separatori consecutivi (es. ,, o ;;), li tratta come uno solo.
        .map((s) => normalize(s))
        .filter(Boolean)
}

function recipeScore(recipe: Recipe, terms: string[]) {
    const ingrText = recipe.ingredients.map((i)=> normalize(i)).join(" ")
    let matches = 0//Inizializza una variabile che conterà quante volte troviamo una corrispondenza tra i termini e gli ingredienti.
    //Scorre tutti i termini cercati dall’utente,
    for (const t of terms) {
        //Per ogni termine t, controlla se è contenuto nel testo completo degli ingredienti.
        if (ingrText.includes(t)) matches++ //Se sì → aggiunge 1 al conteggio (matches++)
    }
    return matches
}

export default function SmartSuggest() {
    const [input, setInput] = useState("")
    const [results, setResults] = useState<Recipe[]>([])
    const [lastTerms, setLastTerms] = useState<string[]>([])


    const handleSearch = () => {
        const terms = parseIngredientsInput(input)
        setLastTerms(terms)
        if(terms.length === 0) {
            setResults([])
            return
        }
        //cal score per ciascuna ricetta
        const  scored = recipes
            .map((r: any) =>({ recipe: r, score: recipeScore(r, terms)}))
            .filter((s)=> s.score > 0)//tieni solo ricette che matchano almeno 1 termine
            .sort((a, b) => b.score - a.score) //ordina per score desc
            
            setResults(scored.map((s)=> s.recipe))
    }

    const handleClear = () => {
        setInput("")
        setResults([])
        setLastTerms([])
    }

    return (
        <div className="smart-suggest">
            <h3 className="title">
                Cosa hai in casa? Inserisci gli ingredienti
            </h3>
            <div className="controls">
                    <input type="text"
                            placeholder="es. pasta, pomodoro, mozzarella"
                            value={input}
                            onChange={(e)=> setInput(e.target.value)}
                            className="input"
                             />
                    <button onClick={handleSearch}
                            className="btn">
                        Cerca
                    </button>
                    <button onClick={handleClear}
                            className="btn-secondary">
                                    Pulisci
                    </button>
            </div>

            {
                lastTerms.length > 0 && (
                    <p className="muted"> Cercando per: {lastTerms.join(", ")}</p>
                )
            }

            <div className="results">
                {
                    results.length === 0 ? (
                        <p className="muted">
                                Nessuna ricetta trovata (prova altri ingredinti)
                        </p>
                    ) : (
                        results.map((r: any) => (
                            <Link key={r.id} href={`/recipe/${r.id}`} className="result-card">
                                <Image
                                    src={r.image}
                                    alt={r.title}
                                    width={140}
                                    height={100}
                                    />
                                <div className="info">
                                    <h4>{r.title}</h4>
                                    <p className="meta">{r.time} . {r.category}</p>
                                    <p className="match">
                                        Match: {recipeScore(r, lastTerms)}
                                    </p>
                                </div>
                            </Link>
                        ))
                    )
                }
            </div>

            <style jsx>{
                `
        .smart-suggest { padding: 1rem; background:#0f1114; color:#fff; border-radius:8px; }
        .controls { display:flex; gap:.5rem; margin-bottom:.5rem; }
        .input { flex:1; padding:.5rem .75rem; border-radius:8px; background:#111216; border:1px solid #2a2d31; color:#fff; }
        .btn { background:#f4b860; color:#0f1114; padding:.5rem .75rem; border-radius:8px; border:none; cursor:pointer; }
        .btn-secondary { background:transparent; color:#f4b860; border:1px solid #333; padding:.5rem .75rem; border-radius:8px; }
        .muted { color:#aaa; margin:.5rem 0; }
        .results { margin-top: .75rem; display:flex; flex-direction:column; gap:.5rem; }
        .result-card { display:flex; gap:.75rem; align-items:center; background:#1a1c1f; padding:.5rem; border-radius:8px; }
        .info h4{margin:0;font-size:1rem}
        .meta{color:#bbb;font-size:.85rem;margin: .25rem 0;}
        .match{color:#f4b860;font-size:.85rem}
      `
                }

            </style>
        </div>

    )
}
