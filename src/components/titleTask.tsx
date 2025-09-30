import { Pen } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface TitleProps {
    title: string;
    handleTitleChange: (newTitle: string) => void;
}


const Title: React.FC<TitleProps> = (props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isEditing, setIsEditing] = useState(false);

    
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);
    
    return (
        <>
            <div className="flex items-center justify-center gap-2 group hover:cursor-pointer"
            >
                { 
                    isEditing ? 
                        <form 
                            onSubmit={e => {
                                e.preventDefault();
                                setIsEditing(false);
                            }}
                            action="">

                            <input
                                type="text"
                                ref={inputRef}
                                placeholder="Alterar Título"
                                value={props.title}
                                onChange={e => props.handleTitleChange(e.target.value) }
                                className="w-sm text-center p-2 mb-4 bg-transparent rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                        </form>
                    : <h2 className="text-2xl font-bold" 
                        onClick={() => setIsEditing(true)}
                    >{props.title}</h2>
                }

                <Pen 
                    size={20} 
                    className="opacity-0 transition-opacity duration-200 group-hover:opacity-100" 
                />
            </div>
            
        </>
    );
}

export default Title;
