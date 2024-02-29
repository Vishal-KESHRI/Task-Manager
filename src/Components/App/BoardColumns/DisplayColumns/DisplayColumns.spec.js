import React from 'react';
import { shallow } from 'enzyme';
import DisplayColumns from './index';
import { Provider } from 'react-redux'; 


describe('DisplayColumns Component', () => {
    jest.mock('react-redux', () => ({
        ...jest.requireActual('react-redux'),
        useDispatch: jest.fn(),
        useSelector: jest.fn(),
      }));

      
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

  const mockStore = createMockStore([]); 
  const mockColumns = [];
  const wrapper = shallow(
    <Provider store={mockStore}>
      <DisplayColumns columns={mockColumns}/>
    </Provider> );


  it('renders columns and tasks correctly', () => {
  
    const useDispatch = jest.fn();
    expect(wrapper.find('.column')).toHaveLength(mockColumns.length);

    mockColumns.forEach((column, index) => {
      expect(wrapper.find('.column').at(index).find('.column_title').text()).toContain(`${column.columnTitle} (${column.tasks.length})`);
      expect(wrapper.find('.column').at(index).find('.message').exists()).toBe(column.tasks.length === 0);
    });
  });

  it('displays "Add New Column" button when less than 5 columns are present', () => {
    const useDispatch = jest.fn();
    expect(wrapper.find('.addNewColumnButton').exists()).toBe(false);
  });

});
