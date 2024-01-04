'use client'

import { IconType } from "react-icons"


interface CategoryInputProps {
  selected?: boolean
  label: string
  icon: IconType
  onClick: (value: string) => void
}

const CategoryInput: React.FC<CategoryInputProps> = ({ selected, label, icon: Icon, onClick }) => {
  return (
    <div
      className={`rounded-xl border-2 p-4 flex flex-col  items-center gap-2 hover:border-primary transition cursor-pointer
      ${selected ? 'bg-primary/40' : ''}
      `}
      onClick={() => onClick(label)}>
      <Icon size={30} />
      <div className="font-medium">{label}</div>
    </div>
  )
}

export default CategoryInput