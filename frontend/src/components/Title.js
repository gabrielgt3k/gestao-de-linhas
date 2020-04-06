import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

export default function Title({ children }) {
  return (
    <Typography component="h3" variant="h6" color="primary" gutterBottom>
      {children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
};
