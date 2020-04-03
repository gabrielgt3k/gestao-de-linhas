import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Rural Brasil
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(3, 2),
    display: 'flex',
    flexDirection: 'column',
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[800]
        : theme.palette.grey[200],
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container align="center" maxWidth="sm">
          <Typography variant="body1" />
          <Copyright />
        </Container>
      </footer>
    </>
  );
}
