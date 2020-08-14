import React from 'react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider, DarkTheme } from 'baseui';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { GlobalStyle } from './global/styles';

const engine = new Styletron();

function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={DarkTheme}>
        <BrowserRouter>
          <GlobalStyle />
          <Routes />
        </BrowserRouter>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
