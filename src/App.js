import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes'
import useAuthListener from './hooks/use-auth-listener'
import UserContext from './context/user'
import ReactLoading from 'react-loading';


import ProtectedRoutes from './helpers/protected-routes';
import IsUserLoggedIn from './helpers/is-user-logged-in';


const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));
const Dashborad = lazy(() => import('./pages/dashboard'));
const Profile = lazy(() => import('./pages/profile'));
const NotFound = lazy(() => import('./pages/not-found'));


export default function App() {
  const { user } = useAuthListener();
  const [isDark, setIsDark] = useState(false);
  // console.log('isDark',isDark);
  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={
          <ReactLoading
            className="flex justify-center items-center h-screen w-full"
            type={'balls'}
            color={'#03fc4e'}
            height={100}
            width={100}
          />
        }>
          <Switch>
            <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.LOGIN}>
              <Login />
            </IsUserLoggedIn>
            <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.SIGN_UP}>
              <SignUp />
            </IsUserLoggedIn>
            <Route path={ROUTES.PROFILE}>
              <Profile isDark={isDark} />
            </Route>
            
            <ProtectedRoutes user={user} path={ROUTES.DASHBOARD} exact>
              <Dashborad changed={(value) => setIsDark(value)} />
            </ProtectedRoutes>
            <Route path={ROUTES.NOT_FOUND} component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  )
}

