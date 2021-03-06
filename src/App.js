import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useLocation
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
    // let location = useLocation()
    let pathname = window.location.pathname
    console.log(pathname)
    if (userId === undefined && !localStorage.getItem('userId')) {
      if (pathname !== '/signin' && pathname !== '/signup')
        return <Redirect to='/signin' />
    }
  }

  const renderNav = () => {}

  return (
    <Router path='/' component={App}>
      <div className='App'>
        {renderRedirect()}
        <Nav />
        <Switch>
          <Route exact path='/signin' component={SignInSide} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/users' component={Users} />
          <Route exact path='/lists/:listId' component={List} />
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
