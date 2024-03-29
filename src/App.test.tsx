import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import App from './App';

test(`creating excercises`, async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.clear(screen.getByRole('spinbutton', { name: 'כמה תרגילים' }));
  await user.type(screen.getByRole('spinbutton', { name: 'כמה תרגילים' }), '4');
  await user.click(screen.getByRole('button', { name: 'התחל' }));

  expect(screen.getByRole('heading', { name: 'בהצלחה' })).toBeInTheDocument();
  expect(screen.getAllByRole('spinbutton', { name: /תוצאת/i })).toHaveLength(4);
});

test(`doesn't start without selecting at least one operation`, async () => {
  render(<App />);

  await userEvent.click(screen.getByRole('checkbox', { name: 'חיבור' }));
  await userEvent.click(screen.getByRole('button', { name: 'התחל' }));

  expect(screen.getByRole('alert')).toHaveTextContent(new RegExp('לפחות'));

  await userEvent.click(screen.getByRole('checkbox', { name: 'חיבור' }));
  await userEvent.click(screen.getByRole('button', { name: 'התחל' }));

  expect(screen.getByRole('heading', { name: 'בהצלחה' })).toBeInTheDocument();
});

const Operations = [
  { name: 'addition', label: 'חיבור', operator: '+' },
  { name: 'subtraction', label: 'חיסור', operator: '-' },
  { name: 'multiplication', label: 'כפל', operator: '×' },
  { name: 'division', label: 'חילוק', operator: '÷' },
];
test.each(Operations)(
  `selecting $name creates form with $name`,
  async ({ label, operator }) => {
    render(<App />);

    await userEvent.click(screen.getByRole('checkbox', { name: 'חיבור' }));
    await userEvent.click(screen.getByRole('checkbox', { name: label }));

    await userEvent.click(screen.getByRole('button', { name: 'התחל' }));

    expect(
      screen.getAllByTestId('operator').map((el) => el.textContent)
    ).toEqual(operator.repeat(10).split(''));
  }
);

test(`can change range only when Addition is selected`, async () => {
  render(<App />);

  expect(screen.getByRole('slider', { name: /גבול עליון/i })).toBeEnabled();

  await userEvent.click(screen.getByRole('checkbox', { name: 'חיבור' }));

  expect(screen.getByRole('slider', { name: /גבול עליון/i })).toBeDisabled();
});
