import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Lists from './containers/Lists'
import Users from './containers/Users'
import Weapons from './/containers/Weapons'
import Nav from './containers/Nav'
import Page404 from './components/Page404'
import SignInSide from './containers/SignInSide'
import SignUp from './containers/SignUp'
import Profile from './containers/Profile'

function App() {
  return (
    <Router>
      <div className='App'>
        <Nav />
        <Switch>
          <Route exact path='/signin' component={SignInSide} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/users' component={Users} />
          <Route exact path='/lists' component={Lists} />
          <Route exact path='/weapons' component={Weapons} />
          <Route exact path='/profile' component={Profile} />
          <Route component={Page404} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
