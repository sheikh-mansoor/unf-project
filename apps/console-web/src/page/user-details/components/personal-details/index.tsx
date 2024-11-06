import { Box, styled } from "@mui/material";
import { BasicInfoTabs } from "./basic-info-tabs";
import { DescriptionField } from "./description-field";
import { ProfileCover } from "./profileCover";

const StyledPersonalDetails = styled(Box)(({ theme }) => ({
  maxWidth: "300px",
  width: "100%",
  margin: "0 auto",
  position: "relative",
  border: "1px solid black",
  borderRadius: "12px",
  "& .cover-container": {
    position: "relative",
  },
  "& .body, & .footer": {
    padding: theme.spacing(2),
  },
  "& .body": {
    marginTop: "40px", // Space below profile photo
  },
}));

const user = {
  profileUrl:
    "https://media.istockphoto.com/id/1486147021/photo/portrait-of-a-mature-man-breathing-fresh-air.jpg?s=1024x1024&w=is&k=20&c=neAitspBZcqydbG6vvQjcz8gdIRjABKC7y-04ETehuY=",
  coverUrl:
    "https://media.istockphoto.com/id/1486147021/photo/portrait-of-a-mature-man-breathing-fresh-air.jpg?s=1024x1024&w=is&k=20&c=neAitspBZcqydbG6vvQjcz8gdIRjABKC7y-04ETehuY=",
  name: "John Doe",
  bio: "This is the bio of John Doe.",
};

const DescriptionWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  paddingTop: theme.spacing(2),
  gap: "1rem",
}));

export const PersonalDetails = () => {
  return (
    <StyledPersonalDetails>
      <Box className="cover-container">
        <ProfileCover user={user} />
      </Box>
      <Box className="body">
        <BasicInfoTabs />
        <DescriptionWrapper>
          <DescriptionField label={"City"} value={"Abu Dhabi"} />
          <DescriptionField label={"Birthday"} value={"2002-02-23"} />
          <DescriptionField label={"Phone#"} value={"0521234567"} />
          <DescriptionField label={"Email Address"} value={"adnrjb@gmail.ru"} />
          <DescriptionField label={"Language"} value={"English"} />
        </DescriptionWrapper>
      </Box>
      <Box className="footer">{/* Footer Content */}</Box>
    </StyledPersonalDetails>
  );
};
