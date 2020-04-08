import React, { useState, useEffect } from 'react';
import { Typography, makeStyles, Avatar } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Title from './Title';
import CardTemplate from './CardTemplate';

import api from '../services/api';

export default function TotalLinhas() {
  const [totalLinhas, setTotalLinhas] = useState(0);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('/linhas');

      setTotalLinhas(response.headers['x-total-count']);
    }

    loadData();
  }, []);

  const useStyles = makeStyles(theme => ({
    depositContext: {
      flex: 2,
      textAlign: 'center',
    },
    title: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-betwenn',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    avatar: {
      color: '#fff',
      backgroundColor: green[500],
      width: 50,
      height: 50,
    },
  }));

  const classes = useStyles();

  return (
    <CardTemplate>
      <div className={classes.title}>
        <Avatar className={classes.avatar}>
          <AssignmentIcon />
        </Avatar>
        <Title color="info">Total Linhas cadastradas</Title>
      </div>
      <Typography style={{ textAlign: 'center' }} component="p" variant="h3">
        {totalLinhas}
      </Typography>
      <Typography
        color="textSecondary"
        component="p"
        className={classes.depositContext}
      >
        todas as operadoras
      </Typography>
    </CardTemplate>
  );
}
