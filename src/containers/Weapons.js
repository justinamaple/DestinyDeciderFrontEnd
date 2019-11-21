import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import ItemCard from '../components/ItemCard'
// TODO: This will need to be updated, maybe use a map that strores the base name to this versions hash value?
// import InventoryBucket from '../assets/manifests/DestinyInventoryBucketDefinition-7ab91c74-e8a4-40c7-9f70-16a4354125c0.json'
// import InventoryItem from '../assets/manifests/DestinyInventoryItemDefinition-7ab91c74-e8a4-40c7-9f70-16a4354125c0.json'

// TODO: Don't hardcode these
const DESTINY2_URL = 'https://www.bungie.net/Platform/Destiny2'
const membershipType = '3'
const membershipId = '4611686018467712948'
const characterId = '2305843009304746410'

class Weapons extends Component {
  state = {
    inventory: []
  }

  fetchCharacterEquipment = () => {
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
      `${DESTINY2_URL}/${membershipType}/Profile/${membershipId}/Character/${characterId}/?components=205`,
      config
    )
      .then(resp => resp.json())
      .then(json => {
        console.log(json.Response.equipment.data.items)
        this.setState({
          inventory: [...json.Response.equipment.data.items]
        })

        this.fetchItemInstances()
      })
  }

  fetchItemInstances = () => {}

  renderInventory = () => {
    return this.state.inventory.map(item => {
      // let bucket = InventoryBucket[this.convertHash(item.bucketHash)]
      // let invItem = InventoryItem[this.convertHash(item.itemHash)]
      let invItem = null
      // console.log(invItem)
      return invItem ? (
        <Grid key={item.itemInstanceId} item m={3} sm={4} xs={6}>
          <ItemCard info={invItem} />
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
    this.fetchCharacterEquipment()
  }

  render() {
    return (
      <>
        <Grid container spacing={3}>
          {this.renderInventory()}
        </Grid>
      </>
    )
  }
}
export default Weapons
