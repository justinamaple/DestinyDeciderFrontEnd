import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import allActions from '../store/actions/index'
import { Redirect } from 'react-router-dom'
import AccountCircle from '@material-ui/icons/AccountCircle'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

function AccountMenuIcon() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const userId = useSelector(state => state.currentUser.userId)
  const dispatch = useDispatch()

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSignIn = () => {
    handleClose()
    return <Redirect to='/signin' />
  }

  const handleSignOut = () => {
    localStorage.clear()
    dispatch(allActions.userActions.signOut())
    handleClose()
    return <Redirect to='/' />
  }

  const renderMenuItems = () => {
    let menuItems = []
    if (userId === undefined && !localStorage.getItem('userId')) {
      menuItems.push(
        <MenuItem key='signin' onClick={handleSignIn}>
          Sign In
        </MenuItem>
      )
    } else {
      menuItems.push(
        <MenuItem key='signout' onClick={handleSignOut}>
          Sign Out
        </MenuItem>
      )
    }

    return menuItems
  }

  return (
    <div>
      <IconButton
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleMenu}
        color='inherit'
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id='menu-appbar'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        onClose={handleClose}
      >
        {renderMenuItems()}
      </Menu>
    </div>
  )
}

export default AccountMenuIcon
