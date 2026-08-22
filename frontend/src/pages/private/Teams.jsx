import Layout from "../../components/shared/Layout.jsx"
import { useEffect, useState } from "react";
import api from "../../api/api.js";
import { Plus } from "lucide-react";
import Button from "../../components/shared/Button.jsx";
import MemberForm from "../../components/shared/MemberForm.jsx";
import MemberCard from "../../components/shared/MemberCard.jsx";
import Skeleton from "../../components/shared/Skeleton.jsx";

const Teams = () => {
  const [members, setMembers] = useState([]); 
  const [isAddingMemeber, setIsAddingMember] = useState(false);
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false)


  const getMembers = async () => {
    try{
      const res = await api.get(`/workspace/get_currentWorkspace`)
      setMembers(res.data.workspace.members)
      setLoading(false)
    }
    catch(err){
      if (!err.response) {
        setNetworkError(true)
      }
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  }
  
  useEffect((() => {
    getMembers()
  }),[])

  return (  
    <Layout>
      <div className="p-2 flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Team</h1>
          <div>
            <Button className={"flex gap-2"} onClick={() => {
              setIsAddingMember(true)
            }}><Plus size={20}  className="ml-4" /> Add Member</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {loading ? ([1, 2, 3, 4].map((num) => ( <Skeleton key={num} /> )))
            : members.map((member) => {
              return (
                <MemberCard key={member._id} member={member} onSuccess={getMembers}/>
              )})}
        </div>
        {isAddingMemeber && (
          <MemberForm onClose={() => setIsAddingMember(false)} onSuccess={getMembers}/>
        )}
        { networkError && (<p className="text-sm md:text-base font-primary">Network Error.... Pls check your internet connectionn</p>)}
      </div>
    </Layout>
  );
}
export default Teams;