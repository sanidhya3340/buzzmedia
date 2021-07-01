import React from 'react';
import PropTypes from 'prop-types';


export default function Footer({caption,username,isDark}) {
    return (
        <div className={isDark ? 'dark' : ''}>
        <div className="p-4 pt-2 pb-0">
            <span className="mr-1 font-bold dark:text-white">{username}</span>
            <span className="dark:text-white" >{caption}</span>
        </div>
        </div>
    )
}


Footer.propTypes = {
    caption : PropTypes.string.isRequired,
    username : PropTypes.string.isRequired
}