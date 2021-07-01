import React from 'react';
import PropTypes from 'prop-types';

export default function Image({ url, caption }) {
    // console.log('url',url);

    return <img src={url} alt={caption} />;
}
Image.prototype = {
    src: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired
}