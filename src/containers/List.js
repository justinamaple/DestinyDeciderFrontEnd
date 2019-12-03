import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import EnhancedTable from '../components/EnhancedTable'
import displayWeaponsArray from '../assets/minifests/displayWeaponsArray.json'

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

function List() {
  const classes = useStyles()
  const headCells = [
    { id: 'icon', numeric: false, disablePadding: true, label: '' },
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

  return (
    <>
      <Grid container spacing={3} alignItems='center' justify='center'>
        <Grid item xs={11}>
          <EnhancedTable
            rows={displayWeaponsArray}
            headCells={headCells}
            tableName={'List Name Weapons'}
          />
        </Grid>
      </Grid>
    </>
  )
}
export default List
