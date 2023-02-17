import { useState, useEffect } from "react";

export default function Country({ countryCode }) {
  const [country, setCountry] = useState([]);
  const [connErr, setConnErr] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
      .then((response) => response.json())
      .then((data) => {
        setCountry(data);
        setIsLoading(false);
      })
      .catch(() => {
        setConnErr(true);
        setIsLoading(false);
      });
  }, [countryCode]);

  if (isLoading) {
    return (
      <div className="my-5 text-center">
        <div
          className="spinner-border"
          role="status"
          style={{
            width: "200px",
            height: "200px",
            borderWidth: "1em",
          }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else if (country && connErr === false) {
    return (
      <div className="container">
        <h1 className="my-5">Your country: {country[0].name.common}</h1>
        <div>
          <img src={country[0].flags.png} alt={country[0].flags.alt}></img>
        </div>
      </div>
    );
  } else if (connErr === false) {
    return (
      <div className="my-5">
        <h2>Nothing to see here. Please search for something else...</h2>
      </div>
    );
  } else {
    return (
      <div className="my-5">
        <h2>
          We are very sorry! There was a connection error with our country
          information provider. Please try again later.
        </h2>
      </div>
    );
  }
}
