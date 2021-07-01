import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import UseUser from '../../hooks/use-user';
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase';

export default function Header({
    photosCount,
    followerCount,
    setFollowerCount,
    profile: {
        docId: profileDocId,
        userId: profileUserId,
        fullName,
        followers = [],
        following = [],
        username: profileUsername },
        isDark
    }) {
    const { user } = UseUser();
    const [isFollowingProfile, setIsFollowingProfile] = useState(false);
    const activeBtnFollow = user.username && user.username !== profileUsername;

    const handleToggleFollow = async () => {
        setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
        // console.log('isFollowingProfile',isFollowingProfile);
        setFollowerCount({
            followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
        });

        await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId);
        // console.log('follwerCount', followerCount);
    };

    useEffect(() => {
        const isUserLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
            setIsFollowingProfile(!!isFollowing);
        };
        if (user.username && profileUserId) {
            isUserLoggedInUserFollowingProfile();
        }
    }, [user.username, profileUserId])

    return (
        <div className={isDark ? 'dark' : ''}>
        <div className="container col-span-2">
            {!user.username ? (
                <div>
                    <Skeleton count={1} width={1300} height={300} />
                </div>
            ) : (<div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                <div className="container flex justify-center">
                    {user.username && (<img
                        className="rounded-full h-40 w-40 flex"
                        alt={`${profileUsername} profile `}
                        src={`/images/avatars/${profileUsername}.jpg`}
                    />)}
                </div>
                <div className="flex items-center justify-center flex-col col-span-2">
                    <div className="container flex items-center">
                        <p className="text-2xl mr-4 dark:text-gray-primary">{profileUsername}</p>
                        {activeBtnFollow && (
                            <button
                                className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                                type="button"
                                onClick={handleToggleFollow}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        handleToggleFollow();
                                    }
                                }}
                            >
                                {isFollowingProfile ? 'Unfollow' : 'Follow'}
                            </button>
                        )}
                    </div>
                    <div className="container flex mt-4">
                        {followers === undefined || following === undefined ? (
                            <Skeleton count={1} width={677} height={24} />
                        ): (
                            <>
                                <p className="mr-10 dark:text-gray-primary">
                                    <span className="font-bold dark:text-gray-primary">{photosCount}</span> photos
                                </p>
                                <p className="mr-10 dark:text-gray-primary">
                                <span className="font-bold dark:text-gray-primary">{followerCount}</span>{`   `}
                                {followers.length === 1 ? 'follower' : 'followers'}
                                </p>
                                <p className="mr-10 dark:text-gray-primary">
                                <span className="font-bold dark:text-gray-primary">{following.length}</span> following
                                </p>
                            </>
                        )}
                    </div>
                    <div className="container mt-4">
                        <p className="font-medium dark:text-gray-primary">{!fullName ? <Skeleton count={1} heifht={24} /> : fullName }</p>
                    </div>
                </div>
            </div>)}

        </div>
        </div>
    )
}


Header.propTypes = {
    photosCount: PropTypes.number.isRequired,
    followerCount: PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        docId: PropTypes.string,
        userId: PropTypes.string,
        fullName: PropTypes.string,
        profileUsername: PropTypes.string,
        following: PropTypes.array,
        followers: PropTypes.array
    }).isRequired
}