const Button = ({ size = "small", children}) => {

  const baseStyle =  "rounded-full text-white bg-primary";
  
  const sizes ={
    small: "text-sm",
    large: "text-base"
  }

  return ( 
    <button className={`${baseStyle} ${sizes[size]}`}>{children}</button>
   );
}
 
export default Button;