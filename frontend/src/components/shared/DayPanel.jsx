import { X } from "lucide-react";

const DayPanel = ({children, onClose}) => {
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex md:justify-end items-center justify-center"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white flex flex-col w-11/12 max-w-md rounded-2xl md:w-96 md:h-screen md:rounded-none md:max-w-none">
        <div className="flex flex-col py-4 px-2">
          <div>
            <button onClick={onClose} className="self-end text-primary"><X size={26} /></button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default DayPanel;