const Block = ({children, onLogout}) => {
  return (
    <div className="shadow-sm hover:shadow-md rounded-lg text-xs md:text-sm text-primary bg-whiter active:shadow-lg transition-shadow duration-150 cursor-pointer w-full p-3 flex flex-col" onClick={(e) => { 
      e.stopPropagation();
      onLogout()
    }}>
      {children}
    </div>
  )
}

export default Block;