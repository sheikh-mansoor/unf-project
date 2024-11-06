// Define all possible input types
export const INPUT_TYPES = {
    TEXT: "text",
    EMAIL: "email",
    PASSWORD: "password",
    SELECT: "select",
    NUMBER: "number",
    DATE: "date",
    TEL: "tel",
    URL: "url",
    // Add more input types as needed
  } as const;
  
  export type InputType = typeof INPUT_TYPES[keyof typeof INPUT_TYPES];
  