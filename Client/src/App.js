import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Signin from './components/login';
import Signup from './components/signup';
import Profile from './components/Sidebar';
import Meeting from './components/Meeting';
import MeetingInvites from './components/Mymeetings';
import Userchat from './components/UserChat';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Signin} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/profile' component={Profile} />
      <Route exact path='/meeting' component={Meeting} />
      <Route exact path='/invites' component={MeetingInvites} />
      <Route exact path='/chat' component={Userchat} />
    </Switch>
  );
}

export default App;
