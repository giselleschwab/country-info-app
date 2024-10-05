import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

const NAGER_API_URL = process.env.NAGER_API_URL;
const COUNTRIES_API_URL = process.env.COUNTRIES_API_URL;

//Endpoints to get the list of available countries
app.get("/countries", async (req, res) => {
  try {
    const response = await axios.get(`${NAGER_API_URL}/AvailableCountries`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching the list of countries" });
  }
});

//Endpoint to get detailed information about a country
app.get("/api/countries/:code", async (req, res) => {
  const { code } = req.params;
  try {
    const borderCountriesResponse = await axios.get(
      `https://date.nager.at/api/v3/CountryInfo/${code}`
    );
    const populationResponse = await axios.get(
      `https://countriesnow.space/api/v0.1/countries/population`
    );
    const flagResponse = await axios.get(
      `https://countriesnow.space/api/v0.1/countries/flag/images`
    );

    const borderCountries = borderCountriesResponse.data.borders || [];
    const populationData = populationResponse.data.data || [];
    const flagUrl = flagResponse.data[code]?.flag || "";

    res.json({
      borderCountries,
      populationData,
      flagUrl,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching country info" });
  }
});

app.listen(3333, () => console.log("Server running at port 3333"));
