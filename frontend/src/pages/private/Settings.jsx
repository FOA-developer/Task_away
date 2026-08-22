import Block from "../../components/shared/Block";
import { useNavigate } from "react-router-dom"; 
import Layout from "../../components/shared/Layout";

const Settings = () => {
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <Layout>
      <div className="flex flex-col gap-3">
        <h3 className="text-2xl md:font-3xl font-semibold text-primary font-playfair">Settings</h3>
        <Block onLogout={() => {logoutUser()}}>Logout</Block>
      </div>
    </Layout>
  )
}

export default Settings;
