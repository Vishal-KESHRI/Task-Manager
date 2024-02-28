import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import Tasks from './Tasks';

// Mocking useDispatch hook
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('Tasks component', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockTask = {
    taskTitle: 'Test Task',
    subTasks: [
      { id: 1, title: 'Subtask 1', completed: true },
      { id: 2, title: 'Subtask 2', completed: false },
    ],
  };

  it('renders task title and subtasks count correctly', () => {
    const { getByText } = render(<Tasks currentTask={mockTask} />);
    expect(getByText('Test Task')).toBeInTheDocument();
    expect(getByText('1 of 2 subtasks')).toBeInTheDocument();
  });

  it('dispatches action on clicking task', () => {
    const { getByText } = render(<Tasks currentTask={mockTask} />);
    fireEvent.click(getByText('Test Task'));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'set edit task dialog',
      open: true,
      task: mockTask,
      column: undefined,
    });
  });

  // Add more test cases as needed
});
