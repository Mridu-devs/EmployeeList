import {ADD_USER, REMOVE_USER, RESET_USERS} from './ActionTypes';

export const addUserToRecords = data => ({
  type: ADD_USER,
  payload: data,
});

export const removeItemFromRecords = index => ({
  type: REMOVE_USER,
  payload: index,
});

export const resetUsers = () => ({
  type: RESET_USERS,
});
// export const removeItemFromRecords = index => console.log(index);
