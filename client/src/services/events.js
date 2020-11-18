import axios from 'axios';

const baseUrl = 'http://localhost:8000/api/events';

const getEventsByEventType = async (eventType, config) => {
  const response = await axios.get(`${baseUrl}/${eventType}`, config);

  return response.data;
};

const getAllEvents = async (config) => {
  const response = await axios.get(baseUrl, config);

  return response.data;
};

const eventService = {
  getEventsByEventType,
  getAllEvents,
};

export default eventService;

