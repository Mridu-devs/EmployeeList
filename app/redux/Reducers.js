import {ADD_USER, REMOVE_USER, RESET_USERS} from './ActionTypes';

export const Reducers = (state = [], action) => {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.payload];

    case REMOVE_USER:
      const deleteArray = state.filter((user, index) => {
        return index !== action.payload;
      });
      return deleteArray;

    case RESET_USERS:
      return [];

    default:
      return state;
  }
};
// export const Reducers = (state = [], action) => console.log('action', action);
