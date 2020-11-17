import React from 'react';
import { Button } from 'reactstrap';
import moment from 'moment';

const Event = ({ event, handleDeleteClick }) => {
  const userId = localStorage.getItem('userId');

  return (
    <div className="event">
      <h3>{event.title}</h3>
      <img
        src={event.thumbnail_url}
        alt={event.title}
        style={{ width: '70%' }}
      />
      <div>
        <span>
          <b>Date: </b>
          {moment(event.date).format('L')}
        </span>
      </div>
      <div>
        <span>
          <b>Event Price: </b>
          {event.price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </span>
      </div>
      <div>
        <span>
          <b>Event Description: </b>
          {event.description}
        </span>
      </div>
      <br />
      <Button color="primary">Subscribe</Button>{' '}
      {event.user === userId ? (
        <Button color="danger" onClick={handleDeleteClick}>
          Delete
        </Button>
      ) : null}
    </div>
  );
};

export default Event;
