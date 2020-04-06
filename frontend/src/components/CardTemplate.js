import React from 'react';
import { makeStyles, Container, Grid, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export default function CardTemplate({ children }) {
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
    container: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(4),
    },
  }));

  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item>
          <Paper className={fixedHeightPaper}>{children}</Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

CardTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};
