'use client'

import React from 'react'
import { Field, FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface TextAreaProps {
  id: string,
  label: string,

  disabled?: boolean
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}

const TextArea: React.FC<TextAreaProps> = ({ id, label, disabled, register, required, errors }) => {
  return (
    <form className='w-full  relative'>
      <textarea
  
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=''

        className={`
        peer
      w-full 
      p-4
      pt-6
      max-h-40
      min-h-40
      outline-none
    bg-white
      text-primary
      border-2 
      rounded-md 
      transition 
     disabled:opacity-70
     disabled:cursor-not-allowed
     ${errors[id] ? 'border-rose-400 ' : 'border-slate-300'}
     ${errors[id] ? 'focus:border-rose-400 ' : 'focus:border-slate-300'}
     `} />
      <label
        className={`absolute  cursor-text text-md duration-150 transform -translate-y-3  top-5 z-10  origin-[0] left-4 peer-placeholder-shown:scale-100  peer-placeholder-shown:translate-y-0 peer-fucus:scale-75 peer-fucus:-translate-y-4 text-neutral
        ${errors[id] ? 'text-rose-400 ' : 'text-slate-400'}
        `}
        htmlFor={id}>{label}</label>
    </form>
  )
}

export default TextArea