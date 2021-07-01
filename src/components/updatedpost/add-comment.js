import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user'


export default function AddComment({ docId, comments, setComments, commentInput, isDark }) {
    const [comment, setComment] = useState('');
    const { firebase, FieldValue } = useContext(FirebaseContext);
    const {
        user: { displayName }
    } = useContext(UserContext);

    function handleSubmitComment(event) {
        event.preventDefault();
        setComments([{ displayName, comment }, ...comments]);
        setComment('');
        //give me a new array
        // put the new comment in there
        //add the old comment
        //then we have a new array with the new comment and the older comments
        return firebase
            .firestore()
            .collection('images')
            .doc(docId)
            .update({
                comments: FieldValue.arrayUnion({ displayName, comment })
            });
    }
    return (
        <div className={isDark ? 'dark' : ''}>
            <div className="border-t border-gray-primary dark:border-black-faded dark:bg-gray-dark">
                <form
                    method="POST"
                    className="flex justify-between pl-0 pr-5"
                    onSubmit={(event) =>
                        comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault()
                    }
                >
                    <input
                        aria-label="Add a comment"
                        autoComplete="off"
                        className="text-sm text-gray-base dark:text-gray-300 dark:bg-gray-dark w-full mr-3 py-5 px-4"
                        type="text"
                        name="add-comment"
                        placeholder="Add a comment...."
                        value={comment}
                        onChange={({ target }) => setComment(target.value)}
                        ref={commentInput}
                    />
                    <button
                        className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
                        type="button"
                        disabled={comment.length < 1}
                        onClick={handleSubmitComment}
                    >
                        Post
                    </button>
                </form>
            </div>
        </div>
    )
}

AddComment.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    setComments: PropTypes.func.isRequired,
    commentInput: PropTypes.object.isRequired
}