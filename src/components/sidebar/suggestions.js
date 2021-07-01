import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import {getSuggestedProfiles} from '../../services/firebase'
import SuggestedProfile from './suggested-profile'

export default function Suggestions({userId, following,loggedInUserDocId, isDark}) {

    const [profiles, setProfiles] = useState(null);
    //get the suggested profiles
    useEffect(() => {
        async function suggestedProfiles() {
            const response = await getSuggestedProfiles(userId,following);
            setProfiles(response);
        }
        // console.log('userId',userId);
        // console.log('profiles',profiles);
        if(userId){
            suggestedProfiles()
        }
    }, [userId,following])

    return !profiles ? (
        <Skeleton count={1} height={150} className="mt-5" />
    ): profiles.length > 0 ? (
        <div className="rounded flex flex-col">
            <div className="text-sm flex items-center align-items justify-between mb-2">
                <p className="font-bold text-gray-base">Suggestion for you</p>
            </div>
            <div className="mt-4 grid gap-5">
                {profiles.map((profile)=> (
                    <SuggestedProfile
                    key={profile.docId}
                    profileDocId={profile.docId}
                    username={profile.username}
                    profileId={profile.userId}
                    userId={userId}
                    loggedInUserDocId={loggedInUserDocId}
                    isDark={isDark}
                    />
                ))}
            </div>
        </div>
    ) : null
}

//4:57:16

Suggestions.propTypes={
    userId : PropTypes.string,
    following: PropTypes.array,
    loggedInUserDocId: PropTypes.string
}