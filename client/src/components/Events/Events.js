import React, { useState, useEffect } from 'react';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';
import './Events.css';
import Event from './Event/Event';
import userService from '../../services/users';
import eventService from '../../services/events';

const Events = ({ history }) => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('');
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  const [dropDownOpen, setDropDownOpen] = useState(false);

  const toggle = () => setDropDownOpen(!dropDownOpen);

  const getEvents = async () => {
    try {
      const data = await eventService.getAllEvents(config);
      const { events } = data;

      setEvents(events);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getEvents();
    } else {
      history.push('/');
    }
  });

  const handleFilterClick = async (eventType) => {
    if (eventType !== filter) {
      try {
        const data = await eventService.getEventsByEventType(eventType, config);
        const { events } = data;

        setFilter(eventType);
        setEvents(events);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteClick = async (eventId) => {
    try {
      await userService.deleteEventOfUser(userId, eventId, config);

      getEvents();
    } catch (error) {
      console.log(error);
    }
  };

  const handleMyEventsClick = async () => {
    if (filter !== 'myevents') {
      try {
        const data = await userService.getEventsOfUser(userId, config);
        const { events } = data;

        setFilter('myevents');
        setEvents(events);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div>
        <div id="filter-buttons">
          <Dropdown isOpen={dropDownOpen} toggle={toggle}>
            <DropdownToggle caret>Filter Events</DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                onClick={() => handleFilterClick('')}
                active={filter === ''}
              >
                All Events
              </DropdownItem>
              <DropdownItem
                onClick={() => handleFilterClick('dancing')}
                active={filter === 'dancing'}
              >
                Dancing Events
              </DropdownItem>
              <DropdownItem
                onClick={() => handleFilterClick('running')}
                active={filter === 'running'}
              >
                Running Events
              </DropdownItem>
              <DropdownItem
                onClick={() => handleFilterClick('learning')}
                active={filter === 'learning'}
              >
                Learning Events
              </DropdownItem>

              <DropdownItem
                onClick={() => handleFilterClick('art')}
                active={filter === 'art'}
              >
                Art Events
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button onClick={handleMyEventsClick} active={filter === 'myevents'}>
            My events
          </Button>
        </div>
      </div>
      <div id="events">
        {events.map((event) => {
          return (
            <React.Fragment key={event.id}>
              <Event
                event={event}
                handleDeleteClick={() => handleDeleteClick(event.id)}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Events;
