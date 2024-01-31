const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      <label htmlFor='filter'>
        Filter shown with{' '}
        <input
          type='search'
          name='filter'
          id='filter'
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </label>
    </div>
  );
};

export default Filter;
