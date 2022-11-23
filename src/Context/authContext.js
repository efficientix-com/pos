import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { set, ref, onValue} from 'firebase/database';
import { auth, db } from '../FirebaseConfig/firebase';

//Exportamos el contexto, es decir, informacion del usuario que haya iniciado sesion
export const authContext = createContext();
export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error('There is not auth provider');
    return context;
}
//AuthProvider proporciona al hijo todas las propiedades de un usuario para prevenir hacer importaciones o consultas inecesarias
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [dataUser, setDataUser] = useState(null);
    const [loading, setloading] = useState(true);

    //Constante para registrarse y hacer un registro en la base de datos
    const signup = (email, password, UserName, role) => createUserWithEmailAndPassword(auth, email, password).
        then((userCredential) => {
            const user1 = userCredential.user;
            console.log(`ahh:${user1.uid}`);
            set(ref(db, `usuarios/${user1.uid}`), {
                user: email,
                userName: UserName,
                password: password,
                dateCreated: (new Date()).toUTCString(),
                role: role
            });
        });
    //Constante para el logueo
    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
    //Constante para cierre de sesion
    const logout = () => signOut(auth);
    function getDataUser() {
        onValue(ref(db, `usuarios/${user.uid}`), (snapshot => {
            const datosUsuario = {
                userName: snapshot.val().userName,
                user: snapshot.val().user,
                role: (snapshot.val().role ? snapshot.val().role: "No tiene asignado"),
                }
                setDataUser(datosUsuario)
        }));
    }
    useEffect(() => {
        //Seteamos el valor del usuario actual en el estado user para ser pasado como parametro al hijo
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setloading(false);
            if(user && dataUser){
                getDataUser();
            }
        });
        return () => unSubscribe();
    }, [user,dataUser])
    return (
        //Proporcionamos los datos necesarios para nuestro componente hijo
        <authContext.Provider value={{ signup, login, user, logout, loading, dataUser }}>
            {children}
        </authContext.Provider>
    )

}