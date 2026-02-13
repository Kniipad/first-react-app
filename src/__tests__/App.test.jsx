import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import App from '../App.jsx'

// helper สำหรับ mock fetch response
const mockResponse = (data) => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(data),
  });
};

// =============================
// ย้ายค่าคงที่มาไว้ด้านบน
// =============================

const todoItem1 = { id: 1, title: 'First todo', done: false, comments: [] };

const todoItem2 = {
  id: 2,
  title: 'Second todo',
  done: false,
  comments: [
    { id: 1, message: 'First comment' },
    { id: 2, message: 'Second comment' },
  ],
};

const originalTodoList = [
  todoItem1,
  todoItem2,
];

describe('App', () => {

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it('renders correctly', async () => {

    global.fetch.mockImplementationOnce(() =>
      mockResponse(originalTodoList)
    );

    render(<App />);

    expect(await screen.findByText('First todo')).toBeInTheDocument();
    expect(await screen.findByText('Second todo')).toBeInTheDocument();
  });


  it('toggles done on a todo item', async () => {

    const toggledTodoItem1 = { ...todoItem1, done: true };

    global.fetch
      .mockImplementationOnce(() => mockResponse(originalTodoList))   // initial load
      .mockImplementationOnce(() => mockResponse(toggledTodoItem1)); // toggle result

    render(<App />);

    // ก่อนกด toggle ยังไม่มี class done
    expect(await screen.findByText('First todo'))
      .not.toHaveClass('done');

    const toggleButtons = await screen.findAllByRole('button', { name: /toggle/i });

    toggleButtons[0].click();

    // หลัง toggle ต้องมี class done
    expect(await screen.findByText('First todo'))
      .toHaveClass('done');

    // ตรวจสอบว่า fetch ถูกเรียกถูก URL และ method ถูกต้อง
    expect(global.fetch).toHaveBeenLastCalledWith(
      expect.stringMatching(/1\/toggle/),
      { method: 'PATCH' }
    );
  });

});
