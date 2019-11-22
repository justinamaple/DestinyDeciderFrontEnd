import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import ItemCard from '../components/ItemCard'
import ItemIconPaper from '../components/ItemIconPaper'
// TODO: This will need to be updated, maybe use a map that strores the base name to this versions hash value?
import InventoryBucket from '../assets/manifests/DestinyInventoryBucketDefinition-7ab91c74-e8a4-40c7-9f70-16a4354125c0.json'
import InventoryItem from '../assets/manifests/DestinyInventoryItemDefinition-7ab91c74-e8a4-40c7-9f70-16a4354125c0.json'
import ItemCategory from '../assets/manifests/DestinyItemCategoryDefinition-7ab91c74-e8a4-40c7-9f70-16a4354125c0.json'

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

const DamageTypeBuckets = {
  1: 'Kinetic',
  3373582085: 'Kinetic',
  2: 'Arc',
  2303181850: 'Arc',
  3: 'Solar',
  1847026933: 'Solar',
  4: 'Void',
  3454344768: 'Void'
}

class Weapons extends Component {
  state = {
    inventory: [],
    profileWeapons: [],
    weaponInstanceIds: []
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
        console.log(json)
        let allCharEquippedWeapons = []
        let characters = json.Response.characterEquipment.data

        for (let character in characters) {
          let charEquippedWeapons = this.filterCharacterForWeapons(
            characters[character]
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
          let charWeapons = this.filterCharacterForWeapons(
            characters[character]
          )
          allCharWeapons = [...allCharWeapons, ...charWeapons]
        }

        this.setState(prevState => {
          return {
            profileWeapons: [...prevState.profileWeapons, ...allCharWeapons]
          }
        })
      })
  }

  filterCharacterForWeapons = character => {
    let weapons = []

    character.items.forEach(item => {
      if (WeaponBuckets[item.bucketHash]) {
        let invItem = this.hashLookup(InventoryItem, item.itemHash)
        invItem.itemCategoryHashes.forEach(itemCategoryHash => {
          let itemCategory = this.hashLookup(ItemCategory, itemCategoryHash)
          if (itemCategory.shortTitle === 'Weapon') {
            weapons.push({
              ...invItem,
              itemInstanceId: item.itemInstanceId
            })
          }
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
        let profileWeapons = this.filterProfileForWeapons(
          json.Response.profileInventory
        )

        this.setState(prevState => {
          return {
            profileWeapons: [...prevState.profileWeapons, ...profileWeapons]
          }
        })
      })
  }

  filterProfileForWeapons = inventory => {
    let weapons = []

    inventory.data.items.forEach(item => {
      if (item.bucketHash === GeneralItemBucket) {
        let invItem = this.hashLookup(InventoryItem, item.itemHash)
        invItem.itemCategoryHashes.forEach(itemCategoryHash => {
          let itemCategory = this.hashLookup(ItemCategory, itemCategoryHash)
          if (itemCategory.shortTitle === 'Weapon') {
            weapons.push({
              ...invItem,
              itemInstanceId: item.itemInstanceId
            })
          }
        })
      }
    })

    return weapons
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

  hashLookup = (manifest, hash) => {
    return manifest[this.convertHash(hash)]
  }

  componentDidMount() {
    this.fetchCharactersInventoryWeapons()
    this.fetchCharactersEquippedWeapons()
    this.fetchProfileWeapons()
  }

  render() {
    return (
      <>
        <Grid container spacing={3}>
          {this.renderVaultWeapons()}
        </Grid>
      </>
    )
  }
}
export default Weapons
