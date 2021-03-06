import React from 'react';
import { makeStyles, Container } from '@material-ui/core';
import TotalLinhas from '../components/TotalLinhas';
import TotalEquipamentos from '../components/TotalEquipamentos';

export default function Home() {
  const useStyles = makeStyles(() => ({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }));

  const classes = useStyles();

  return (
    <Container component="div" className={classes.container}>
      <TotalLinhas />
      <TotalEquipamentos />
    </Container>
  );
}
