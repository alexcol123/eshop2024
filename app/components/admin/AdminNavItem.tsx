import { IconType } from "react-icons";


interface AdminNavItemProps {
  selected?: boolean
  icon: IconType;
  label: string

}
const AdminNavItem: React.FC<AdminNavItemProps> = ({ selected, icon: Icon, label }) => {
  return (
    <div className={` flex items-center justify-center text-center gap-1 p-2 border-b-2   hover:text-primary/70 transition cursor-pointer  ${selected ? "border-b-primary font-semibold text-primary " : " border-transparent"} `} >

      <Icon size={20} />
      <div className="font-medium text-sm text-center break-normal">
        {label}
      </div>
    </div>
  )
}

export default AdminNavItem