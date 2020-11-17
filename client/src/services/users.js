import axios from 'axios';

const baseUrl = 'http://localhost:8000/api/users';

const getUser = async (userId, config) => {
  const response = await axios.get(`${baseUrl}/${userId}`, config);

  return response.data;
};

const getEventsOfUser = async (userId, config) => {
  const response = await axios.get(`${baseUrl}/${userId}/events`, config);

  return response.data;
};

const createEventOfUser = async (userId, newObject, config) => {
  const response = await axios.post(
    `${baseUrl}/${userId}/events`,
    newObject,
    config
  );

  return response.data;
};

const deleteEventOfUser = async (userId, eventId, newObject, config) => {
  const response = await axios.delete(
    `${baseUrl}/${userId}/events/${eventId}`,
    newObject,
    config
  );

  return response.data;
};

const userService = {
  getUser,
  createEventOfUser,
  deleteEventOfUser,
  getEventsOfUser,
};

export default userService;
