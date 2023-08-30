import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import throttle from "lodash.throttle";
import Item from "./components/Item";
import Header from "./components/Header";

function App() {
  const baseUrl = "https://617c09aad842cf001711c200.mockapi.io/v1/companies";
  const [companies, setCompanies] = useState([]);
  const [tag, setTag] = useState("");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  function getEndpoint() {
    let url = baseUrl;
    if (query) url = `${baseUrl}?search=${query}`;
    return url;
  }
  function getCompanies() {
    axios
      .get(getEndpoint())
      .then((res) => {
        setCompanies(res.data?.data || []);
        setMessage(res.data?.total ? "" : `No results found for "${query}"`);
      })
      .catch(() => {
        setMessage("oops, something went wrong");
        setCompanies([]);
      });
  }

  // Limit hitting the endpoint more than once every 200ms
  const debouncedQuerySetter = useMemo(
    () =>
      throttle((s) => {
        setQuery(s);
      }, 200),
    [],
  );

  function handleSubmit(e) {
    e.preventDefault();
    getCompanies();
  }

  useEffect(() => {
    debouncedQuerySetter(tag);
  }, [tag, debouncedQuerySetter]);

  useEffect(() => {
    getCompanies();
  }, [query]);

  return (
    <div className="App">
      <Header />
      <div className="container mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center text-center mt-5"
        >
          <input
            id="query"
            type="text"
            name="tag"
            placeholder="search company..."
            className="querybox border-2 border-gray-950 p-2 basis-full"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gray-800 text-white px-4 py-2 border-2 border-gray-950 hover:bg-transparent hover:text-gray-950"
          >
            Search
          </button>
        </form>

        {message && <div className="mt-5 text-red-800">{message}</div>}
        {companies.length !== 0 && (
          <div className="mt-5">
            {companies.map((company, i) => {
              return <Item company={company} key={i} baseUrl={baseUrl} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
