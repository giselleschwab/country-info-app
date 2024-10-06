// src/app/page.js
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("http://localhost:3333/countries");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-black text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-white text-center">
        Available Countries
      </h1>
      <ul className="mt-4 space-y-2">
        {countries.map((country) => (
          <li
            key={country.countryCode}
            className="hover:bg-purple-500 hover:text-black transition duration-300 rounded-lg"
          >
            <Link
              href={`/countries/${country.countryCode}`}
              className="block p-4"
            >
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
