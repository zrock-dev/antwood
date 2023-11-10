import { useAuth } from "@/context/AuthContext"
import { toast } from "sonner";
import { loginUser, registerUser, getUserByEmail } from "@/requests/AuthRequest";
const useAuthHandler = ()=>{

    const {setShowModalAuth,updateUser,setIsAuthenticated} = useAuth();
    const onSignin = async (user, provider) => {
         loginUser(user, provider)
          .then((res) => {
            const data = res.data;
            if(data.error){
                   toast.error("bad credentials");
                   return
            }
            updateUser(data);
            setIsAuthenticated(true)
            setShowModalAuth(false);
            toast.success("success signin ");
          })
          .catch((err) => {
            toast.error("bad credentials");
          });
      };
    

      const verifyUserExists = async (email) => {
        return  await getUserByEmail(email)
          .then((res) => {
              if(res.data.email!==""){
                 toast.error("there is already an account using that email");
                return true;
                }
            return false;
          })
          .catch((error) => {
            return false;
          });
      };
    

      const onSignup = async (user, provider) => {
        registerUser(user, provider)
          .then((res) => {
            const data = res.data;
            updateUser(data);
            setIsAuthenticated(true);
            setShowModalAuth(false);
            toast.success("success signup ");
          })
          .catch((err) => {
            toast.error("Signup Error");
          });
      };

      return {
        onSignin,
        onSignup,
        verifyUserExists
      }
    }

export default useAuthHandler;