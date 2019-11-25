import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}))

const DESTINY2_URL = 'https://www.bungie.net'

export default function PaperSheet(props) {
  const classes = useStyles()
  const theme = useTheme()
  const iconURL = props.info.displayProperties.hasIcon
    ? `${DESTINY2_URL}${props.info.displayProperties.icon}`
    : ''

  return (
    <Paper className={classes.root}>
      <Grid item xs={12}>
        <img src={iconURL} alt={props.info.displayProperties.name} />
      </Grid>
    </Paper>
  )
}
