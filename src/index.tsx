import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement ?? document.body);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
