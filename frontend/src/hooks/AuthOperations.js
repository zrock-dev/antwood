import { useAuth } from "@/context/AuthContext"
import { toast } from "sonner";
import {
  loginUser,
  registerUser,
  getUserByEmail,
  logoutUser,
} from "@/requests/AuthRequest";


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
            if (data.role === 'admin') {
              window.location = '/admin'
              toast.success("success signin as admin");
            } else {
              window.location = '/'
              toast.success("success signin");
            }
            
            
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
        toast.promise(registerUser(user, provider),
        {
          loading : 'signup in progress',
          success:(res) => {
            const data = res.data;
            updateUser(data);
            setIsAuthenticated(true);
            setShowModalAuth(false);
          return "success signup ";
          },
          error:(err) => {
            return "Signup Error";
          }
        })
      };

      const signoutUser = async () => {
        toast.promise(logoutUser(), {
          loading: "signout in progress",
          success: (res) => {
      
            setIsAuthenticated(false);
            updateUser(null);
            return "success signout ";
          },
          error: "Signout Error",
        });
      }

   


      return {
        onSignin,
        onSignup,
        verifyUserExists,
        signoutUser,
      };
    }

export default useAuthHandler;