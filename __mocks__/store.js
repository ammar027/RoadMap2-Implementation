import { configureStore } from '@reduxjs/toolkit';

const mockReducer = (state = { mockData: 'test' }, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, mockData: action.payload };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: {
    someReducer: mockReducer,
  },
});
