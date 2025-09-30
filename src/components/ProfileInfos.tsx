import { LogOut, LogIn } from "lucide-react"
import { useState } from "react";
import ModalLogin from "./login";



const ProfileInfos : React.FC= () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);

    
    return (
        <>
            <div className="flex items-center gap-2">
                <div>
                    <div className="text-sm font-medium text-white">Faça Login</div>
                    <div className="text-xs text-gray-400">Você não está logado</div>
                </div>
            </div>
            <button
                className="ml-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                onClick={() => {
                    setIsLoggedIn(!isLoggedIn);
                    if(!isLoggedIn) {
                        setIsShowModal(true);
                    }
                }}
            >
                {isLoggedIn ? 
                    <LogOut size={16} />
                    : <LogIn size={16} />
                }

            </button>
            <ModalLogin visibility={isShowModal} onClose={()=>{setIsShowModal(false)}} />
    </>
         
    )
} 

export default ProfileInfos;