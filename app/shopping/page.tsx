"use client";
import { useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import "./shopping.css"


export default function ShoppingListPage() {
    const router = useRouter();



    const [ categories, setCategories] = useState([
        {
            id:1,
            name: "Vegetables",
            items: [
                {name:"Tomato", qty:"1 kg", checked: false},
                {name:"Cucumber", qty:"1 kg", checked: false},
                {name:"Capsicum", qty:"1 kg", checked: false},
                {name:"Onion", qty:"2 kg", checked: false}, 
 
 
            ]
        },
        {
            id:2,
            name:"Meat",
            items:[
                {name: "Chiken", qty:" 3kg",checked:false},
                {name: "Fish", qty:" 3kg",checked:false},
                {name: "Mutton", qty:" 1kg",checked:false},

            ]
        },
             {
            id:3,
            name:"Fruits",
            items:[
                {name: "Watermelon", qty:" 2 pc",checked:false},
                {name: "Orange", qty:" 1kg",checked:false},
                {name: "Apples", qty:" 1kg",checked:false},
                {name: "Blueberry", qty:" 0.5kg",checked:false},
                {name: "Figs", qty:" 1 pc",checked:false}
            ]
        },
             {
            id:4,
            name:"Dairy",
            items:[
                {name: "Milk", qty:" 1.5 l",checked:false},
                {name: "Yogurt", qty:" 1 pc",checked:false},
                {name: "Salted butter", qty:" 1 pc",checked:false},
                {name: "Buttermilk", qty: "1.5 l" , checked: false}
            ]
        },
             {
            id:5,
            name:"Dessert",
            items:[
                {name: "Ice cream", qty:" 1 pc",checked:false},
                {name: "Mango", qty:" 2 pc",checked:false},
                {name: "Mojito syrup", qty:" 1 l",checked:false},

            ]
        },
             {
            id:6,
            name:"Main",
            items:[
                {name: "Rice", qty:" 5kg",checked:false},
                {name: "Maida", qty:" 2kg",checked:false},

            ]
        },

    ])

const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0)
const checkedItems = categories.reduce(
    (sum, cat) => sum + cat.items.filter((i) => i.checked).length,0)
const progress = (checkedItems / totalItems) * 100;

const toggleChecked = (catId: number, index: number) => {
    const updated = categories.map((cat)=>
    cat.id === catId
        ? {
            ...cat,
            items: cat.items.map((item,i) =>
                i === index ? {...item, checked: !item.checked} : item)
        } : cat)
        setCategories(updated)
}
const [activeCat, setActiveCat] = useState<number | null>(null);
const [newItem, setNewItem]= useState("");
const [newQty, setNewQty]=useState("")
const addTask = (catId: number) => {
   setActiveCat(catId);//mostra il form per quella categories
        }
const saveTask = (catId: number) => {
    if(!newItem || !newQty) return;
    const updated = categories.map((cat)=>
        cat.id === catId ? {
            ...cat,
            items:[...cat.items,{name:newItem,qty:newQty, checked: false}]
        } : cat)
        setCategories(updated);
        setNewItem("");
        setNewQty("");
        setActiveCat(null)
}
return (
    <div className="shopping-page">
            {/** Header */}
            <div className="shopping-header">
                <button className="back-shop" onClick={() => router.push("/home")}>
                        <ArrowLeft size={24}/>
                </button>
                <h1 className="shopping-title">tasty</h1>
            </div>
            {/** Progress Bar */}
            <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }}>

                    </div>
                    <div className="progress-text">
                            {checkedItems} items <span>of {totalItems} items</span>
                    </div>
            </div>
            {/** Categories */}
            <div className="categories-grid">
                {categories.map((cat) => (
                    <div key={cat.id} className="categroy-card">
                        <h3 className="category-title">{cat.name}</h3>
                        <ul className="category-list">
                            {cat.items.map((item, index) => (
                                <li
                                    key={index}
                                    onClick={()=> toggleChecked(cat.id, index)}
                                    className={`item ${item.checked ? "checked" : ""}`}>
                                        <span className={`circle ${item.checked ? "filled" : ""}`}></span>
                                        <span className="item-name">{item.name}</span>
                                        <span className="item-qty">{item.qty}</span>
                                </li>
                            ))}
                            </ul>
                            {activeCat === cat.id ? (
                                <div className="add-form">
                                    <input type="text"
                                            placeholder="Item name"
                                            value={newItem}
                                             className="input"
                                            onChange={(e) => setNewItem(e.target.value)} />
                                    <input type="text"
                                            placeholder="Quantity"
                                            className="input"
                                            value={newQty}
                                            onChange={(e) => setNewQty(e.target.value)} />
                                    <button className="btn-form" onClick={()=> saveTask(cat.id)}>Add</button>
                                   </div>
                                    ) : (
                                    <button onClick={()=> addTask(cat.id)} className="add-item">
                                         Add task +
                                      </button>
                            )}
                         </div>
                ))}
    </div>
    </div>
)

}     