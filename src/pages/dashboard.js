import React,{useEffect,useState} from 'react'
import Timeline from '../components/timeline'
import Sidebar from '../components/sidebar/'
import Header from '../components/header'

export default function Dashboard({changed}) {

    useEffect(() => {
        document.title = 'BuzzMedia';
    }, [])

    const [isDark, setIsDark] = useState(false);
    // console.log('isDark',isDark);
    return (
        <div className={isDark ? 'dark' : ''}>
        <div className="bg-gray-background dark:bg-black-dark">

            <Header handleChange={(value) => {
                setIsDark(value);
                changed(value);
            }} />
            <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                <Timeline isDark={isDark} />
                <Sidebar isDark={isDark} />
            </div>
            
        </div>
        </div>
    )
}
