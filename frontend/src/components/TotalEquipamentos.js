import React, { useState, useEffect } from 'react';
import { Typography, makeStyles, Avatar } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { pink } from '@material-ui/core/colors';
import Title from './Title';
import CardTemplate from './CardTemplate';

export default function TotalLinhas() {
  const [totalEquip, setTotalEquip] = useState(0);

  useEffect(() => {
    setTotalEquip(999);
  }, []);

  const useStyles = makeStyles(theme => ({
    depositContext: {
      flex: 2,
      textAlign: 'center',
      marginTop: 10,
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
      backgroundColor: pink[500],
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
        <Title>Equipamentos</Title>
      </div>
      <Typography style={{ textAlign: 'center' }} component="p" variant="h3">
        {totalEquip}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Notebooks, celulares etc
      </Typography>
    </CardTemplate>
  );
}
