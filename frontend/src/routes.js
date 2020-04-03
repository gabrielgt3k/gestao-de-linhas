import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import LinhasOi from './pages/LinhasOi';

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/linhas" component={LinhasOi} />
  </Switch>
);
