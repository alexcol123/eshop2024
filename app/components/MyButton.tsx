'use client'
import React from 'react'
import { IconType } from 'react-icons'

interface ButtonProps {
  label: string
  disabled?: boolean
  outline?: boolean
  small?: boolean
  custom?: string
  icon?: IconType
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}



const MyButton: React.FC<ButtonProps> = ({
  label, disabled, outline,
  small, custom, icon: Icon, onClick
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`disabled:opacity-60
    disabled:cursor-not-allowed
    rounded-md
    hover:opacity-80
    transition
    w-full
    flex items-center justify-center gap-8
    text-center	
  
    ${outline ? 'border border-primary text-primary  ' : '    border-slate-500  bg-primary text-base-100 font-semibold'}
    ${small ? 'text-sm py-1 px-2 border-[1px] ' : 'text-md py-3 px-4 border-2 '}
    ${custom ? custom : ''}
    `}
    >

      {Icon && <Icon size={24} />}
      {label}
    </button>
  )
}

export default MyButton