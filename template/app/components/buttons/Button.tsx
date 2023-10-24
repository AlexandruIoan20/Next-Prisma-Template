'use client'; 
import clsx from "clsx";

type ButtonType = "submit" | "button" | "reset"

interface ButtonProps { 
    primary?: Boolean, 
    secondary?: Boolean, 
    danger?: Boolean, 
    type: ButtonType, 
    onClick?: () => void, 
    children: React.ReactNode, 
    disabled?: Boolean, 
}
const Button = ({ primary, secondary, danger, onClick, type, children, disabled}: ButtonProps) => {
  return (
    <button
        type = { type }
        onClick = { onClick }
        className = { clsx(
            `p-2 transition-all cursor-pointer hover:scale-110`, 
            danger && "bg-red-500 rounded hover:bg-red-400",
            secondary && 'bg-green-400 shadow-md hover:bg-green-300',
            primary && 'bg-purple-500 rounded-md hover:bg-purple-400'
        )}
    >
        { children }
    </button>
  )
}

export default Button; 