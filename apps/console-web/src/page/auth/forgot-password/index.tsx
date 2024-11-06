import { gql, useMutation } from "@apollo/client";
import { Box, Button, Paper, Typography, styled } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthBackgroundImage, PasswordLockSvg } from "../../../assets/auth";
import { CustomInputField } from "../../../components/input-fields";
import { ROUTES } from "../../../constants";

const SEND_PASSWORD_RESET_LINK_MUTATION = gql`
  mutation SendPasswordResetLink_notforCustomers($email: String!) {
    sendPasswordResetLink_notforCustomers(email: $email) {
      message
      status
      user {
        email
        firstName
        lastName
      }
    }
  }
`;

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const [sendPasswordResetLink, { loading }] = useMutation(
    SEND_PASSWORD_RESET_LINK_MUTATION,
    {
      onCompleted: (data) => {
        const { status, message } = data.sendPasswordResetLink_notforCustomers;
        if (status === 200 || status === "SUCCESS") {
          setIsEmailSent(true);
          setErrorMessage(null);
        } else {
          setErrorMessage(message);
        }
      },
      onError: (error) => {
        setErrorMessage(error.message);
      },
    },
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendPasswordResetLink({ variables: { email } });
  };

  const handleBackToLogin = () => {
    setIsEmailSent(false);
    setEmail("");
    setErrorMessage(null);
    navigate(ROUTES.LOGIN);
  };

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

  const NoAccountText = styled(Typography)({
    fontSize: "0.85rem",
    fontWeight: "400",
    textAlign: "center",
  });

  const SignUpRedirectLink = styled("a")(({ theme }) => ({
    color: theme.palette.primary.main,
  }));

  const StyledButton = styled(Button)({
    height: "3.125rem",
    color: "white",
    fontSize: "18px",
    fontWeight: "500",
  });

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${AuthBackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 2,
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        <Box
          sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
        >
          <PasswordLockSvg />
        </Box>

        {!isEmailSent ?
          <>
            <MainHeading>Forgot Password</MainHeading>
            <SubHeading>Enter your email for instructions.</SubHeading>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <CustomInputField
                label="Email"
                name="email"
                inputType="email"
                value={email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                fullWidth
                required
              />
              {loading && <Typography>Sending...</Typography>}
              {errorMessage && (
                <Typography color="error">Error: {errorMessage}</Typography>
              )}

              <StyledButton
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
              >
                Request Password Reset
              </StyledButton>

              <NoAccountText>
                Don’t have an account?{" "}
                <SignUpRedirectLink>Sign Up</SignUpRedirectLink>
              </NoAccountText>
            </Box>
          </>
        : <>
            <MainHeading>Check your email</MainHeading>
            <SubHeading>
              A password reset link has been sent to {email}. Please check your
              inbox.
            </SubHeading>
            <StyledButton
              onClick={handleBackToLogin}
              variant="contained"
              color="primary"
              fullWidth
            >
              Back to Login
            </StyledButton>
          </>
        }
      </Paper>
    </Box>
  );
};
