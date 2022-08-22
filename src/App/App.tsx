import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';

import { CharacterListPage, CharacterInfoPage, HomePage } from '@src/pages';

import GlobalStyle from '@src/styles/globalStyles';
import paths from '@src/pages/paths';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

const App: React.FC = () => (
  <Router>
    <GlobalStyle />
    <ScrollToTop />
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path={paths.characters}>
        <CharacterListPage />
      </Route>
      <Route path={paths.character()}>
        <CharacterInfoPage />
      </Route>
    </Switch>
  </Router>
);

export default App;
