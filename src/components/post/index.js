import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Image from './image';
import Actions from './actions';
import Footer from './footer';
import Comments from './comments'

export default function Post({ content, isDark }) {
    const commentInput = useRef();
    const handleFocus = () => commentInput.current.focus();
    //components
    //header,image, actions (like & comment items), footer, comments
    // console.log(content);
    return (
        <div className={isDark ? 'dark' : ''}>
            <div className="rounded col-span-4 border bg-white border-gray-primary dark:bg-gray-dark dark:border-black-faded mb-8">
                <Header username={content.username} isDark={isDark} />
                <Image src={content.imageSrc} caption={content.caption} />
                <Actions
                    docId={content.docId}
                    totalLikes={content.likes.length}
                    likedPhoto={content.userLikedPhoto}
                    handleFocus={handleFocus}
                    isDark={isDark}
                />
                <Footer caption={content.caption} username={content.username} isDark={isDark} />
                {/* docId, comments: allComments,posted, commentInput */}
                <Comments
                    docId={content.docId}
                    comments={content.comments}
                    posted={content.dateCreated}
                    commentInput={commentInput}
                    isDark={isDark}
                />
            </div>
        </div>
    )
}

Post.propTypes = {
    content: PropTypes.shape({
        username: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired,
        userLikedPhotos: PropTypes.bool,
        likes: PropTypes.array.isRequired,
        comments: PropTypes.array.isRequired,
        dateCreated: PropTypes.number.isRequired,

    })
}
