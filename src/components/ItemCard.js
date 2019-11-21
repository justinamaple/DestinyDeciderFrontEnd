import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const DESTINY2_URL = 'https://www.bungie.net'

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex'
    // width: 300,
    // height: 150
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
    // width: 150
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: 150
  }
}))

function ItemCard(props) {
  const classes = useStyles()
  const theme = useTheme()
  const iconURL = props.info.displayProperties.hasIcon
    ? `${DESTINY2_URL}${props.info.displayProperties.icon}`
    : ''
  console.log(props)

  return (
    <Card className={classes.card}>
      <Grid container spacing={2}>
        <Grid item xs={6} className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component='h5' variant='h5'>
              {props.info.displayProperties.name}
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
              {props.info.itemTypeAndTierDisplayName}
            </Typography>
            <p>{props.info.displayProperties.description}</p>
          </CardContent>
        </Grid>
        <Grid item xs={6}>
          <CardMedia className={classes.cover} image={iconURL} />
        </Grid>
      </Grid>
    </Card>
  )
}

export default ItemCard
