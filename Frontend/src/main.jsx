import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './redux/store/store.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Wrap App inside Provider */}
      <App />
    </Provider>
  </StrictMode>
);
