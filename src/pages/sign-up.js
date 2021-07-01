import React,{ useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';

export default function Signup() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleSignup = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExist(username);

    if(!usernameExists.length){
      try {
        const createdUserResult = await firebase
        .auth()
        .createUserWithEmailAndPassword(emailAddress,password)

        //authantication
        //email address password and username
        await createdUserResult.user.updateProfile({
          displayName : username
        })


        //firebase user collection create a document
        await firebase.firestore().collection('users').add({
          userId : createdUserResult.user.uid,
          username : username.toLowerCase(),
          fullname,
          emailAddress : emailAddress.toLowerCase(),
          following: [],
          dataCreated: Date.now()
        });

        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setUsername('');
        setFullname('');
        setEmailAddress('');
        setPassword('');
        setError(error.message);
      }
    }
    else{
      setError('That username is already taken, please try another!');
    }
  };

  useEffect(() => {
    document.title = 'Sign Up - BuzzMedia';
  }, []);

  return (
    <div className="flex flex-col items-center justify-center md:container md:justify-center md:flex md:flex-row md:mx-auto md:max-w-screen-md md:items-center md:h-screen">
      <div className="h-0 invisible md:visible md:h-full md:flex md:justify-center md: mt-32 md:w-3/5">
        <img src="/images/buzzmedia-profile.jpg" alt="iPhone with Instagram app" />
      </div>
      <div className="w-4/5 flex flex-col items-center justify-center md:w-2/5">
        <div className="flex flex-col justify-center items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img src="/images/logomyb-01.png" alt="Instagram" className="mt-2 w-6/12 mb-4" />
          </h1>

          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleSignup} method="POST">
          <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <input
              aria-label="Enter your fullname"
              type="text"
              placeholder="Full Name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setFullname(target.value)}
              value={fullname}
            />
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold
            ${isInvalid && 'opacity-50'}`}
            >
              Signup
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Already have an account?{` `}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
  }