// Import createTheme and ThemeOptions from MUI's styles
import { createTheme } from "@mui/material/styles";

// Extend the TypeText interface to include `tertiary`
declare module "@mui/material/styles" {
  interface TypeText {
    tertiary: string;
  }

  interface Palette {
    text: TypeText;
    status: {
      success: string;
      error: string;
      warning: string;
    }; // Define status as its own type
    border: TypeText;
  }

  interface PaletteOptions {
    text?: Partial<TypeText>;
    status?: {
      success?: string;
      error?: string;
      warning?: string;
    };
    border?: {
      primary?: string;
      secondary?: string;
    };
  }
}

// Create a theme instance
const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Roboto, Arial, sans-serif",
    fontSize: 14,
    h1: {
      fontSize: "2.25rem",
    },
  },
  palette: {
    primary: {
      main: "#4FADE6",
    },
    secondary: {
      main: "#19857b",
    },
    background: {
      default: "#FAFAFA",
      paper: "white",
    },
    text: {
      primary: "#1A1C21",
      secondary: "#4D5464",
      tertiary: "#667085",
    },
    status: {
      success: "#00CC43",
      error: "#FF4B4B",
      warning: "#F58000", // Now properly defined
    },
    border: {
      primary: "#F0F1F3",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#667085",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#667085",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4FADE6",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderColor: "#667085",
        },
      },
    },
  },
});

export default theme;
