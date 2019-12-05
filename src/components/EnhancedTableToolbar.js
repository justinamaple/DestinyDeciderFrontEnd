import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { lighten, makeStyles } from '@material-ui/core/styles'
import { useLocation } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import FilterListIcon from '@material-ui/icons/FilterList'
import IconButton from '@material-ui/core/IconButton'
import NativeSelect from '@material-ui/core/NativeSelect'
import FormControl from '@material-ui/core/FormControl'

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: '1 1 100%'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles()
  const { numSelected, setSelected, tableName, selected } = props
  const [lists, setLists] = React.useState([])
  const [selectedList, setSelectedList] = React.useState('')
  const location = useLocation()

  useEffect(() => {
    fetchLists()
    return () => {
      // TODO: Cancel fetch if navigating away
    }
  }, [])

  const fetchLists = () => {
    return fetch('http://localhost:3001/lists', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(json => {
        setSelectedList(json[0].id)
        setLists(json)
      })
  }

  const fetchList = () => {
    return fetch(`http://localhost:3001/lists/${selectedList}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(json => fetchAddToList(json))
  }

  const fetchAddToList = list => {
    let weapons = JSON.parse(list.weapons)
    let distinctWeapons
    if (location.pathname.includes('/lists')) {
      distinctWeapons = weapons.filter(itemHash => !selected.includes(itemHash))
    } else {
      distinctWeapons = [...weapons, ...selected].filter(function(
        value,
        index,
        self
      ) {
        return self.indexOf(value) === index
      })
    }

    return fetch(`http://localhost:3001/lists/${selectedList}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user_id: 1,
        weapons: distinctWeapons
      })
    })
      .then(resp => resp.json())
      .then(json => {
        setSelected([])
      })
  }

  function renderSelectedAction() {
    if (location.pathname.includes('/lists')) return renderDelete()
    else return renderAdd()
  }

  function renderAdd() {
    return (
      <Tooltip title='Add'>
        <IconButton aria-label='Add' onClick={fetchList}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    )
  }

  function renderDelete() {
    return (
      <Tooltip title='Delete'>
        <IconButton aria-label='Delete' onClick={fetchList}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    )
  }

  const handleChange = name => event => {
    setSelectedList(event.target.value)
  }

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color='inherit'
          variant='subtitle1'
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant='h6' id='tableTitle'>
          {tableName}
        </Typography>
      )}

      <FormControl className={classes.formControl}>
        <NativeSelect
          className={classes.select}
          value={selectedList}
          onChange={handleChange('selectedList')}
          inputProps={{
            name: 'selectedList',
            id: 'list-native-helper'
          }}
        >
          {lists.map(list => (
            <option key={list.id} value={list.id}>
              {list.name}
            </option>
          ))}
        </NativeSelect>
      </FormControl>

      {numSelected > 0 ? (
        renderSelectedAction()
      ) : (
        <Tooltip title='Filter list'>
          <IconButton aria-label='filter list'>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
}

export default EnhancedTableToolbar
