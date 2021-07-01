import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore } from '../lib/firebase';

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        // references
        const storageRef = projectStorage.ref(file.name);
        const collectionRef = projectFirestore.collection('images');

        storageRef.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, (err) => {
            setError(err);
        }, async () => {
            const url = await storageRef.getDownloadURL();
            const caption = 'How is this one?';
            const username = "sanu";
            const likes = ["4"];
            const comments= ["Nice Pictue!"];
            const userLikedPhoto = false;
            
            await collectionRef.add({ url,caption,username,likes,comments,userLikedPhoto });
            setUrl(url);
        });
    }, [file]);

    return { progress, url, error };
}

export default useStorage;


// username: PropTypes.string.isRequired,
//     url: PropTypes.string.isRequired,
//         caption: PropTypes.string.isRequired,
//             id: PropTypes.string.isRequired,
//                 userLikedPhotos: PropTypes.bool,
//                     likes: PropTypes.array.isRequired,
//                         comments: PropTypes.array.isRequired,
//                             dateCreated: PropTypes.number.isRequired,