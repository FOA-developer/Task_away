const Skeleton = () => {
  return (
    <div className="bg-whiter p-4 flex flex-col animate-pulse">
      <div className="h-4 bg-grey/30 rounded w-1/2 mb-3"></div>
      <div className="flex flex-row justify-between">
        <div className="h-8 w-8 bg-grey/30 rounded-full"></div>
        <div className="h-8 w-8 bg-grey/30 rounded-full"></div>
      </div>
    </div>
  )
}

export default Skeleton;