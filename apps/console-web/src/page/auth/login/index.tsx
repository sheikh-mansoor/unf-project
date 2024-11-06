import { gql, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthBackgroundImage } from "../../../assets/auth";
import { CustomInputField } from "../../../components/input-fields";
import { ToastNotification } from "../../../components/toast";
import { ROUTES } from "../../../constants";

// Define the login mutation with usernameOrEmail
const LOGIN_MUTATION = gql`
  mutation Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      message
      profileCompleted
      role
      token
      status
      firstTimeLogin
    }
  }
`;

const MainHeading = styled(Typography)({
  fontSize: "2rem",
  fontWeight: "700",
  textAlign: "center",
  marginBottom: "2rem",
});

const SubHeading = styled(Typography)({
  fontSize: "1rem",
  fontWeight: "500",
  textAlign: "center",
  marginBottom: "2rem",
});

const ForgotPassword = styled("a")({
  fontSize: "0.85rem",
  fontWeight: "400",
  textAlign: "end",
  color: "#757575",
});

const NoAccountText = styled(Typography)({
  fontSize: "0.85rem",
  fontWeight: "400",
  textAlign: "center",
});

const SignUpRedirectLink = styled("a")(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const LoginButton = styled(Button)({
  height: "3.125rem",
  color: "white",
  fontSize: "18px",
  fontWeight: "500",
});

export const Login: React.FC = () => {
  const [formValues, setFormValues] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState<"success" | "error">(
    "success",
  );

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("logged-out") === "true") {
      setToastMessage("Successfully logged out.");
      setToastVariant("success");
      setToastOpen(true);
      urlParams.delete("logged-out");
      const newUrl = `${window.location.pathname}${
        urlParams.toString() ? "?" + urlParams.toString() : ""
      }`;
      window.history.replaceState({}, "", newUrl);
    }
  }, []);

  const [login, { data, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      const { status, message, token, role, firstTimeLogin } = data.login;
      if (status === 200 || status === "SUCCESS") {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("email", formValues.usernameOrEmail);

        setToastMessage("Login successful!");
        setToastVariant("success");
        setToastOpen(true);

        if (firstTimeLogin) {
          navigate(`${ROUTES.RESET_PASSWORD}?force-password-reset=true`);
        } else {
          navigate(`${ROUTES.DASHBOARD}?logged-in=true`);
        }
      } else {
        console.error("Login failed with message:", message);
      }
    },
    onError: (error) => {
      console.error("Login error:", error.message);
      setToastMessage("Login failed: " + error.message);
      setToastVariant("error");
      setToastOpen(true);
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({
      variables: {
        usernameOrEmail: formValues.usernameOrEmail,
        password: formValues.password,
      },
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: `url(${AuthBackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{ padding: "2rem", borderRadius: 2, width: "26rem" }}
      >
        <MainHeading>Welcome to Loaf</MainHeading>
        <SubHeading>Login to your account</SubHeading>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <CustomInputField
            label="Username or Email"
            name="usernameOrEmail"
            inputType="text"
            value={formValues.usernameOrEmail}
            onChange={handleInputChange}
            placeholder="Enter your username or email"
            fullWidth
            required
          />
          <CustomInputField
            label="Password"
            name="password"
            inputType="password"
            value={formValues.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            fullWidth
            required
          />

          <ForgotPassword href={ROUTES.FORGOT_PASSWORD}>
            Forgot your password?
          </ForgotPassword>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Remember Me" />
          </FormGroup>

          {error && (
            <Typography color="error">Error: {error.message}</Typography>
          )}
          {data && data.login.status !== 200 && (
            <Typography color="error">{data.login.message}</Typography>
          )}

          <LoginButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Login
          </LoginButton>

          <NoAccountText>
            Don’t have an account?{" "}
            <SignUpRedirectLink>Sign Up</SignUpRedirectLink>
          </NoAccountText>
        </Box>
      </Paper>

      <ToastNotification
        open={toastOpen}
        message={toastMessage}
        variant={toastVariant}
        onClose={() => setToastOpen(false)}
      />
    </Box>
  );
};
