import { useState } from "react";
import axios from "axios";

const Item = ({ company, baseUrl }) => {
  const [details, setDetails] = useState(null);
  function showDetails(id) {
    if (!details) {
      axios
        .get(`${baseUrl}/${id}/details`)
        .then((res) => {
          console.log("details", res.data.data);
          setDetails(res.data.data[0]);
        })
        .catch((err) => {});
    }
  }

  function hideDetails(e) {
    setDetails(null);
    e.stopPropagation();
  }

  return (
    <div
      className="company flex relative bg-sky-200 mb-4 p-4"
      onClick={() => {
        showDetails(company.id);
      }}
    >
      <img src={company.logo} alt="compoany logo" className="logo basis-auto" />
      <div className="details basis-full ml-4">
        <span className="name text-xl blocktext-xl mb-2 text-gray-950">
          {company.name}
        </span>
        <span className="city block">{company.city}</span>
        <span className="street block">{company.streetName}</span>
        <span className="zip block">{company.zipCode}</span>
      </div>
      {details && (
        <div className="absolute bg-sky-800 p-4 pt-8 top-2 right-2 text-white max-w-lg drop-shadow-md">
          <span
            className="hide block absolute top-0 right-0 bg-red-400 text-white px-2 cursor-pointer"
            onClick={hideDetails}
            role="button"
            aria-label="close details"
          >
            x
          </span>
          <span className="block phrase">{details.catchPhrase}</span>
          <span className="block phone">Phone: {details.phoneNumber}</span>
          <span className="block phone">
            Website:{" "}
            <a
              href={details.website}
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-300"
            >
              {details.website}
            </a>
          </span>
        </div>
      )}
    </div>
  );
};

export default Item;
