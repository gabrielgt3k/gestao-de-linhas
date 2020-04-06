import React, { useState, useEffect } from 'react';
import { Typography, makeStyles, Avatar } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Title from './Title';
import CardTemplate from './CardTemplate';

export default function TotalLinhas() {
  const [totalEquip, setTotalEquip] = useState(0);

  useEffect(() => {
    setTotalEquip(999);
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
        <Title>Total de Equipamentos</Title>
      </div>
      <Typography color="textSecondary" className={classes.depositContext}>
        Notebooks, celulares etc
      </Typography>
      <Typography component="p" variant="h3">
        {totalEquip}
      </Typography>
    </CardTemplate>
  );
}
