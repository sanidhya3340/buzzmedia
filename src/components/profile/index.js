import React,{useReducer,useEffect} from 'react'
import PropTypes from 'prop-types'
import Header from './header'
import Photos from './photos'
import {  getUserPhotosByUsername } from '../../services/firebase';


export default function Profile({user,isDark}) {
    const reducer = (state, newState) => ({...state, ...newState});
    const initialState = {
        profile: {},
        photosCollection : [],
        followerCount: 0
    };
    const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(reducer,initialState);

    useEffect(() => {
        async function getProfileInfoAndPhotos(){
            const photos = await getUserPhotosByUsername(user.username);
            console.log('photos',photos);
            dispatch({profile: user, photosCollection: photos, followerCount: user.followers.length });
        }
        getProfileInfoAndPhotos();
        
    }, [user]);

    return (
        <>
            <Header 
                photosCount={photosCollection ? photosCollection.length : 0}
                profile = {profile}
                followerCount = {followerCount}
                setFollowerCount = {dispatch}
                isDark={isDark}
            />
            <Photos photos={photosCollection} isDark={isDark} />
        </>
    )
}

Profile.propTypes = {
    user: PropTypes.shape({
        dateCreated: PropTypes.number.isRequired,
        emailAddress: PropTypes.string.isRequired,
        followers: PropTypes.array.isRequired,
        following: PropTypes.array.isRequired,
        fullName: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
    }).isRequired
};