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

function Lists() {
  const classes = useStyles()

  return (
    <>
      <Grid container spacing={3} alignItems='center' justify='center'>
        <Grid item xs={11}></Grid>
      </Grid>
    </>
  )
}
export default Lists
