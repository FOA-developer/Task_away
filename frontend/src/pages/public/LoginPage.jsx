import LoginForm from "../../components/Login/LoginForm";

const LoginPage = () => {
  return ( 
    <div className="grid-background min-h-screen">
      <div class="flex justify-center min-h-screen items-center relative z-10">
        <LoginForm />
      </div>
    </div>
   );
}
 
export default LoginPage;