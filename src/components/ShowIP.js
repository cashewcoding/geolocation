import { useState, useEffect } from "react";

export default function ShowIP() {
  // const apiSecret = process.env.REACT_APP_IPIFY_SECRET;
  const [geolocation, setGeolocation] = useState("");
  const [connErr, setConnErr] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://geo.ipify.org/api/v2/country?apiKey=${process.env.REACT_APP_IPIFY_SECRET}`
    )
      .then((response) => response.json())
      .then((data) => {
        setGeolocation(data);
        setIsLoading(false);
      })
      .catch(() => {
        setConnErr(true);
        setIsLoading(false);
      });
  }, []);

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
  } else if (geolocation.ip.length > 0 && connErr === false) {
    return (
      <div className="list-group my-5">Your IP address: {geolocation.ip}</div>
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
          We are very sorry! There was a connection error with our IP finder
          service provider. Please try again later.
        </h2>
      </div>
    );
  }
}
