import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import ItemIconPaper from '../components/ItemIconPaper'
import EnhancedTable from '../components/EnhancedTable'
import displayWeaponsHash from '../assets/minifests/displayWeaponsHash.json'

// TODO: Don't hardcode these
const DESTINY2_URL = 'https://www.bungie.net/Platform/Destiny2'
const membershipType = '3' // Guessing this is Steam?
const membershipId = '4611686018467712948' // J3ubbleboy
const characterId = '2305843009304746410' // Hunter

const GeneralItemBucket = 138197802

const WeaponBuckets = {
  1498876634: 'Kinetic',
  2465295065: 'Energy',
  953998645: 'Power'
}

class Profile extends Component {
  state = {
    profileWeapons: []
  }

  fetchCharactersEquippedWeapons = () => {
    // TODO: Find a way for this to work in PROD
    const API_KEY = process.env.REACT_APP_BUNGIE_API_KEY

    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Api-Key': API_KEY
      }
    }

    fetch(
      `${DESTINY2_URL}/${membershipType}/Profile/${membershipId}/?components=205`,
      config
    )
      .then(resp => resp.json())
      .then(json => {
        let allCharEquippedWeapons = []
        let characters = json.Response.characterEquipment.data

        for (let character in characters) {
          let charEquippedWeapons = this.filterForWeapons(
            characters[character].items
          )

          allCharEquippedWeapons = [
            ...allCharEquippedWeapons,
            ...charEquippedWeapons
          ]
        }

        this.setState(prevState => {
          return {
            profileWeapons: [
              ...prevState.profileWeapons,
              ...allCharEquippedWeapons
            ]
          }
        })
      })
  }

  fetchCharactersInventoryWeapons = () => {
    // TODO: Find a way for this to work in PROD
    const API_KEY = process.env.REACT_APP_BUNGIE_API_KEY

    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Api-Key': API_KEY
      }
    }

    fetch(
      `${DESTINY2_URL}/${membershipType}/Profile/${membershipId}/?components=201`,
      config
    )
      .then(resp => resp.json())
      .then(json => {
        let allCharWeapons = []
        let characters = json.Response.characterInventories.data

        for (let character in characters) {
          let charWeapons = this.filterForWeapons(characters[character].items)
          allCharWeapons = [...allCharWeapons, ...charWeapons]
        }

        this.setState(prevState => {
          return {
            profileWeapons: [...prevState.profileWeapons, ...allCharWeapons]
          }
        })
      })
  }

  filterForWeapons = bucket => {
    let weapons = []

    bucket.forEach(item => {
      let weapon = displayWeaponsHash[item.itemHash]
      if (weapon) {
        weapons.push({
          ...weapon,
          itemInstanceId: item.itemInstanceId
        })
      }
    })

    return weapons
  }

  fetchProfileWeapons = () => {
    // TODO: Find a way for this to work in PROD
    const API_KEY = process.env.REACT_APP_BUNGIE_API_KEY

    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Api-Key': API_KEY
      }
    }

    fetch(
      `${DESTINY2_URL}/${membershipType}/Profile/${membershipId}/?components=102`,
      config
    )
      .then(resp => resp.json())
      .then(json => {
        let profileWeapons = this.filterForWeapons(
          json.Response.profileInventory.data.items
        )

        this.setState(prevState => {
          return {
            profileWeapons: [...prevState.profileWeapons, ...profileWeapons]
          }
        })
      })
  }

  fetchItemInstances = () => {
    // TODO: Find a way for this to work in PROD
    const API_KEY = process.env.REACT_APP_BUNGIE_API_KEY

    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Api-Key': API_KEY
      }
    }

    console.log(this.state)
    this.state.weaponInstanceIds.forEach(instanceId => {
      fetch(
        `${DESTINY2_URL}/${membershipType}/Profile/${membershipId}/Item/${instanceId}/?components=300,302,304,305`,
        config
      )
        .then(resp => resp.json())
        .then(json => {
          console.log(json.Response)
        })
    })
  }

  renderVaultWeapons = () => {
    return this.state.profileWeapons.map(item => {
      return item ? (
        <Grid key={item.itemInstanceId} item xs={2}>
          <ItemIconPaper info={item} />
        </Grid>
      ) : null
    })
  }

  convertHash = i => {
    // Hashes are 32-bit unsigned integers
    let shift = i >> 32
    return shift <= 0 ? i : shift
  }

  componentDidMount() {
    this.fetchCharactersInventoryWeapons()
    this.fetchCharactersEquippedWeapons()
    this.fetchProfileWeapons()
  }

  render() {
    return (
      <>
        <Grid container spacing={3} alignItems='center' justify='center'>
          <Grid item xs={11}>
            <Typography component='h3' variant='h3'>
              Profile
            </Typography>
          </Grid>
          <Grid item xs={11}>
            <EnhancedTable rows={this.state.profileWeapons} />
          </Grid>
        </Grid>
      </>
    )
  }
}
export default Profile
