import React, { useState } from "react";
import { StepForward, StepBack } from "lucide-react";
import { useEffect } from "react";
import ProfileInfos from "./profileInfos";
import type { Task } from "../@types/task";


interface SidebarProps {
    sidebarItems: Task[];
}

const Sidebar: React.FC<SidebarProps> = (props) => {

    const [search, setSearch] = useState("");
    const [sideControll, setSideControll] = useState("w-80");

    const filteredItems = props.sidebarItems.filter(item =>
        item.text.toLowerCase().includes(search.toLowerCase())
    );

    function minimize() {
        setSideControll("w-5"); 
    }

    function maximize() {
         setSideControll("w-80"); 
    }


     useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 740) {
                setSideControll("w-10");
            } else {
                setSideControll("w-80");
            }
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [setSideControll]);

    return (
        <>
            <aside className={`bg-gray-900 p-4 border-r border-gray-700 min-h-screen flex flex-col relative  ${sideControll}` } >
                <button className="bg-blue-600 flex items-center justify-center mb-4 rounded-full p-1 w-10 h-10 absolute right-[-20px] top-[50%] shadow-lg"
                    onClick={() => {
                        sideControll === "w-80" ? minimize() : maximize()
                    }}
                >
                    {
                        sideControll === "w-80" ? <StepBack size={16} />: <StepForward size={16} /> 
                    }
                </button>
                {sideControll === "w-80" && (
                    <>

                        <div>

                            {filteredItems.length === 0 ?
                                (<p className="text-gray-500 py-2">Nenhum Tarefa concluída</p>)
                                : (
                                    <>
                                        <input
                                            type="text"
                                            placeholder="Pesquisar..."
                                            value={search}
                                            onChange={e => setSearch(e.target.value)}
                                            className="w-full p-2 mb-4 bg-transparent rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                        />
                                        <ul className="list-none p-0 h-[calc(100vh-200px)] overflow-auto ">
                                            {filteredItems.map(item => (
                                                <li
                                                    key={item.id}
                                                    className="py-2 cursor-pointer rounded-md px-3 hover:bg-gray-800 transition word-break"
                                                >
                                                    {item.text}
                                                </li>
                                            ))}
                                            
                                        </ul>
                                    </>
                                )
                                 
                            }
                        </div>
                        
                        {/* Profile info and leave option floating at bottom */}
                        <div className="absolute bottom-4 left-4 right-4  bg-gray-800 rounded p-3 flex items-center justify-between shadow">
                            <ProfileInfos />
                        </div>
                    </>
                )}
            </aside>
        </>
    );
};

export default Sidebar;
