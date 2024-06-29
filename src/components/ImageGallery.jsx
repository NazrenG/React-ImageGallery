import { useState } from "react";
import axios from "axios";
import "./search.css";
import { CiSearch } from "react-icons/ci";

function ImageGallery() {
  const [list, setList] = useState([]);
  const [query, setQuery] = useState();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const handleGetList = async (page = 1) => {
    const response = await axios.get(
      `https://pixabay.com/api/?key=44692340-9948c2476602e4db6c2e96731&q=${query}&image_type=photo&per_page=${limit}&page=${page}`
    );
    if (page === 1) {
      setList(response.data.hits);
    } else {
      setList((prevList) => [...prevList, ...response.data.hits]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPage(1);
    handleGetList(1);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    handleGetList(nextPage);
  };

  return (
    <div>
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={handleSubmit}>
          <button type="submit" className="button">
            <CiSearch />
            <span className="label">Search</span>
          </button>
          <input
            className="input"
            type="text"
            placeholder="Search images and photos"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </header>
      <ul className="ImageGallery">
        {list.map((item) => (
          <li key={item.id} className="ImageGalleryItem">
            <img className="image" src={item.webformatURL} alt={item.tags} />
          </li>
        ))}
      </ul>
      {list.length > 0 && (
        <button className="Button" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
}

export default ImageGallery;
