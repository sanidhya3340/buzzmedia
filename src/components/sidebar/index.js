import React from 'react'
import UseUser from '../../hooks/use-user';
import User from './user';
import Suggestions from './suggestions';

export default function Sidebar() {
    const { user: { docId,fullname, username, userId, following, isDark } 
    } = UseUser();
    // console.log('fullName, username, userId',fullname, username, userId);
    // console.log('docId',docId);
    // const [test, setTest] = React.useState(0)

    return (
        <div className="invisible md:visible md:p-4">
            <User username={username} fullName={fullname} isDark={isDark} />
            <Suggestions userId={userId} following={following} loggedInUserDocId={docId} isDark={isDark} />
        </div>
    )
}
Sidebar.whyDidYouRender = true;
