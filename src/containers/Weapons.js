import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import EnhancedTable from '../components/EnhancedTable'
import displayWeaponsArray from '../assets/minifests/displayWeaponsArray.json'

// TODO: Don't hardcode these
const DESTINY2_URL = 'https://www.bungie.net/Platform/Destiny2'

class Weapons extends Component {
  state = {}

  convertHash = i => {
    // Hashes are 32-bit unsigned integers
    let shift = i >> 32
    return shift <= 0 ? i : shift
  }

  hashLookup = (manifest, hash) => {
    return manifest[this.convertHash(hash)]
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <Grid container spacing={3} alignItems='center' justify='center'>
          <Grid item xs={11}>
            <EnhancedTable data={displayWeaponsArray} />
          </Grid>
        </Grid>
      </>
    )
  }
}
export default Weapons
