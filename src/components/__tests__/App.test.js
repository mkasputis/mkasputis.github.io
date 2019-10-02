import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';

import App from '../App';

test('find React in skills', async () => {
  const { container, getByText, getByTestId } = render(<App/>);
  fireEvent.click(getByText('Skills'));
  const itemNode = await waitForElement(
    () => getByText('Javascript')
  );
  const { children } = itemNode.parentElement;
  const skills = [...children].map(child => child.textContent);
  expect(skills.includes('React')).toBe(true);
});
