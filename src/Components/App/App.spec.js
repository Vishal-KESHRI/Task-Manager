import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import App from './index';
import Store from './Store'; // Import your Redux store

describe('App Component', () => {
  it('renders without crashing', () => {
    // Mock the Redux store
    const mockStore = Store; // Replace this with a mock store if needed

    const wrapper = shallow(
      <Provider store={mockStore}>
        <App />
      </Provider>
    );

    expect(wrapper.exists()).toBe(true);
  });

  it('renders HeaderBar component', () => {
    const wrapper = shallow(
      <Provider store={Store}>
        <App />
      </Provider>
    );

    expect(wrapper.find('HeaderBar').exists()).toBe(false);
  });

  it('renders SideBar component', () => {
    const wrapper = shallow(
      <Provider store={Store}>
        <App />
      </Provider>
    );

    expect(wrapper.find('SideBar').exists()).toBe(false);
  });

  it('renders BoardColumns component', () => {
    const wrapper = shallow(
      <Provider store={Store}>
        <App />
      </Provider>
    );

    expect(wrapper.find('BoardColumns').exists()).toBe(false);
  });
});
