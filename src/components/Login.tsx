import type React from "react";
import { XCircle } from "lucide-react";

const ModalLogin : React.FC = () => {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80 relative">
                <button className="absolute top-2 right-2 text-gray-400 hover:text-white">
                    <XCircle size={20} />
                </button>
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray">Username</label>
                        <input type="text" className="mt-1 bg-transparent block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray">Password</label>
                        <input type="password" className="mt-1 bg-transparent block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">Login</button>
                </form>
            </div>
            
        </div>
    )
} 

export default ModalLogin;