import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Button, ButtonGroup } from 'reactstrap';
import './Events.css';

const Events = ({ history }) => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState(null);

  const getEvents = async (filter) => {
    try {
      const url = filter ? `/api/events/${filter}` : '/api/events';
      const response = await axios.get(url);
      const { events } = response.data;

      setEvents(events);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleFilterClick = (eventType) => {
    setFilter(eventType)
  };

  console.log(events);
  return (
    <div>
      <h2 id="events-title">Events</h2>
      <div id="filter-buttons">
        <ButtonGroup>
          <Button
            onClick={() => handleFilterClick(null)}
            active={filter === null}
          >
            All
          </Button>
          <Button
            onClick={() => handleFilterClick('dancing')}
            active={filter === 'dancing'}
          >
            Dancing
          </Button>
          <Button
            onClick={() => handleFilterClick('running')}
            active={filter === 'running'}
          >
            Running
          </Button>
          <Button
            onClick={() => handleFilterClick('learning')}
            active={filter === 'learning'}
          >
           Learning
          </Button>
          <Button
            onClick={() => handleFilterClick('art')}
            active={filter === 'art'}
          >
            Art
          </Button>
          <Button
            onClick={() => handleFilterClick('myevents')}
            active={filter === 'myevents'}
          >
            My events
          </Button>
        </ButtonGroup>
      </div>
      <div id="events">
        {events.map((event) => {
          return (
            <div className="event" key={event.id}>
              <header
                style={{ backgroundImage: `url(${event.thumbnail_url})` }}
              >
                <h3>{event.title}</h3>
                <p>{moment(event.date).format('L')}</p>
                <p>Event Price: {parseFloat(event.price)}</p>
                <p>Event Description: {event.description}</p>
                <Button color="danger">subscribe</Button>
              </header>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Events;
