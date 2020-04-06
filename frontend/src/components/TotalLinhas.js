import React, { useState, useEffect } from 'react';
import { Typography, makeStyles, Avatar } from '@material-ui/core';
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
      flex: 1,
    },
    title: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-betwenn',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  const classes = useStyles();

  return (
    <CardTemplate>
      <div className={classes.title}>
        <Avatar>
          <AssignmentIcon />
        </Avatar>
        <Title>Total de linhas cadastradas</Title>
      </div>
      <Typography color="textSecondary" className={classes.depositContext}>
        somado de todas as operadoras
      </Typography>
      <Typography component="p" variant="h3">
        {totalLinhas}
      </Typography>
    </CardTemplate>
  );
}
