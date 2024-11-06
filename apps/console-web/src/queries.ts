// src/queries.ts
import { gql } from "@apollo/client";

export const GET_RESTAURANTS = gql`
  query GetRestaurants {
    restaurants {
      id
      name
      cuisine
      location
      logo
      city
      branches
    }
  }
`;

export const GET_RESTAURANT_BY_ID = gql`
  query GetRestaurantById($id: ID!) {
    getRestaurantById(id: $id) {
      id
      name
      cuisine
      location
      logo
      city
      branches
    }
  }
`;

export const ADD_RESTAURANT = gql`
  mutation AddRestaurant(
    $name: String!
    $cuisine: String!
    $location: String!
    $logo: String
    $city: String!
    $branches: Int!
  ) {
    addRestaurant(
      name: $name
      cuisine: $cuisine
      location: $location
      logo: $logo
      city: $city
      branches: $branches
    ) {
      id
      name
      cuisine
      location
      logo
      city
      branches
    }
  }
`;

// Define TypeScript types for the data
export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  location: string;
  logo?: string;
  city: string;
  branches: number;
}

export interface GetRestaurantsData {
  restaurants: Restaurant[];
}

export interface GetRestaurantByIdData {
  getRestaurantById: Restaurant;
}

export interface AddRestaurantData {
  addRestaurant: Restaurant;
}

export interface AddRestaurantVars {
  name: string;
  cuisine: string;
  location: string;
  logo?: string;
  city: string;
  branches: number;
}
