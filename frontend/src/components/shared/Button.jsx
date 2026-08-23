const Button = ({ size = "small", className, children, onClick}) => {

  const baseStyle = "rounded-full text-white bg-primary hover:pointer";
  
  const sizes ={
    small: "text-sm font-semibold py-3 w-[150px]",
    medium: "text-lg font-semibold tracking-wide w-[230px] py-3 ",
    large: "text-base font-semibold tracking-wide py-4 max-w-[320px]"
  }

  return ( 
    <button className={`${baseStyle} ${sizes[size]} ${className} `} onClick={onClick} >{children}</button>
   );
}
 
export default Button;