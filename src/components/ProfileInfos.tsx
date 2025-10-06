import { LogOut, LogIn } from "lucide-react"
import { useState } from "react";
import { getRequest } from "../service/apiRequest";

interface ProfileInfosProps {
    setTokenCrsf: (tokenCrsf: string)=> void
}

const ProfileInfos : React.FC<ProfileInfosProps>= (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [isShowModal, setIsShowModal] = useState(false);

    const handleLogin = async ()=>{
        try {
            const res = await getRequest('auth/token', {})
            props.setTokenCrsf(res.csrfToken)
            alert('token salved')
            setIsLoggedIn(true)
        } catch (error:any) {
            console.log(error.toString())
            alert(error)
        }
    }
    
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
                onClick={handleLogin}
            >
                {isLoggedIn ? 
                    <LogOut size={16} />
                    : <LogIn size={16} />
                }

            </button>
            {/* <ModalLogin visibility={isShowModal} onClose={()=>{setIsShowModal(false)}} /> */}
    </>
         
    )
} 

export default ProfileInfos;