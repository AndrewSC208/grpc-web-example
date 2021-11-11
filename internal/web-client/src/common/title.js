import React from 'react';
import PropTypes from 'prop-types';

export const Title = ({text}) => <h1>{text}</h1>

Title.propTypes = {
     text: PropTypes.string.isRequired
};