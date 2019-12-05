import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import EnhancedTable from '../components/EnhancedTable'
import displayWeaponsArray from '../assets/minifests/displayWeaponsArray.json'
import displayWeaponsHash from '../assets/minifests/displayWeaponsHash.json'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))

function List({ match }) {
  const classes = useStyles()
  const [rows, setRows] = React.useState([])

  const headCells = [
    { id: 'icon', numeric: false, disablePadding: true, label: 'Icon' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'tierType', numeric: true, disablePadding: false, label: 'Tier' },
    { id: 'slot', numeric: false, disablePadding: false, label: 'Slot' },
    { id: 'element', numeric: false, disablePadding: false, label: 'Element' },
    { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
    { id: 'impact', numeric: true, disablePadding: false, label: 'Impact' },
    { id: 'range', numeric: true, disablePadding: false, label: 'Range' },
    { id: 'rpm', numeric: true, disablePadding: false, label: 'RPM' },
    { id: 'magazine', numeric: true, disablePadding: false, label: 'Magazine' }
  ]

  useEffect(() => {
    fetch(`http://localhost:3001/lists/${match.params.listId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(json => {
        let weaponHashes = JSON.parse(json.weapons)
        let displayWeapons = weaponHashes.map(
          itemHash => displayWeaponsHash[itemHash]
        )
        setRows(displayWeapons)
      })

    return () => {
      // Nothing to clean up
    }
  }, [])

  return (
    <Grid container spacing={3} alignItems='center' justify='center'>
      <Grid item xs={11}>
        <EnhancedTable
          rows={rows}
          headCells={headCells}
          tableName={rows.name}
          tableType={'Delete'}
          setRows={setRows}
        />
      </Grid>
    </Grid>
  )
}
export default List
