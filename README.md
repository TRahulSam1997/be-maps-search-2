# Scenario:

A developer on our team was working on integrating the TomTom API. They did a great job laying the groundwork, but they've recently been promoted to a new project that requires their full attention.

We are pretty confident the developer managed to complete the majority of the initial part of the integration, however there might be a bug or two to be discovered.

Your task is to finish off this implementation, ensuring the requirements are met with passing tests.

# Task:

To take a partial address input and return full address suggestions along with the address broken into its individual components using the TomTom API.

# Resources:

Place Search Documentation: https://developer.tomtom.com/search-api/documentation/search-service/search-service
API Key: <redacted>

# Install:

1. yarn install

# Test:

1. yarn install
2. yarn test

# Requirements:

1. All tests should pass and ensure good coverage for new work
2. We only allow Australian addresses to be returned
3. Code should be maintainable and consistent
4. The result elements should contain important information about the place (country, municipality, etc)
5. The returned result should be typed and easily consumable via users of the library
6. No front-end requirements are necessary, this is purely a backend NodeJS library

## Notes from candidate (Rahul Samaranayake) for reviewers

- I noticed a bug in getPlaceAutocomplete(), where it was sending only a destructured object value for placeId.
- I've added additional tests to cover the payload content. However, since this TomTom endpoint seems non-deterministic, I'm unsure how stable the tests will be.
- I've added interfaces to make the code type-safe.
- getAutoCompleteDetails() has been updated so the client can pass the country code.
- You can install this package to a project with `yarn add maps-backend-challenge` -> https://www.npmjs.com/package/maps-backend-challenge
