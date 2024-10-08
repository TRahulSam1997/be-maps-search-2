import { getPlaceAutocomplete } from "./maps-api";

interface Address {
  streetName: string;
  streetNumber?: string;
  countryCode: string;
  country: string;
  freeformAddress: string;
  municipality: string;
}

interface AutoCompleteResult {
  id: string;
  address: Address;
}

export interface AutoCompleteDetails {
  placeId: string;
  streetName: string;
  streetNumber: string;
  countryCode: string;
  country: string;
  freeformAddress: string;
  municipality: string;
}

export async function getAutoCompleteDetails(
  address: string
): Promise<AutoCompleteDetails[]> {
  const apiKey: string | undefined = process.env.TOMTOM_API_KEY;
  const countryCode: string | undefined = process.env.COUNTRY_CODE;

  if (!apiKey) {
    return Promise.reject(new Error("API key is missing."));
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
