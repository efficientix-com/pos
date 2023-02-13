import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { useAuth } from "@/Context/AuthContext";

const loginHandler= (req, res)=> {
    const { email, password } = req.body;
    const { signup } = useAuth();
    const response=signup(email, password);
    console.log(response);
    return res.status(200).json("hola");
    // return createUserWithEmailAndPassword(auth,email, password)
    // .then((response) => {
    //  console.log("Response Content: ",response)
    //  return res.status(200).json(response.user.uid) 
    // })
    // .catch((error) => {
    //  return { error };
    // });

    

}
export default loginHandler;