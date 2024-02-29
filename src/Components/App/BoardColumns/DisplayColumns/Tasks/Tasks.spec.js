import React from 'react';
import { shallow } from 'enzyme';
import Tasks from './index';
import { Provider } from 'react-redux'; 


// Define a function to create a mock store
const createMockStore = (initialState) => {
  // Create a mock dispatch function that logs actions
  const mockDispatch = jest.fn();

  // Create a mock store object
  const store = {
    getState: () => initialState,
    dispatch: mockDispatch,
    subscribe: () => {}, // Mocked subscribe function
    // Add any other methods or properties your store might use
  };

  // Return the mock store
  return store;
};

describe('Tasks Component', () => {
  const mockDispatch = jest.fn();
  const mockStore = createMockStore([]); // Create a mock Redux store
 const useDispatch = jest.fn();
  const mockProps = {
    currentTask: {
      taskTitle: 'Sample Task',
      subTasks: [{ id: 1, completed: true }, { id: 2, completed: false }],
    },
    currentColumn: 'ToDo',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches correct action when task is clicked', () => {
    const wrapper = shallow(
      <Provider store={mockStore}>
        <Tasks {...mockProps} />
      </Provider> );
    console.log(wrapper.debug()); // Print component hierarchy to console
  });
});
