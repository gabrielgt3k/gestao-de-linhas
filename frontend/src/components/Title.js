import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

export default function Title({ children }) {
  const useStyles = makeStyles(theme => ({
    title: {
      color: theme.palette.info.main,
    },
  }));

  const classes = useStyles();

  return (
    <Typography
      className={classes.title}
      component="h3"
      variant="h6"
      gutterBottom
    >
      {children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
};
