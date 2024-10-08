import axios from "axios";

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
export async function getPlaceAutocomplete(
  key: string,
  address: string,
  countryCode: string
) {
  const autocomplete = await axios.get(
    `https://api.tomtom.com/search/2/search/${address}.json?countrySet=${countryCode}`,
    {
      params: {
        key,
        limit: 100,
      },
    }
  );

  return autocomplete.data.results;
}
