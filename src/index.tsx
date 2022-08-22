import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import theme from '@src/styles/theme';
import App from './App/App';
import reportWebVitals from './reportWebVitals';

import reducers from './modules/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={reducers}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
