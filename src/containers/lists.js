import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  table: {
    minWidth: 650
  }
}))

function Lists() {
  const classes = useStyles()
  const [rows, setRows] = React.useState([])

  useEffect(() => {
    fetch('http://localhost:3001/lists', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(json => setRows(json))
  })

  return (
    <Grid container spacing={3} alignItems='center' justify='center'>
      <Grid item xs={11}>
        <Paper className={classes.root}>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>List Name</TableCell>
                <TableCell align='right'>Created At</TableCell>
                <TableCell align='right'>Updated At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.name}>
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell align='right'>{row.created_at}</TableCell>
                  <TableCell align='right'>{row.updated_at}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  )
}
export default Lists
