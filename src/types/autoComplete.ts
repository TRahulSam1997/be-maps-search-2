interface Address {
  streetName: string;
  streetNumber?: string;
  countryCode: string;
  country: string;
  freeformAddress: string;
  municipality: string;
}

export interface AutoCompleteResult {
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
