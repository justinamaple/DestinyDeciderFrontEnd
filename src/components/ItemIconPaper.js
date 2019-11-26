import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}))

const DESTINY2_URL = 'https://www.bungie.net'

export default function PaperSheet(props) {
  const classes = useStyles()
  const theme = useTheme()
  const iconURL = `${DESTINY2_URL}${props.info.icon}`

  return (
    <Paper className={classes.root}>
      <Grid item xs={12}>
        <img src={iconURL} alt={props.info.name} />
      </Grid>
    </Paper>
  )
}
