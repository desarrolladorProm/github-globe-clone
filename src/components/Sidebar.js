import React from 'react';
import { Box } from '@material-ui/core';
import EventCard from './EventCard';

function Sidebar({ events, world }) {
  return (
    <Box id="sidebar" style={{ padding: '16px', maxHeight: '100vh', overflowY: 'auto' }}>
      {events.map((event, index) => (
        <EventCard key={index} event={event} world={world} />
      ))}
    </Box>
  );
}

export default Sidebar;