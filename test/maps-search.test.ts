import { config } from "dotenv";
import { describe } from "@jest/globals";
import { getPlaceAutocomplete } from "../src/maps-api";
import { AutoCompleteDetails, getAutoCompleteDetails } from "../src";

config();

const getRandomNumberBetween1And10 = (): number => {
  return Math.floor(Math.random() * 10) + 1;
};

// These are end-to-end tests and need an api key
describe("Tomtom Places E2E Tests", () => {
  describe("getAutoCompleteDetails", () => {
    it("returns a promise", () => {
      const res = getAutoCompleteDetails("Charlotte Street");
      expect(res).toBeInstanceOf(Promise);
    });

    it("can fetch from the autocomplete api", async () => {
      const res = await getAutoCompleteDetails("Charlotte Street");
      const firstRes = res[0];

      expect(firstRes).toHaveProperty("placeId");
      expect(firstRes).toHaveProperty("streetNumber");
      expect(firstRes).toHaveProperty("countryCode");
      expect(firstRes).toHaveProperty("country");
      expect(firstRes).toHaveProperty("freeformAddress");
      expect(firstRes).toHaveProperty("municipality");
    });

    it("can fetch from the autocomplete api results", async () => {
      const res: AutoCompleteDetails[] = await getAutoCompleteDetails(
        "Charlotte Street"
      );
      const firstRes = res[1];

      // The reason for checking a negation is because fuzzy-search is non-deterministic and can make tests flakey
      expect(firstRes.placeId).not.toBe("");
      expect(firstRes.countryCode).not.toBe("");
      expect(firstRes.country).not.toBe("");
      expect(firstRes.streetName).not.toBe("");
    });

    it("fetches only places from Australia", async () => {
      const res: AutoCompleteDetails[] = await getAutoCompleteDetails(
        "Charlotte Street"
      );

      const firstRes = res[getRandomNumberBetween1And10()];

      expect(firstRes.countryCode).toBe("AU");
      expect(firstRes.country).toBe("Australia");
    });
  });

  describe("getPlaceAutocomplete", () => {
    it("handles no results", async () => {
      const res = await getPlaceAutocomplete(
        // Ignoring type error since this is a test and handled in function
        // @ts-ignore
        process.env.TOMTOM_API_KEY,
        "asfasffasfasafsafs",
        process.env.COUNTRY_CODE
      );
      expect(res).toStrictEqual([]);
    });

    it("handles error", async () => {
      expect(
        // Ignoring type error since this is a test and handled in function
        // @ts-ignore
        getPlaceAutocomplete(process.env.TOMTOM_API_KEY, "")
      ).rejects.toThrow();
    });
  });
});
