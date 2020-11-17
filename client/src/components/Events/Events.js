import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, ButtonGroup } from 'reactstrap';
import './Events.css';
import Event from './Event/Event';

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
    setFilter(eventType);
  };

  return (
    <div>
      <div>
        <div id="filter-buttons">
          <ButtonGroup>
            <Button
              onClick={() => handleFilterClick(null)}
              active={filter === null}
            >
              All Events
            </Button>
            <Button
              onClick={() => handleFilterClick('dancing')}
              active={filter === 'dancing'}
            >
              Dancing Events
            </Button>
            <Button
              onClick={() => handleFilterClick('running')}
              active={filter === 'running'}
            >
              Running Events
            </Button>
            <Button
              onClick={() => handleFilterClick('learning')}
              active={filter === 'learning'}
            >
              Learning Events
            </Button>
            <Button
              onClick={() => handleFilterClick('art')}
              active={filter === 'art'}
            >
              Art Events
            </Button>
            <Button
              onClick={() => handleFilterClick('myevents')}
              active={filter === 'myevents'}
            >
              My events
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <div id="events">
        {events.map((event) => {
          return (
            <React.Fragment key={event.id}>
              <Event event={event} />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Events;
