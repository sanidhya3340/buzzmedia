import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
export default function User  ({username,fullName,test,isDark}) { 
return !username || !fullName ? (
    <Skeleton count={1} height={61} />
) : (
    <div className={isDark ? 'dark' : ''}>
    <Link to={`/p/${username}`} className="grid grid-cols-4 gap-4 mb-6 items-center">
        <div className="felx items-center justify-between col-span-1">
            {test}
            <img 
            className="rounded-full w-16 mr-3"
            src={`/images/avatars/${username}.jpg`} 
            alt="sanu" />
        </div>
        <div className="col-span-3">
            <p className="font-bold text-sm dark:text-gray-background">{username}</p>
            <p className="text-sm dark:text-gray-background">{fullName}</p>
        </div>
    </Link>
    </div>
);
}


User.propTypes = {
    username: PropTypes.string,
    fullName: PropTypes.string,
    test: PropTypes.number
}
