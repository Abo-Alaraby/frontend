import  { useState } from 'react';

// eslint-disable-next-line react/prop-types
const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className='flex w-full gap-4 items-center'>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className='w-4/6 rounded-md p-2 shadow-xl'
      />
      <button className='bg-indigo-700 w-1/6 text-white p-2 rounded-md shadow-xl' onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;