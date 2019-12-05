import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import AccountMenuIcon from '../components/AccountMenuIcon'
import { Link, Redirect } from 'react-router-dom'
import Search from '../components/Search'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  }
}))

function Nav() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const [path, setPath] = React.useState(null)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const renderRedirect = () => {
    if (path) {
      return <Redirect to={path} />
    }
  }

  return (
    <div className={classes.root}>
      {renderRedirect()}
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant='h6' noWrap>
            Destiny Decider
          </Typography>
          <Tabs indicatorColor='primary' value={value} onChange={handleChange}>
            <Tab label='Profile' onClick={() => setPath('/profile')} />
            <Tab label='Weapons' onClick={() => setPath('/weapons')} />
            <Tab label='Lists' onClick={() => setPath('/lists')} />
          </Tabs>
          <Search />
          <AccountMenuIcon />
        </Toolbar>
      </AppBar>
    </div>
  )
}
export default Nav
