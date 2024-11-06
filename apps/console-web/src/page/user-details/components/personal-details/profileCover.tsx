import { Avatar, Box, Card, Typography } from "@mui/material";
import React from "react";

interface User {
  coverUrl: string;
  profileUrl: string;
  name: string;
  bio: string;
}

interface ProfileCoverProps {
  user: User;
}

export const ProfileCover: React.FC<ProfileCoverProps> = ({ user }) => {
  return (
    <Card
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <Box
        component="img"
        src={user.coverUrl}
        alt="Cover"
        sx={{
          width: "100%",
          height: "100px",
          objectFit: "cover",
        }}
      />
      <Avatar
        src={user.profileUrl}
        alt="Profile"
        sx={{
          width: 150,
          height: 150,
          border: "5px solid white",
          position: "absolute",
          bottom: "75px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      <Box sx={{ textAlign: "center", marginTop: "90px" }}>
        <Typography variant="h5">{user.name}</Typography>
        <Typography variant="body1">{user.bio}</Typography>
      </Box>
    </Card>
  );
};
