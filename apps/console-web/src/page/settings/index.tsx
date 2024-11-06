import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { withDashboardLayout } from "../../components/layouts/DashboardLayout";

const PageContainer = styled("div")(() => ({
  maxWidth: "600px",
}));

const Section = styled("div")(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

// Tab Panel to render different content based on selected tab
function TabPanel(props: {
  children?: React.ReactNode;
  index: number;
  value: number;
}) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// Main Settings Page Component
const SettingsPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Handle tab change
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handle notification switch changes
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationSettings({
      ...notificationSettings,
      [e.target.name]: e.target.checked,
    });
  };

  // Handle security input changes
  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecuritySettings({
      ...securitySettings,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <PageContainer>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      {/* Tabs for Notifications and Security */}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        aria-label="settings tabs"
      >
        <Tab label="Notifications" />
        <Tab label="Security" />
      </Tabs>

      {/* Notification Tab */}
      <TabPanel value={tabValue} index={0}>
        <Typography variant="h6" gutterBottom>
          Notification Preferences
        </Typography>
        <Section>
          <FormControlLabel
            control={
              <Switch
                checked={notificationSettings.emailNotifications}
                onChange={handleNotificationChange}
                name="emailNotifications"
                color="primary"
              />
            }
            label="Email Notifications"
          />
        </Section>
        <Section>
          <FormControlLabel
            control={
              <Switch
                checked={notificationSettings.smsNotifications}
                onChange={handleNotificationChange}
                name="smsNotifications"
                color="primary"
              />
            }
            label="SMS Notifications"
          />
        </Section>
        <Button variant="contained" color="primary">
          Save Notification Settings
        </Button>
      </TabPanel>

      {/* Security Tab */}
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h6" gutterBottom>
          Security Settings
        </Typography>
        <Section>
          <TextField
            fullWidth
            label="Current Password"
            type="password"
            name="currentPassword"
            value={securitySettings.currentPassword}
            onChange={handleSecurityChange}
            margin="normal"
          />
        </Section>
        <Section>
          <TextField
            fullWidth
            label="New Password"
            type="password"
            name="newPassword"
            value={securitySettings.newPassword}
            onChange={handleSecurityChange}
            margin="normal"
          />
        </Section>
        <Section>
          <TextField
            fullWidth
            label="Confirm New Password"
            type="password"
            name="confirmNewPassword"
            value={securitySettings.confirmNewPassword}
            onChange={handleSecurityChange}
            margin="normal"
          />
        </Section>
        <Button variant="contained" color="primary">
          Update Password
        </Button>
      </TabPanel>
    </PageContainer>
  );
};

export const Settings = withDashboardLayout(SettingsPage);
