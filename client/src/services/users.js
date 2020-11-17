import axios from 'axios';

const baseUrl = '/api/users/';
let token = null;

const getUser = async (userId) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.get(`${baseUrl}/${userId}`, config);

  return response.data;
};

const createEventOfUser = async (userId, newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(
    `${baseUrl}/${userId}/events`,
    newObject,
    config
  );

  return response.data;
};

const deleteEventOfUser = async (userId, eventId, newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(
    `${baseUrl}/${userId}/events/${eventId}`,
    newObject,
    config
  );

  return response.data;
};

const usersService = {
  getUser,
  createEventOfUser,
  deleteEventOfUser,
};

export default usersService;
