import React from 'react';
import PropTypes from 'prop-types';

export default function Image({ src, caption}) {
    // console.log('src',src);
    
    return <img src={src} alt={caption}/>;
}
Image.prototype = {
    src: PropTypes.string.isRequired,
    caption : PropTypes.string.isRequired
}