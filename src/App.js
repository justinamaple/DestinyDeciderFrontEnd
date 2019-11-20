import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import logo from './assets/logo.svg'
import './styles/App.css'
import CssBaseline from '@material-ui/core/CssBaseline'
import Lists from './containers/lists'
import Users from './containers/users'

function App() {
  return (
    <Router>
      <div className='App'>
        <h1>App</h1>
        <Route path='/users' component={Users} />
        <Route path='/lists' component={Lists} />
      </div>
    </Router>
  )
}

export default App
