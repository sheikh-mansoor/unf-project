import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { v4 as uuidv4 } from "uuid"; // To generate unique IDs for new entries

// Define the schema types
const typeDefs = `
  type CashbackTier {
    id: ID!
    name: String!
    startValue: Float!
    endValue: Float!
    percentage: Float!
    rewards: String
    description: String
    createdAt: String!
    updatedAt: String!
  }

  type CashbackTiersResponse {
    cashbackTiers: [CashbackTier!]!
    message: String!
    status: String!
  }

  type RestaurantStatus {
    total: Int!
    open: Int!
    closed: Int!
  }

  type Chain {
    id: ID!
    name: String!
    logo: String!
    address: String!
    code: String!
    status: String!  
    restaurants: RestaurantStatus!
  }

  type Restaurant {
    id: ID!
    name: String!
    address: String!
    emirate: String!
    city: String!
    contactNumber: String!
    email: String!
    description: String!
    openingTime: String!
    closingTime: String!
    cuisineTypes: [String!]!
    tags: [String!]!
  }

  type AllRestaurantsResponse {
    restaurants: [Restaurant!]!
    message: String!
    status: String!
  }

  type Manager {
    id: ID!
    name: String!
    email: String!
    type: String!
  }

  type LoginResponse {
    message: String!
    token: String!
    role: String!
    profileCompleted: Boolean!
    status: Int!
    firstTimeLogin: Boolean!
  }

  # PromoCode related types and inputs
  type PromoCode {
    id: ID!
    discountType: String!
    discountValue: Float!
    endTime: String!
    label: String!
    minSpend: Float!
    promoCode: String!
    promoType: String!
    startTime: String!
    maxDiscountAmount: Float
    totalRecurrence: TotalRecurrence
    validFor: [PromoCodeFilter!]
  }

  input TotalRecurrenceInput {
    count: Int
    interval: String
  }

  input PromoCodeFilterInput {
    key: String!
    value: String!
  }

  type PromoCodeResponse {
    message: String!
    status: String!
    promoCode: PromoCode
  }

  type TotalRecurrence {
    count: Int
    interval: String
  }

  type PromoCodeFilter {
    key: String!
    value: String!
  }

  type Query {
    allRestaurants: AllRestaurantsResponse!
    getRestaurantById(id: ID!): Restaurant
    managers: [Manager]
    chains: [Chain]
    allCashbackTiers: CashbackTiersResponse!
    getAllPromoCodes: [PromoCode!]!
  }

  type Mutation {
    addRestaurant(
      name: String!
      address: String!
      emirate: String!
      city: String!
      contactNumber: String!
      email: String!
      description: String
      openingTime: String
      closingTime: String
      cuisineTypes: [String!]!
      tags: [String!]!
    ): Restaurant
    addManager(
      name: String!
      email: String!
    ): Manager
    login(usernameOrEmail: String!, password: String!): LoginResponse!
    createCashbackTier(
      endValue: Float!
      name: String!
      percentage: Float!
      startValue: Float!
      rewards: String
      description: String
    ): CashbackTiersResponse!
    updateCashbackTier(
      id: ID!
      endValue: Float
      name: String
      percentage: Float
      startValue: Float
      rewards: String
      description: String
    ): CashbackTiersResponse!

    # Add the new mutation for creating a promo code
    createPromoCode(
      discountType: String!
      discountValue: Float!
      endTime: String!
      label: String!
      minSpend: Float!
      promoCode: String!
      promoType: String!
      startTime: String!
      maxDiscountAmount: Float
      totalRecurrence: TotalRecurrenceInput
      validFor: [PromoCodeFilterInput!]
    ): PromoCodeResponse!
  }
`;

// Mock data for restaurants, managers, cashback tiers, and promo codes
const restaurantData = [
  {
    id: "1",
    name: "Pizza Palace",
    address: "123 Main St",
    emirate: "Dubai",
    city: "New York",
    contactNumber: "123-456-7890",
    email: "contact@pizzapalace.com",
    description: "A popular pizza place in New York.",
    openingTime: "10:00 AM",
    closingTime: "11:00 PM",
    cuisineTypes: ["Italian", "Pizza"],
    tags: ["Family-friendly", "Casual Dining"],
  },
  {
    id: "2",
    name: "Sushi Central",
    address: "456 Elm St",
    emirate: "Abu Dhabi",
    city: "Los Angeles",
    contactNumber: "987-654-3210",
    email: "contact@sushicentral.com",
    description: "A Japanese sushi restaurant with fresh ingredients.",
    openingTime: "12:00 PM",
    closingTime: "10:00 PM",
    cuisineTypes: ["Japanese", "Sushi"],
    tags: ["Fine Dining", "Seafood"],
  },
];

const managerData = [
  {
    id: "1",
    name: "John Doe",
    usernameOrEmail: "m.shiekh@1551solutions.com",
    role: "PLATFORM_MANAGER",
    password: "123123",
    firstTimeLogin: false,
    profileCompleted: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    usernameOrEmail: "m.shiekh+1@1551solutions.com",
    role: "PLATFORM_LOYALTY_MANAGER",
    password: "123123",
    firstTimeLogin: false,
    profileCompleted: true,
  },
  {
    id: "3",
    name: "New Chain Manager",
    usernameOrEmail: "m.shiekh+3@1551solutions.com",
    role: "CHAIN_MANAGER",
    password: "123123",
    firstTimeLogin: false,
    profileCompleted: true,
  },
];

