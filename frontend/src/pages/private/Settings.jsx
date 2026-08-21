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
      <Block onLogout={() => {logoutUser()}}>Logout</Block>
    </Layout>
  )
}

export default Settings;
