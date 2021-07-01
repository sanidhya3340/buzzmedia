import {useState, useEffect, useContext} from 'react';
import UserContext from '../context/user'
import { getUserByUserId } from '../services/firebase';

export default function UseUser() {

    const [activeUser, setActiveUser] = useState({});
    const { user } = useContext(UserContext);

    useEffect(() => {
        async function getUserObjByUserId(){
            //we need a function that call (firebase service) that gets the user data based on the id
            const [response] = await getUserByUserId(user.uid);
            setActiveUser(response);
        }
        if(user?.uid) {
            getUserObjByUserId();   
           }   
    }, [user])

    return { user: activeUser };
}
