import { useDispatch } from 'react-redux';
import { setFilter } from '../features/filterSlice.js';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    dispatch(setFilter(event.target.value));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} name='filter' />
    </div>
  );
};

export default Filter;
