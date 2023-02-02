import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test(`creating excercises`, async () => {
  render(<App />);

  await userEvent.clear(
    screen.getByRole('spinbutton', { name: 'כמה תרגילים' })
  );
  await userEvent.type(
    screen.getByRole('spinbutton', { name: 'כמה תרגילים' }),
    '4'
  );
  await userEvent.click(screen.getByRole('button', { name: 'התחל' }));

  expect(screen.getByRole('heading', { name: 'בהצלחה' })).toBeInTheDocument();
  expect(screen.getAllByRole('spinbutton', { name: /result/i })).toHaveLength(
    4
  );
});
