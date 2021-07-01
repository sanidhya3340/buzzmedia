import React from 'react'
import Skeleton from 'react-loading-skeleton'
import usePhotos from '../hooks/use-photos'
import Post from './post'
import useFirestore from '../hooks/useFirestore';
import UpdatedPost from './updatedpost';


export default function Timeline({isDark}) {

    //we need to get the logged in user's photo(hook)
    const { photos } = usePhotos();
    // console.log('photos', photos);
    //on loading the photos we need to use the react skeleton
    //If we have photos, render them (create a post component
    //If the user has no photos tell them to create some photos

    const { docs } = useFirestore('images');
    // console.log(docs);
    // console.log(photos);

    return (
        <div className="w-full container col-span-3 md:container md:col-span-2">

            {docs.length > 0 ? (
                docs.map(doc =>
                    <UpdatedPost key={doc.id} content={doc} isDark={isDark} />
                    )
            ): null}

            {!photos ? (
                <div>
                    {/* <p>I am working</p> */}
                    <Skeleton count={4} width={640} height={500} className="mb-4" />
                </div>
            ) : photos?.length > 0 ? (
                // <p>I am 22 working</p>
                photos.map( (content) => <Post key={content.docId} content={content} isDark={isDark} />)
            ) : (
                <p className="text-center text-2xl">Follow people to see photos</p>
            )}
        </div>
        // <p>I am timeline</p>
    )
}
