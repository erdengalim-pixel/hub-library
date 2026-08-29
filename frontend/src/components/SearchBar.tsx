interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
  onClear: () => void
}

function SearchBar({
  value,
  onChange,
  onSearch,
  onClear,
}: SearchBarProps) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search by title or author..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />

      <button onClick={onSearch}>
        Search
      </button>

      <button onClick={onClear}>
        Clear
      </button>
    </div>
  )
}

export default SearchBar