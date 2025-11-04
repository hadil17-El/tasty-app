"use client"

import  Calendar  from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css"
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation"

import "./planner.css"


type Task = {
    id: number;
    time: string;
    text: string;
}

export default function PlannerPage(){
    const [date, setDate] = useState<Date>(new Date());
    const [tasksByDate, setTasksByDate] = useState<Record<string, Task[]>>({//Questo è un oggetto che mappa ogni giorno ai suoi task.
        [new Date().toDateString()]: [
            { id: 1, time: "6:30 am", text: "Pack chocolate sandwich for Kid 2" },
            { id: 2, time: "7:30 am", text: "Make blueberry pancakes for breakfast" },
        ]
    
});
    const [showInput, setShowInput] = useState(false)
    const [newTask, setNewTask] = useState("")
    const router = useRouter()


    const currentDateKey = date.toDateString()
    const tasks = tasksByDate[currentDateKey] || []

    //Aggiungi task
  const addTask = () => {
    if (!newTask.trim()) return;
    const newId = Date.now();
    const newTaskObj ={id: newId, time: "-", text: newTask}

    const updatedTasks = {
        ...tasksByDate,
        [currentDateKey]: [...tasks, newTaskObj]
    }
    setTasksByDate(updatedTasks);
    setNewTask("");
    setShowInput(false);
  };
    //rimuovi task
    const removeTask = (id: number) => {
        const updated = tasks.filter((t)=> t.id !== id)
        setTasksByDate({
            ...tasksByDate,
            [currentDateKey]: updated,
        })
    }
    //evidenzia i giorni che hanno task
    const tileClassName = ({date}: {date: Date}) => {
        const dateKey = date.toDateString();
        if ( tasksByDate[dateKey] && tasksByDate[dateKey].length > 0) {
            return "has-task"
        }
        return ""
    }
return(
    <div className="planner-container">
        <button onClick={() => router.push("/home")} className="back-btn">
            <ArrowLeft size={24} />
        </button>
        <header className="planner-header">
        <h1 className="planner-title">tasty</h1>
        </header>
{/** calendario dinamico */}

        <div className="calendar-wrapper">
        <Calendar
             onChange={(value)=> setDate(value as Date)}
            value={date}
            tileClassName={tileClassName}
            className="custom-calendar"
            />
        </div>
        {/** Giorno selezionato */}
        <div className="tasks-header">
    <h3> 
        {date?.toLocaleDateString("en-US",{
        weekday:"long"
    })}</h3>
    </div>
{/**Tasks */}
<div className="tasks-section">
    <div className="tasks-list">
        <div className="list-header-container">
  <h2 className="list-header">Tasks</h2>
        <button className="add-btn" 
                onClick={()=> setShowInput(!showInput)}>
                    <Plus size={16} />
                    </button>
 
        </div>
      
         {
            showInput && (
                <div className="show-input">
                    <input type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="Enter new task..."
                            className="new-task" />
                    <button
                            onClick={addTask}
                            className=" add-btn2">
                        Add
                    </button>
                </div>
            )
         }
        {tasks.map((t) => (
            <div key={t.id} className="task-card">
                <span className="task-time">{t.time}</span>
                <span className="task.text">{t.text}</span>
                <button  className= "remove-btn" onClick={() => removeTask(t.id)} >
                    <Trash2 size={18} />
                </button>
            </div>
        ))}
        {tasks.length === 0 && <p className="no-task">No tasks for this day</p>}

    </div>

</div>
 </div>
)
}
