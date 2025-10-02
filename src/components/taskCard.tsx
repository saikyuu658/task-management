import React, { useRef, useEffect } from "react";
import type { Task } from "../@types/task";
import { Check, Pen, Trash } from "lucide-react";
import { formatDate } from "../util/formatDate";

type TaskCardProps = {
    task: Task;
    editingId: number | null;
    editText: string;
    setEditingId: (id: number | null) => void;
    setEditText: (text: string) => void;
    handleEdit: (id: number, text: string) => void;
    handleDelete: (id: number) => void;
    handleComplete?: (id: number, completed: boolean) => void; // Add this prop if needed
};

const TaskCard: React.FC<TaskCardProps> = ({
    task,
    editingId,
    editText,
    setEditingId,
    setEditText,
    handleEdit,
    handleDelete,
    handleComplete,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editingId === task.id && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editingId, task.id]);

    return (
        <div
            key={task.id}
            className="bg-gray-800 rounded-lg shadow-md p-4 mb-4 flex items-center justify-between"
        >

            <div className="flex-1 flex items-center">
                {editingId === task.id ? (
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            handleEdit(task.id, editText);
                            setEditingId(null);
                        }}
                        action=""
                        className="flex-1"
                    >
                        <input
                            ref={inputRef}
                            value={editText}
                            onChange={e => setEditText(e.target.value)}
                            className="flex-1 mr-2 border border-gray-700 bg-gray-900 text-white rounded px-2 py-1"
                        />
                    </form>
                ) : (
                    <>
                        <input
                            type="checkbox"
                            checked={!!task.completed}
                            onChange={() => handleComplete && handleComplete(task.id, !task.completed)}
                            className="mr-4 accent-blue-600"
                            title="Mark as completed"
                            style={{ width: "1rem", height: "1rem" }}
                        />

                        <div className="flex-1 flex flex-col">
                            <span className={`text-white ${task.completed ? "line-through opacity-60" : ""}`}>
                                {task.text}
                            </span>
                            <span className={`text-white ml-2 text-[11px] opacity-70 ${task.completed ? "line-through opacity-60" : ""}`}>
                                {formatDate(task.created)}
                            </span>
                        </div>
                    </>
                )}
            </div>
            <div>
                {editingId === task.id ? (
                    <button
                        onClick={() => {
                            handleEdit(task.id, editText);
                            setEditingId(null);
                        }}
                        className="mr-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        <Check size={16} />
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            setEditingId(task.id);
                            setEditText(task.text);
                        }}
                        className="mr-2 px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
                    >
                        {<Pen size={16} />}
                    </button>
                )}
                <button
                    onClick={() => handleDelete(task.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                    <Trash size={16} />
                </button>
            </div>
        </div>
    );
};

export default TaskCard;