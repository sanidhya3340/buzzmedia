import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';
import * as ROUTES from '../constants/routes';
import classNames from 'classnames';
import UploadForm from './upload-form'
// import PropTypes from 'prop-types'

export default function Header({handleChange}) {
    const { firebase } = useContext(FirebaseContext);
    const { user } = useContext(UserContext);
    const [enabled, setEnabled] = useState(false);
    return (
        // <p>I am a header</p>
        <div className={enabled ? "dark" : ""}>
            <header className="h-16 bg-white border-b border-gray-primary mb-8 dark:bg-gray-dark dark:border-black-dark">
                <div className="container mx-auto max-w-screen-lg h-full">
                    <div className="flex justify-between h-full">
                        <div className="text-gray-700 dark:text-white text-center flex items-center align-items cursor-pointer">
                            <h1 className="flex justify-center w-full">
                                <Link to={ROUTES.DASHBOARD} aria-label="Instagram logo">
                                    {enabled ? <img src="/images/logomyw-01.png" alt="Instagram" className="mt-2 w-40" /> : <img src="/images/logomyb-01.png" alt="Instagram" className="mt-2 w-40 " /> }
                                </Link>
                            </h1>
                        </div>
                        <div className="text-gray-700 dark:text-white text-center flex items-center align-items">
                            {(user) ? (
                                <div className="flex flex-row items-center mr-4">
                                    <div
                                        onClick={() => {
                                            var temp = !enabled;
                                            setEnabled(temp);
                                            handleChange(temp);
                                        }}
                                        className={
                                            classNames(
                                                enabled ? "bg-blue-medium" : "bg-black-light",
                                                "relative inline-flex mr-2 flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus-ring-cyna-400"
                                            )
                                        }
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={classNames(
                                                enabled ? "translate-x-5" : "translate-x-0",
                                                "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                            )}
                                        />
                                    </div>
                                    <UploadForm isDark={enabled} />
                                    <Link to={ROUTES.DASHBOARD} aria-label="dashboard">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                    </Link>

                                    <button
                                        type="button"
                                        title="Sign Out"
                                        className="mr-2"
                                        onClick={() => firebase.auth().signOut()}
                                        onKeyDown={(event) => {
                                            if (event.key === 'Enter') {
                                                firebase.auth().signOut();
                                            }
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="dark:text-white h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                    </button>
                                    <div className="flex items-center cursor-pointer">
                                        <Link to={`/p/${user.displayName}`}>
                                            <img
                                                src={`/images/avatars/${user.displayName}.jpg`}
                                                alt={`${user.displayName} profile`}
                                                className="rounded-full h-8 w-8 flex"
                                            />
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex">
                                    <Link to={ROUTES.LOGIN} >
                                        <button type="button" className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8">Login</button>
                                    </Link>
                                    <Link to={ROUTES.SIGN_UP}>
                                        <button type="button" className="font-bold text-sm rounded text-blue-medium w-20 h-8">SignUp</button>
                                    </Link>
                                </div>
                            )
                            }
                        </div>
                    </div>
                </div>
            </header >  
            </div>
    )
}

// Header.propTypes = {
//     handleChange : PropTypes.func.isRequired
// }