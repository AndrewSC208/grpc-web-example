import React from 'react';
import PropTypes from 'prop-types';

export const Navigation = ({views}) => {
    let viewLinks = views.map((name, i) => <li key={i}><a>{name}</a></li>)

    return (
        <ul>{viewLinks}</ul>
    )
};

Navigation.propTypes = {
    views: PropTypes.array.isRequired
};