const Button = ({ size = "small", className, children}) => {

  const baseStyle = "rounded-full text-white bg-primary m-auto";
  
  const sizes ={
    small: "text-sm font-semibold py-3 w-[150px]",
    medium: "text-lg font-semibold tracking-wide w-[230px] py-3 ",
    large: "text-base font-semibold tracking-wide py-4 w-[450px]"
  }

  return ( 
    <button className={`${baseStyle} ${sizes[size]} ${className}`}>{children}</button>
   );
}
 
export default Button;