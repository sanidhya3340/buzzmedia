import React,{ useState } from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom';
import {updateLoggedInUserFollowing, updateFollowedUserFollowers} from '../../services/firebase'

export default function SuggestedProfile({profileDocId,username,profileId,userId,loggedInUserDocId,isDark}) {
    const [followed, setFollowed] = useState(false);

    async function handleFollowUser(){
        setFollowed(true);
        await updateLoggedInUserFollowing(loggedInUserDocId, profileId,false);
        await updateFollowedUserFollowers(profileDocId,userId,false)
    }


    return !followed ? (
        <div className={isDark ? 'dark' : ''}>
        <div className="flex flex-row align-items justify-between">
            <div className="flex items-center justify-between">
                <img 
                src={`/images/avatars/${username}.jpg`}
                alt=""
                className="rounded-full w-8 flex mx-3"
                />
                <Link to={`/p/${username}`}>
                    <p className="font-bold text-sm dark:text-gray-background">{username}</p>
                </Link>
            </div>
                <button
                className="text-xs font-bold text-blue-medium"
                type="button"
                onClick={handleFollowUser}
                >
                    Follow
                </button>
            
        </div>
        </div>
    ) : null ;
}


SuggestedProfile.propTypes = {
    profileDocId : PropTypes.string.isRequired,
    username : PropTypes.string.isRequired,
    profileId : PropTypes.string.isRequired,
    userId : PropTypes.string.isRequired,
    loggedInUserDocId :PropTypes.string.isRequired
}