import { getPlaceAutocomplete } from "./maps-api";
import { AutoCompleteDetails, AutoCompleteResult } from "./types/autoComplete";

export default async function getAutoCompleteDetails(
  address: string,
  countryCode: string
): Promise<AutoCompleteDetails[]> {
  const apiKey: string | undefined = process.env.TOMTOM_API_KEY;

  if (!apiKey) {
    return Promise.reject(new Error("API key is missing."));
  }

  if (!address) {
    return Promise.reject(new Error("Address is missing."));
  }

  if (!countryCode) {
    return Promise.reject(new Error("Country code is missing."));
  }

  try {
    const res: AutoCompleteDetails[] = await getPlaceAutocomplete(
      apiKey,
      address,
      countryCode
    ).then(async (autocompleteResults: AutoCompleteResult[]) => {
      return autocompleteResults.map((result) => ({
        placeId: result.id || "",
        streetName: result.address.streetName || "",
        streetNumber: result.address.streetNumber || "",
        countryCode: result.address.countryCode || "",
        country: result.address.country || "",
        freeformAddress: result.address.freeformAddress || "",
        municipality: result.address.municipality || "",
      }));
    });

    return res;
  } catch (err) {
    return Promise.reject(
      new Error(`Failed to get autocomplete details: ${(err as Error).message}`)
    );
  }
}
