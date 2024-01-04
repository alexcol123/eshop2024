

interface BackDropProps {
  onClick: () => void
}

const Backdrop: React.FC<BackDropProps> = ({ onClick }) => {
  return (
    <div onClick={onClick}
      className="z-20  backdrop-blur-sm bg-white/30 h-screen w-screen fixed  top-0 left-0 transition "

    ></div>
  )
}

export default Backdrop