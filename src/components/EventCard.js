import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@material-ui/core';

function EventCard({ event, world }) {
  return (
    <Card style={{ marginBottom: '16px' }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {event.name}
        </Typography>
        <Typography variant="body2" component="p">
          {event.description.substring(0, 100)}...
        </Typography>
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.open('https://reliefweb.int/node/4053837', '_blank')}
            style={{ marginRight: '8px' }}
          >
            View More
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => world.moveToLocation(event.lat, event.lng)}
          >
            Go to Location
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default EventCard;