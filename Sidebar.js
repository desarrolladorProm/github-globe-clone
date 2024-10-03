import React from 'react';
import { Card, CardContent, Typography, Link, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  sidebar: {
    width: '300px',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: theme.shape.borderRadius,
    overflowY: 'auto',
    maxHeight: '100vh',
  },
  card: {
    marginBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
  },
  status: {
    fontWeight: 'bold',
  },
  ongoing: {
    color: 'green',
  },
  completed: {
    color: 'red',
  },
}));

const Sidebar = ({ data }) => {
  const classes = useStyles();

  return (
    <Box className={classes.sidebar}>
      {data.map((item, index) => (
        <Card key={index} className={classes.card}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              {item.fields.name}
            </Typography>
            <Typography variant="body2" component="p">
              {item.fields.description}
            </Typography>
            <Typography variant="body2" component="p" className={classes.status}>
              Status: <span className={item.fields.status === 'ongoing' ? classes.ongoing : classes.completed}>{item.fields.status}</span>
            </Typography>
            <Link href={item.fields.url} target="_blank" rel="noopener">
              More Info
            </Link>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export { Sidebar };