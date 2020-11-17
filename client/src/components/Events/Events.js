import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';
import './Events.css';
import Event from './Event/Event';

const Events = ({ history }) => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('');

  const [dropDownOpen, setDropDownOpen] = useState(false);

  const toggle = () => setDropDownOpen(!dropDownOpen);

  const getEvents = async (filter) => {
    try {
      const url = filter ? `/api/events/${filter}` : '/api/events';
      const response = await axios.get(url, {
        headers: { Authorization: `bearer ${token}` },
      });
      const { events } = response.data;

      setEvents(events);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleFilterClick = async (eventType) => {
    if (eventType !== filter) {
      try {
        const response = await axios.get(`/api/events/${eventType}`);
        const { events } = response.data;

        setFilter(eventType);
        setEvents(events);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteClick = async (eventId) => {
    try {
      await axios.delete(`/api/users/${userId}/events/${eventId}`);

      getEvents();
    } catch (error) {
      console.log(error);
    }
  };

  const handleMyEventsClick = async () => {
    if (filter !== 'myevents') {
      try {
        const response = await axios.get(`/api/users/${userId}/events`);
        const { events } = response.data;

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
