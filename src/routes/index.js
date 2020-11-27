import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navigation from '../components/Navigation';

import Campaigns from '../pages/Campaigns';
import CampaignForm from '../pages/Campaigns/NewCampaign';
import Dashboard from '../pages/Dashboard';

const Routes = () => (
  <BrowserRouter>
    <Navigation />
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/campaigns" component={Campaigns} />
      <Route path="/campaign/new" component={CampaignForm} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
