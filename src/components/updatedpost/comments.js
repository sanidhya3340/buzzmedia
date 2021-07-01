import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AddComment from './add-comment';

export default function Comments({ docId, comments: allComments, posted, commentInput, isDark }) {
    const [comments, setComments] = useState(allComments)
    // console.log('comments',comments);
    return (
        <>
            <div className={isDark ? 'dark' : ''}>
                <div className="p-4 pt-1 pb-4">
                    {comments.length >= 3 && (
                        <p className="text-sm text-gray-base dark:text-gray-background mb-1 cursor-pointer">
                            View all comments
                        </p>
                    )}
                    {comments.slice(0, 3).map((item) => (
                        <p key={`${item.comment}-${item.displayName}`} className="mb-1">
                            <Link to={`/p/${item.displayName}`}>
                                <span className="mr-1 font-bold dark:text-white">{item.displayName}</span>
                            </Link>
                            <span className="dark:text-white">{item.comment}</span>
                        </p>
                    ))}
                    <p className="text-gray-base dark:text-gray-background uppercase text-xs mt-2" >
                        10 secends ago
                    </p>
                </div>
                <AddComment
                    docId={docId}
                    comments={comments}
                    setComments={setComments}
                    commentInput={commentInput}
                    isDark={isDark}
                />
            </div>
        </>
    );
}

Comments.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    posted: PropTypes.number.isRequired,
    commentInput: PropTypes.object.isRequired,

}