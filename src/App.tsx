import Sidebar from './components/sidebar';
import Title from './components/titleTask';
import { use, useEffect, useState } from 'react';
import type { Task } from './@types/task';
import TaskCard from './components/taskCard';

const initialTasks: Task[] = [
];


function App() {

  const [sideControll, setSideControll] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [title, setTitle] = useState<string>("Lista de tarefas");

  useEffect(() => {
      function handleResize() {
          if (window.innerWidth <= 740) {
              setSideControll(true);
          } else {
              setSideControll(false);
          }
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
  }, [setSideControll]);
  
  const handleEdit = (id: number) => {
    if (editText.trim() === "") return;
    setTasks(tasks.map(t => t.id === id ? { ...t, text: editText } : t));
    setEditingId(null);
    setEditText("");
  }

  const handleDelete = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  }

  const handleComplete = (id: number, completed: boolean) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed } : t));
  }

  const handleAddTask = () => {
    const newTask: Task = {
        id: tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
        text: "New Task",
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    setEditText("New Task");
    setEditingId(newTask.id);
    setTasks([...tasks, newTask]);
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === 'Enter') {
            handleAddTask();
        }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [tasks]);

  const handleEditTitle = (newTitle: string) => {
    setTitle(newTitle);
  }

  return (
    <>
      <div className="flex min-h-screen">
        <div className={sideControll? "fixed z-50": ""}>
          <Sidebar sidebarItems={tasks.filter(e=>e.completed)}/>
        </div>
        <main className="flex-1 bg-gray-900 text-white p-4">
          <Title title={title} handleTitleChange={handleEditTitle}/>
          <div className="relative flex-1">
            <div className="p-8 max-w-lg mx-auto h-[calc(100vh-200px)] overflow-y-auto">
              {tasks.length === 0 ? (
                <div>
                  <p className="text-gray-500 text-center">Adicione Sua primeira tarefa tarefa!</p>
                  <p className="text-gray-500 text-center">
                      Clique no botão "Nova Task" ou pressione <span className="font-mono bg-gray-800 px-1 rounded">Ctrl + Enter</span>
                  </p>
                </div>
              ) : (
                  tasks.map((e) => (
                    <TaskCard
                        key={e.id}
                        task={e}
                        editingId={editingId}
                        editText={editText}
                        setEditingId={setEditingId}
                        setEditText={setEditText}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleComplete={handleComplete}
                    />
                    ))
                )
              }
            </div>
          </div>
          <div className="relative bottom-[-50px] w-full flex justify-center z-10">
              <button
                  onClick={() => { handleAddTask() }}
                  className="bg-blue-600 text-white border-none rounded-full px-12 py-1 text-xl shadow-lg cursor-pointer flex items-center justify-center"
                  aria-label="Add Task"
              >
                  <p>Nova Task</p>
                  <p className="ml-2 text-sm opacity-70">
                      Ctrl + Enter
                  </p>
              </button>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
