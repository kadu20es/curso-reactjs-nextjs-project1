import './styles.css';

export const SearchField = ({searchValue, handleChange}) => {
    return (
        <input
        type="search"
        onChange={handleChange}
        value={searchValue}
        className='search-input'
        placeholder='what you want to find?'
      />
    );
}