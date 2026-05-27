import NestlyLogo from "../NestlyLogo";
const links = ["About", "How it Works", "Features", "Login"]

const Navbar = () => {

  return (
    <navbar className="flex flex-row">
      <div>
        <NestlyLogo/>
        <h3 className="">Nestly</h3>
      </div>
      <div>
        
      </div>
    </navbar>
   );
}
 
export default Navbar;