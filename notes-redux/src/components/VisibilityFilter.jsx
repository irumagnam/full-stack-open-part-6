import { setFilter } from '../reducers/filterReducer'
import { useDispatch, useSelector } from 'react-redux'

const VisibilityFilter = (props) => {
  const filterOptions = [
    { label: 'all', value: 'ALL' },
    { label: 'important', value: 'IMPORTANT' },
    { label: 'nonimportant', value: 'NONIMPORTANT' },
  ]
  const dispatch = useDispatch()
  const currentFilter = useSelector(({ filter, notes }) => filter)

  return (
    <div>
      <label>show:</label>
      {filterOptions.map(({ label, value }) => (
        <span key={value} style={{ margin: '2px' }}>
          <input
            type="radio"
            name="filter"
            checked={currentFilter === value}
            onChange={() => dispatch(setFilter(value))}
          />
          {label}
        </span>
      ))}
    </div>
  )
}

export default VisibilityFilter