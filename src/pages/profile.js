import React,{useState,useEffect} from 'react'
import { useParams,useHistory } from 'react-router-dom'
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../components/header';
import UserProfile from '../components/profile';


export default function Profile() {
  const {username} = useParams();
  // console.log('username',username);
  const [user, setUser] = useState(null);
  const [userExists, setuUserExists] = useState(false);
  const history = useHistory();
  const [isDark, setIsDark] = useState();
  // console.log('isDark',isDark);
  useEffect(() => {
    async function checkUserExists() {
      const user = await getUserByUsername(username);
      if(user.length>0){
        setUser(user[0])
        setuUserExists(true);
      }
      else{
        history.push(ROUTES.NOT_FOUND);
      }
    }
    checkUserExists()
    // console.log('user',user);
  }, [username, history])

  return userExists ? (
    <div className={isDark ? 'dark' : ''} >
    <div className="bg-gray-background dark:bg-black-dark">
    <Header handleChange={(value) => {
                setIsDark(value);
            }} />
      <div className="mx-auto mx-screen-w-lg">
        <UserProfile user={user} isDark={isDark} />
      </div>
    </div>
    </div>
  ) : null;
}