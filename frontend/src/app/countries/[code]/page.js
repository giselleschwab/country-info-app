"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";

const CountryInfo = () => {
  const { code } = useParams();
  const [countryInfo, setCountryInfo] = useState(null);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      if (code) {
        try {
          const response = await axios.get(
            `http://localhost:3333/api/countries/${code}`
          );
          setCountryInfo(response.data);
        } catch (error) {
          console.error("Error fetching country info:", error);
        }
      }
    };

    fetchCountryInfo();
  }, [code]);

  if (!countryInfo) return <div>Loading...</div>;

  const { borderCountries, flagUrl } = countryInfo;

  return (
    <div className="container mx-auto p-4 flex flex-col items-center bg-gray-900 text-white rounded-lg shadow-lg mt-8">
      <h1 className="text-3xl font-bold text-purple-500 mb-2">
        Detailed Information about the country with code {code}
      </h1>
      <img
        src={flagUrl}
        alt={`${code} flag`}
        className="w-32 h-auto mb-4 rounded-md shadow-md"
      />
      <h2 className="text-lg font-semibold text-white mt-4">
        Border Countries:
      </h2>
      <ul className="mt-2 space-y-2">
        {borderCountries.map((country) => (
          <li key={country.countryCode}>
            <Link href={`/countries/${country.countryCode}`}>
              <span className="text-purple-400 hover:underline cursor-pointer">
                {country.commonName}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryInfo;
