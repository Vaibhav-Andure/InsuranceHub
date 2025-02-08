// src/index.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { Provider } from 'react-redux'; // Import Provider from react-redux
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { store, persistor } from './redux/store/store.jsx'; // Import store and persistor
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Wrap App inside Provider */}
      <PersistGate loading={null} persistor={persistor}> {/* Wrap App inside PersistGate */}
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);