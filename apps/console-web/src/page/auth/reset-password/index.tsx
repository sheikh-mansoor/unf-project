import { gql, useMutation } from "@apollo/client";
import { Box, Button, Paper, Typography, styled } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthBackgroundImage, ResetPasswordSvg } from "../../../assets/auth";
import { CustomInputField } from "../../../components/input-fields";
import { ToastNotification } from "../../../components/toast";
import { ROUTES } from "../../../constants";

const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPasswordWithToken_notforCustomers(
    $confirmPassword: String!
    $email: String!
    $newPassword: String!
    $token: String!
  ) {
    resetPasswordWithToken_notforCustomers(
      confirmPassword: $confirmPassword
      email: $email
      newPassword: $newPassword
      token: $token
    ) {
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

export const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState<"success" | "error">(
    "success",
  );

  const navigate = useNavigate();
  const location = useLocation();

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get("email");

    return {
      token: params.get("token"),
      email:
        emailParam && emailParam.includes(" ") ?
          emailParam.replace(/\s/g, "+")
        : emailParam,
    };
  };

  const token = getQueryParams().token || localStorage.getItem("token");
  const email = getQueryParams().email || localStorage.getItem("email");

  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD_MUTATION, {
    onCompleted: (data) => {
      const { status, message } = data.resetPasswordWithToken_notforCustomers;
      if (status === 200 || status === "SUCCESS") {
        setResetSuccess(true);
        setErrorMessage(null);
        setToastMessage("Password reset successfully!");
        setToastVariant("success");
        setToastOpen(true);
      } else {
        setErrorMessage(message);
      }
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token || !email) {
      setErrorMessage("Missing token or email from query parameters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    resetPassword({
      variables: {
        confirmPassword,
        newPassword: password,
        email,
        token,
      },
    });
  };

  const handleBackToLogin = () => {
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
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 2,
          }}
        >
          <ResetPasswordSvg />
        </Box>

        {!resetSuccess ?
          <>
            <MainHeading>Set New Password</MainHeading>
            <SubHeading>Must be at least 8 characters.</SubHeading>

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
                label="New Password"
                name="password"
                inputType="password"
                value={password}
                onChange={handleInputChange}
                placeholder="Enter new password"
                fullWidth
                required
              />
              <CustomInputField
                label="Confirm New Password"
                name="confirmPassword"
                inputType="password"
                value={confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm new password"
                fullWidth
                required
              />
              {loading && <Typography>Loading...</Typography>}
              {errorMessage && (
                <Typography color="error">Error: {errorMessage}</Typography>
              )}

              <StyledButton
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Reset Password
              </StyledButton>
            </Box>
          </>
        : <>
            <MainHeading>Password Reset Successful</MainHeading>
            <SubHeading>Your password has been successfully reset.</SubHeading>
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

      <ToastNotification
        open={toastOpen}
        message={toastMessage}
        variant={toastVariant}
        onClose={() => setToastOpen(false)}
      />
    </Box>
  );
};
