import React from 'react'
import PropTypes from 'prop-types'
import TableHead from '@material-ui/core/TableHead'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Checkbox from '@material-ui/core/Checkbox'

// This should almost certainly be passed in at some point
// id is the key used to sort when clicking the header
const headCells = [
  { id: 'icon', numeric: false, disablePadding: false, label: '' },
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'tierType', numeric: true, disablePadding: false, label: 'Tier' },
  { id: 'slot', numeric: false, disablePadding: false, label: 'Slot' },
  { id: 'element', numeric: false, disablePadding: false, label: 'Element' },
  { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
  { id: 'impact', numeric: true, disablePadding: false, label: 'Impact' },
  { id: 'range', numeric: true, disablePadding: false, label: 'Range' },
  { id: 'rpm', numeric: true, disablePadding: false, label: 'RPM' },
  { id: 'magazine', numeric: true, disablePadding: false, label: 'Magazine' }
]

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props

  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

// Not sure where this goes
EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}

export default EnhancedTableHead
