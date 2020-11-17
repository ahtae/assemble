import axios from 'axios';

const baseUrl = '/api/events';
let token = null;

const getEventsByEventType = async (eventType) => {
  const response = await axios.get(`${baseUrl}/${eventType}`);

  return response.data;
};

const getAllEvents = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const eventsService = {
  getEventsByEventType,
  getAllEvents,
};

export default eventsService;
