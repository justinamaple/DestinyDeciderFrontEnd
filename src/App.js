import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Lists from './containers/Lists'
import List from './containers/List'
import Users from './containers/Users'
import Weapons from './/containers/Weapons'
import Nav from './containers/Nav'
import Page404 from './components/Page404'
import SignInSide from './containers/SignInSide'
import SignUp from './containers/SignUp'
import Profile from './containers/Profile'

function App() {
  const text = useSelector(state => state.simpleAction.text)
  const userId = useSelector(state => state.currentUser.userId)
  const dispatch = useDispatch()

  const handleSignOut = () => {
    localStorage.clear()
    return <Redirect to='/signin' />
  }

  const renderRedirect = () => {
    console.log(userId)
    console.log(localStorage)
    if (userId === undefined && !localStorage.getItem('userId')) {
      return <Redirect to='/signin' />
    }
  }

  const renderNav = () => {
    return <Nav />
  }

  return (
    <Router path='/' component={App}>
      <div className='App'>
        {renderRedirect()}
        {renderNav()}
        <Switch>
          <Route exact path='/signin' component={SignInSide} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/users' component={Users} />
          <Route exact path='/list' component={List} />
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
