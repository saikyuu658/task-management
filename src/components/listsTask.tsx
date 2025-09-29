import React, { useEffect, useState } from "react";
import TaskCard from "./taskCard";
import type { Task } from "../@types/task";

const initialTasks: Task[] = [
    { id: 1, text: "Sample Task 1", completed: false },
    { id: 2, text: "Sample Task 2", completed: true },
];
const Lists: React.FC = ( ) => {

    

    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editText, setEditText] = useState<string>("");



   

    const handleEdit = (id: number) => {
        if (editText.trim() === "") return;
        setTasks(tasks.map(t => t.id === id ? { ...t, text: editText } : t));
        setEditingId(null);
        setEditText("");
    }

    const handleDelete = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id));
        
    }

    useEffect(() => {
       
    }, []);
   

    return (
        <div className="relative flex-1">
            <div className="p-8 max-w-lg mx-auto h-[calc(100vh-200px)] overflow-y-auto">
                {tasks.map((e) => (
                    <TaskCard
                        key={e.id}
                        task={e}
                        editingId={editingId}
                        editText={editText}
                        setEditingId={setEditingId}
                        setEditText={setEditText}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleComplete={(id: number, completed: boolean) => {
                            setTasks(tasks.map(t => t.id === id ? { ...t, completed } : t));
                        }}
                    />
                ))}
            </div>
          
        </div>
    );
};

export default Lists;