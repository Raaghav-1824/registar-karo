// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import ModalCreateTask from './ModalCreateTask';
// import { Task } from '../../interfaces';

// // Mocking the required Redux hook
// jest.mock('../../store/hooks', () => ({
//   useAppSelector: jest.fn().mockReturnValue(['Directory1', 'Directory2']),
// }));

// describe('ModalCreateTask', () => {
//   const mockOnClose = jest.fn();
//   const mockOnConfirm = jest.fn();

//   beforeEach(() => {
//     mockOnClose.mockClear();
//     mockOnConfirm.mockClear();
//   });

//   test('renders modal with default values when creating a new task', () => {
//     render(
//       <ModalCreateTask
//         onClose={mockOnClose}
//         task={undefined}
//         nameForm="Create Task"
//         onConfirm={mockOnConfirm}
//       />
//     );

//     // Ensure the modal title is rendered correctly
//     expect(screen.getByText(/Create Task/i)).toBeInTheDocument();

//     // Ensure the default input fields are rendered
//     expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Select a Directory/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Mark as important/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Mark as completed/i)).toBeInTheDocument();
//   });

//   test('handles form submission and calls onConfirm', async () => {
//     render(
//       <ModalCreateTask
//         onClose={mockOnClose}
//         task={undefined}
//         nameForm="Create Task"
//         onConfirm={mockOnConfirm}
//       />
//     );

//     // Simulate user input
//     fireEvent.change(screen.getByLabelText(/Title/i), {
//       target: { value: 'Test Task' },
//     });
//     fireEvent.change(screen.getByLabelText(/Date/i), {
//       target: { value: '2025-12-31' },
//     });

//     // Simulate checkbox selection
//     fireEvent.click(screen.getByLabelText(/Mark as important/i));
//     fireEvent.click(screen.getByLabelText(/Mark as completed/i));

//     // Simulate form submission
//     fireEvent.click(screen.getByText('Create Task'));

//     await waitFor(() => {
//       expect(mockOnConfirm).toHaveBeenCalledTimes(1);
//       expect(mockOnConfirm).toHaveBeenCalledWith({
//         title: 'Test Task',
//         dir: 'Directory1',
//         description: '',
//         date: '2025-12-31',
//         completed: true,
//         important: true,
//         id: expect.any(String),
//       });
//     });

//     // Ensure onClose is called after submission
//     expect(mockOnClose).toHaveBeenCalledTimes(1);
//   });

//   test('does not submit if title or date is missing', async () => {
//     render(
//       <ModalCreateTask
//         onClose={mockOnClose}
//         task={undefined}
//         nameForm="Create Task"
//         onConfirm={mockOnConfirm}
//       />
//     );

//     // Simulate form submission without filling out title
//     fireEvent.click(screen.getByText('Create Task'));

//     // Ensure onConfirm was not called
//     await waitFor(() => {
//       expect(mockOnConfirm).toHaveBeenCalledTimes(0);
//     });
//   });

//   test('renders the modal with task data when editing a task', () => {
//     const task: Task = {
//       id: '1',
//       title: 'Test Task',
//       description: 'Test description',
//       date: '2025-12-31',
//       completed: true,
//       important: true,
//       dir: 'Directory1',
//     };

//     render(
//       <ModalCreateTask
//         onClose={mockOnClose}
//         task={task}
//         nameForm="Edit Task"
//         onConfirm={mockOnConfirm}
//       />
//     );

//     // Ensure modal title is correct
//     expect(screen.getByText(/Edit Task/i)).toBeInTheDocument();

//     // Ensure form fields are pre-filled with task data
//     expect(screen.getByLabelText(/Title/i).value).toBe(task.title);
//     expect(screen.getByLabelText(/Date/i).value).toBe(task.date);
//     expect(screen.getByLabelText(/Description/i).value).toBe(task.description);
//     expect(screen.getByLabelText(/Mark as important/i).checked).toBe(task.important);
//     expect(screen.getByLabelText(/Mark as completed/i).checked).toBe(task.completed);
//     expect(screen.getByLabelText(/Select a Directory/i).value).toBe(task.dir);
//   });
// });


