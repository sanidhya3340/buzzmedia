import React, { useEffect } from 'react';
import useStorage from '../hooks/useStorage';

export default function ProgressBar({file,setFile}){
    const {url} = useStorage(file);
    useEffect(() => {
        
        if(url) {
            setFile(null);
        }
        
    }, [url, setFile])
    return (
        <div>
        </div>
    )
}