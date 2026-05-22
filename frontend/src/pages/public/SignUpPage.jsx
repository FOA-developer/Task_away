import SignUpForm from "../../components/Login/SignUpForm";

const SignUpPage = () => {
  return ( 
    <div className="grid-background min-h-screen">
      <div className="flex justify-center min-h-screen items-center  relative z-10">
        <SignUpForm/>
      </div>
    </div>
   );
}
 
export default SignUpPage;