// Mock users for login
const users = [
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    type: "CHAIN_MANAGER",
  },
];

const promoCodeData = []; // Array to store created promo codes

// Mock data for chains
const chainData = [
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    type: "LOYALTY_MANAGER",
  },
  {
    id: "5",
    name: "David Clark",
    email: "david.clark@example.com",
    type: "CHAIN_MANAGER",
  },
  {
    id: "6",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    type: "LOYALTY_MANAGER",
  },
];

// Resolvers to manage the in-memory data
const resolvers = {
  Query: {
    allRestaurants: () => ({
      restaurants: restaurantData,
      message: "Restaurants fetched successfully",
      status: "success",
    }),
    getRestaurantById: (_, { id }) =>
      restaurantData.find((rest) => rest.id === id),
    managers: () => managerData,
    chains: () => chainData,
    allCashbackTiers: () => {
      // Ensure no CashbackTier has a null or undefined 'name' field
      const sanitizedCashbackTiers = cashbackTierData.map((tier) => ({
        ...tier,
        name: tier.name || "Unknown Tier", // Default to 'Unknown Tier' if name is null or undefined
      }));

      return {
        cashbackTiers: sanitizedCashbackTiers,
        message: "Successfully fetched cashback tiers",
        status: "success",
      };
    },
    // New resolver for fetching all promo codes
    getAllPromoCodes: () => promoCodeData,
  },
  Mutation: {
    addRestaurant: (
      _,
      {
        name,
        address,
        emirate,
        city,
        contactNumber,
        email,
        description,
        openingTime,
        closingTime,
        cuisineTypes,
        tags,
      },
    ) => {
      const newRestaurant = {
        id: uuidv4(),
        name,
        address,
        emirate,
        city,
        contactNumber,
        email,
        description,
        openingTime,
        closingTime,
        cuisineTypes,
        tags,
      };
      restaurantData.push(newRestaurant);
      return newRestaurant;
    },
    addManager: (_, { name, email }) => {
      const newManager = {
        id: String(managerData.length + 1),
        name,
        email,
      };
      managerData.push(newManager);
      return newManager;
    },
    login: (_, { usernameOrEmail, password }) => {
      // Find the user by email or username
      const user = managerData.find(
        (user) =>
          user.usernameOrEmail === usernameOrEmail &&
          user.password === password,
      );

      // If user not found, return an error message
      if (!user) {
        throw new Error("Invalid credentials");
      }

      // Return login response with status 200
      return {
        message: "Login successful",
        token: "mocked-jwt-token",
        role: user.role,
        profileCompleted: user.profileCompleted,
        status: 200,
        firstTimeLogin: user.firstTimeLogin,
      };
    },
    createCashbackTier: (
      _,
      { endValue, name, percentage, startValue, rewards, description },
    ) => {
      const newCashbackTier = {
        id: uuidv4(),
        name,
        startValue,
        endValue,
        percentage,
        rewards,
        description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      cashbackTierData.push(newCashbackTier);

      return {
        cashbackTiers: cashbackTierData,
        message: "Cashback tier created successfully",
        status: "success",
      };
    },
    updateCashbackTier: (
      _,
      { id, endValue, name, percentage, startValue, rewards, description },
    ) => {
      // Find the tier by ID
      const tierIndex = cashbackTierData.findIndex((tier) => tier.id === id);
      if (tierIndex === -1) {
        throw new Error("Cashback tier not found");
      }

      // Update the tier fields with provided values
      cashbackTierData[tierIndex] = {
        ...cashbackTierData[tierIndex],
        name: name ?? cashbackTierData[tierIndex].name,
        percentage: percentage ?? cashbackTierData[tierIndex].percentage,
        startValue: startValue ?? cashbackTierData[tierIndex].startValue,
        endValue: endValue ?? cashbackTierData[tierIndex].endValue,
        rewards: rewards ?? cashbackTierData[tierIndex].rewards,
        description: description ?? cashbackTierData[tierIndex].description,
        updatedAt: new Date().toISOString(), // Update the `updatedAt` field
      };

      return {
        cashbackTiers: cashbackTierData,
        message: "Cashback tier updated successfully",
        status: "success",
      };
    },

    // Resolver to create and store promo codes
    createPromoCode: (
      _,
      {
        discountType,
        discountValue,
        endTime,
        label,
        minSpend,
        promoCode,
        promoType,
        startTime,
        maxDiscountAmount,
        totalRecurrence,
        validFor,
      },
    ) => {
      const newPromoCode = {
        id: uuidv4(),
        discountType,
        discountValue,
        endTime,
        label,
        minSpend,
        promoCode,
        promoType,
        startTime,
        maxDiscountAmount,
        totalRecurrence,
        validFor,
      };

      promoCodeData.push(newPromoCode);

      return {
        message: "Promo code created successfully",
        status: "success",
        promoCode: newPromoCode,
      };
    },
  },
};

// Create a schema from type definitions and resolvers
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Initialize an Apollo Server with the schema
const server = new ApolloServer({ schema });

// Create an Express application
const app = express();

// Apply the Apollo Server middleware to the Express app
server.start().then(() => {
  server.applyMiddleware({ app });

  // Start the server on port 4000
  app.listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
    ),
  );
});
