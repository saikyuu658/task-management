import { useEffect, useState } from 'react';
import type { Task } from './@types/task';
import TaskCard from './components/taskCard';
import Sidebar from './components/sidebar';



function App() {

   const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Buy groceries' },
  ]);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle Shift + N (either shift key)
      if ((e.key === 'n' || e.key === 'N') && e.shiftKey) {
      e.preventDefault();
      handleAdd();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tasks]);

 
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const handleAdd = () => {
    const newTask: Task = {
      id: Date.now(),
      text: 'New Task',
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setEditingId(newTask.id);
    setEditText(newTask.text);
  };

  const handleEdit = (id: number, newText: string) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, text: newText } : task)));
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <>
      <Sidebar></Sidebar>
      <div className="p-8 max-w-lg mx-auto">
        <h2 className="text-center text-2xl font-bold mb-6">Task Management</h2>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            editingId={editingId}
            editText={editText}
            setEditingId={setEditingId}
            setEditText={setEditText}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleComplete={(id, completed) => {
              setTasks(tasks.map(t => t.id === id ? { ...t, completed } : t));
            }}
          />
        ))}
      </div>
      <button
        onClick={handleAdd}
        className="fixed flex flex-col left-1/2 bottom-8 transform -translate-x-1/2 bg-blue-600 text-white border-none rounded-full  px-12 py-1 text-xl shadow-lg cursor-pointer z-50 flex items-center justify-center"
        aria-label="Add Task"
      >
        <p>Nova Task</p>
        
        <p className="ml-2 text-sm opacity-70">
          shift + N
        </p>
      </button>
    </>
  );
}

export default App;
