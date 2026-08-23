import { X, Plus } from "lucide-react";

const Switcher = ({children, onClose}) => {
  return( 

    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-end justify-center md:hidden"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-whiter w-full rounded-t-3xl p-4 max-h-[70vh] flex flex-col"
      >
        {/* drag handle */}
        <div className="w-10 h-1 bg-grey rounded-full mx-auto mb-4"></div>

        {/* header */}
        <div className="flex flex-row items-center justify-between mb-4">
          <h3 className="text-primary font-semibold">Workspaces</h3>
          <X size={20} onClick={onClose} className="text-primary" />
        </div>

        <div className="flex flex-col gap-2 overflow-y-auto max-h-50">
          {children}
        </div>
        
        <button className="flex items-center gap-1 mt-4 text-primary text-sm">
          <Plus size={16} /> Create Workspace
        </button>
      </div>
    </div>
  )
}

export default Switcher;