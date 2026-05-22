const Button = ({ size = "small", children}) => {

  const baseStyle =  "rounded-full text-white bg-primary m-auto";
  
  const sizes ={
    small: "text-sm",
    large: "text-base font-semibold tracking-wide py-4 w-[450px]"
  }

  return ( 
    <button className={`${baseStyle} ${sizes[size]}`}>{children}</button>
   );
}
 
export default Button;