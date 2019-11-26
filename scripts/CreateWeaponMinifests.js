const fs = require('fs')

const WEAPON_CATEGORY_HASHES = {
  5: 'Auto Rifle',
  6: 'Hand Cannon',
  7: 'Pulse Rifle',
  8: 'Scout Rifle',
  9: 'Fusion Rifle',
  10: 'Sniper Rifle',
  11: 'Shotgun',
  12: 'Machine Gun',
  13: 'Rocket Launcher',
  14: 'Sidearm',
  54: 'Sword',
  153950757: 'Grenade Launcher',
  1504945536: 'Linear Fusion Rifle',
  2489664120: 'Trace Rifle',
  3317538576: 'Bow',
  3954685534: 'Submachine Gun'
}

const SLOT_HASHES = {
  1: 'Kinetic',
  2: 'Energy',
  3: 'Power'
}

const ELEMENT_HASHES = {
  0: 'Solar',
  1847026933: 'Solar',
  2303181850: 'Arc',
  3373582085: 'Kinetic',
  3454344768: 'Void'
}

const WEAPON_NAMES = {
  'Power Weapons': true,
  'Energy Weapons': true,
  'Kinetic Weapons': true
}

const convertHash = i => {
  // Hashes are 32-bit unsigned integers
  let shift = i >> 32
  return shift <= 0 ? i : shift
}

const hashLookup = (manifest, hash) => {
  return manifest[convertHash(hash)]
}

const ItemDefinition = JSON.parse(
  fs.readFileSync(
    '../src/assets/manifests/DestinyInventoryItemDefinition-7ab91c74-e8a4-40c7-9f70-16a4354125c0.json',
    'utf8'
  )
)

const BucketDefinition = JSON.parse(
  fs.readFileSync(
    '../src/assets/manifests/DestinyInventoryBucketDefinition-7ab91c74-e8a4-40c7-9f70-16a4354125c0.json',
    'utf8'
  )
)

const StatDefinition = JSON.parse(
  fs.readFileSync(
    '../src/assets/manifests/DestinyStatDefinition-7ab91c74-e8a4-40c7-9f70-16a4354125c0.json',
    'utf8'
  )
)

const getWeapons = () => {
  const WEAPONS = {
    all: {},
    displayWeaponsHash: {},
    displayWeaponsArray: []
  }

  for (let itemHash in ItemDefinition) {
    let item = ItemDefinition[itemHash]
    let inventory = item.inventory
    if (inventory && inventory.isInstanceItem) {
      let bucket = hashLookup(BucketDefinition, inventory.bucketTypeHash)
      if (WEAPON_NAMES[bucket.displayProperties.name]) {
        WEAPONS.all[itemHash] = item

        let weapon = createDisplayWeapon(item)
        if (weapon) {
          WEAPONS.displayWeaponsArray.push(weapon)
          WEAPONS.displayWeaponsHash[itemHash] = weapon
        }
      }
    }
  }

  return WEAPONS
}

const createDisplayWeapon = item => {
  // If there is no damage type, this is an old duplicate entry
  if (item.defaultDamageType === 0 || !item.defaultDamageTypeHash) return null

  let namedStats = {}
  for (let statHash in item.stats.stats) {
    let statName = StatDefinition[statHash].displayProperties.name

    if (statName === 'Rounds Per Minute') {
      statName = 'rpm'
    }

    if (statName !== '' && statName !== 'Inventory Size') {
      let statValue = item.stats.stats[statHash].value
      if (!statValue) statValue = -1
      namedStats[statName.toLowerCase()] = statValue
    }
  }

  let bucket = hashLookup(BucketDefinition, item.inventory.bucketTypeHash)
  let slot = bucket.displayProperties.name.split(' ')[0]
  let element =
    slot === 'Kinetic' ? 'Kinetic' : ELEMENT_HASHES[item.defaultDamageTypeHash]

  return {
    itemHash: item.hash,
    name: item.displayProperties.name,
    icon: item.displayProperties.icon,
    ...namedStats,
    type: item.itemTypeDisplayName,
    tierType: item.inventory.tierType,
    tierTypeName: item.inventory.tierTypeName,
    slot: slot,
    element: element,
    rating: Math.random() * 5
  }
}

const writeMinifestToFile = (filename, object) => {
  fs.writeFile(
    `../src/assets/minifests/${filename}.json`,
    JSON.stringify(object),
    'utf8',
    function(err) {
      // These should be logged somewhere deeper if running as a CRON job.
      if (err) return console.log(err)
      console.log(`${filename}.json was saved!`)
    }
  )
}

const WEAPONS = getWeapons()
writeMinifestToFile('DestinyWeaponDefinition', WEAPONS.all)
writeMinifestToFile('displayWeaponsHash', WEAPONS.displayWeaponsHash)
writeMinifestToFile('displayWeaponsArray', WEAPONS.displayWeaponsArray)
