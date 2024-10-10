interface Address {
  streetName: string;
  streetNumber?: string;
  countryCode: string;
  country: string;
  freeformAddress: string;
  municipality: string;
}

export interface AutoCompleteDetails {
  placeId: string;
  streetName: string;
  streetNumber?: string;
  countryCode: string;
  country: string;
  freeformAddress: string;
  municipality: string;
}

// Types for TomTom API result
interface Address {
  streetName: string;
  streetNumber?: string;
  municipalitySubdivision?: string;
  municipality: string;
  countrySecondarySubdivision: string;
  countrySubdivision?: string;
  countrySubdivisionName?: string;
  countrySubdivisionCode?: string;
  postalCode?: string;
  countryCode: string;
  country: string;
  freeformAddress: string;
  localName?: string;
}

export interface AutoCompleteResult {
  type?: string;
  id: string;
  address: Address;
  score?: number;
}
