import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../context/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Create an object to store unique countries and their corresponding emojis
    const uniqueCountriesObj = {};

    // Iterate through the array and populate the uniqueCountries object
    cities.forEach((city) => {
      const { country, emoji } = city;
      // Check if the country is not already present in the uniqueCountries object
      if (!uniqueCountriesObj[country]) {
        // Add the country to the uniqueCountries object with its corresponding emoji
        uniqueCountriesObj[country] = { country, emoji };
      }
    });

    // set the countries to the uniqueCountriesObj coverted to an array
    setCountries(Object.values(uniqueCountriesObj));
  }, [cities]);

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="add your first city by clicking on a city on the map" />
    );

  // const Countries = cities.reduce((arr, city) => {
  //   if (!arr.map((el) => el?.country).includes(city.country))
  //     return [...arr, { country: city.country, emoji: city.emoji }];
  //   else return arr;
  // }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
