import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Lists from './containers/Lists'
import Users from './containers/Users'
import Weapons from './/containers/Weapons'
import Nav from './containers/Nav'
import Page404 from './components/Page404'
import SignInSide from './containers/SignInSide'
import SignUp from './containers/SignUp'
import Profile from './containers/Profile'
import allActions from './store/actions/index'

function App() {
  const handleSignOut = () => {
    localStorage.clear()
    return <Redirect to='/signin' />
  }

  const renderRedirect = () => {
    if (this.state.accountId === '' && localStorage.getItem('account')) {
      return <Redirect to='/signin' />
    } else {
      return <Redirect to='/' />
    }
  }

  const text = useSelector(state => {
    console.log(state)
    return state.simpleAction.text
  })
  const dispatch = useDispatch()

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
      <button
        onClick={() => dispatch(allActions.simpleAction.simpleAction('text'))}
      >
        Test redux action
      </button>
      <pre>{text}</pre>
    </Router>
  )
}

export default App
