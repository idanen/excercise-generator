import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { InitForm } from './InitForm';

test(`validates at least one operation selection`, async () => {
  const spy = vi.fn().mockImplementation(() => {});
  render(<InitForm onInit={spy} />);

  await userEvent.click(screen.getByRole('checkbox', { name: 'חיבור' }));
  await userEvent.click(screen.getByRole('button', { name: 'התחל' }));

  expect(screen.getByRole('alert')).toHaveTextContent(new RegExp('לפחות'));

  await userEvent.click(screen.getByRole('checkbox', { name: 'חיבור' }));
  await userEvent.click(screen.getByRole('button', { name: 'התחל' }));

  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  expect(spy).toBeCalledTimes(1);
});
