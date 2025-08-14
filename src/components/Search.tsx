/**
 * @description Search component
 * @author Luca Cattide
 * @date 14/08/2025
 * @returns {*}  {React.ReactNode}
 */
const Search = (): React.ReactNode => {
  return (
    <aside className="search mx-4 mt-4 md:mx-12 md:mt-8">
      <h6 className="search__title hidden">Search</h6>
      <label className="search__label sr-only" htmlFor="search">
        Search notes
      </label>
      <input
        className="search__input text-1rem md:text-1.125rem text-light-placeholder dark:text-dark-placeholder h-10 w-full rounded-lg bg-gray-100 px-2 text-base font-normal focus-visible:outline focus-visible:outline-blue-600 md:h-12 md:rounded-xl md:px-4 md:text-lg dark:bg-gray-700"
        id="search"
        placeholder="Search notes..."
        type="text"
      />
    </aside>
  );
};

export default Search;
