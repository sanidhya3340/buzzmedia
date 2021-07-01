import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';



export default function Header({ username ,isDark}) {
    return (
        <div>
        <div className="flex border-b border-gray-primary dark:border-black-faded h-4 p-4 py-8">
            <div className="flex items-center">
                <Link to={`/p/${username}`} className="flex items-center">
                    <img
                        src={`/images/avatars/${username}.jpg`}
                        alt={`${username} profile `}
                        className="rounded-full h-8 w-8 flex mr-3"
                    />
                    <p className="font-bold dark:text-white">{username}</p>
                </Link>
            </div>
        </div>
        </div>
    )
}


Header.propTypes = {
    username: PropTypes.string.isRequired
}