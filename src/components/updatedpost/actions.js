import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import UserContext from '../../context/user';
import FirebaseContext from "../../context/firebase";

export default function Actions({ docId, totalLikes, likedPhoto, handleFocus, isDark }) {
    const {
        user: { uid: userId = '' }
    } = useContext(UserContext);

    const [toggleLiked, setToggleLiked] = useState(likedPhoto);
    const [likes, setLikes] = useState(totalLikes);
    const { firebase, FieldValue } = useContext(FirebaseContext);

    const handleToggleLiked = async () => {
        setToggleLiked((toggleLiked) => !toggleLiked);

        await firebase
            .firestore()
            .collection('images')
            .doc(docId)
            .update({
                likes: toggleLiked ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId)
            });

        setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
    };

    return (
        <>
            <div className={isDark ? 'dark' : ''} >
                <div className="flex justify-between">
                    <div className="flex">
                        <svg onClick={handleToggleLiked}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    handleToggleLiked();
                                }
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24"
                            stroke="currentColor"
                            className={`w-8 mr-4 select-none cursor-pointer focus:outline-none ${toggleLiked ? 'fill-red text-white' :
                                'text-black-light dark:text-white'
                                }`}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
                        </svg>


                        <svg
                            onClick={handleFocus}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    handleFocus();
                                }
                            }}
                            className="w-8 text-black-light dark:text-white select-none cursor-pointer focus:outline-none"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            tabIndex={0}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />

                        </svg>
                    </div>
                </div>
                <div className="p-4 py-0">
                    <p className="className font-bold dark:text-white">{likes === 1 ? `${likes} upvote` : `${likes} upvotes`}</p>
                </div>
            </div>
        </>
    )
}

Actions.propTypes = {
    docId: PropTypes.string.isRequired,
    totalLikes: PropTypes.number.isRequired,
    likedPhoto: PropTypes.bool.isRequired,
    handleFocus: PropTypes.func.isRequired
}