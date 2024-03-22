function SearchFilter({ filterText, setFilterText, onSearch }) {
  return (
    <div className="flex justify-center mt-5">
      <input
        type="text"
        placeholder="Buscar..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="text-sm p-2 border rounded"
      />
      <button
        onClick={onSearch}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchFilter;
