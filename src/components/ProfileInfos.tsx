import { LogOut, LogIn } from "lucide-react"
import { useState } from "react";

const ProfileInfos : React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    
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
                    alert("Leaving...");
                    setIsLoggedIn(!isLoggedIn);
                }}
            >
                {isLoggedIn ? 
                    <LogOut size={16} />
                    : <LogIn size={16} />
                }

            </button>
    </>
         
    )
} 

export default ProfileInfos;