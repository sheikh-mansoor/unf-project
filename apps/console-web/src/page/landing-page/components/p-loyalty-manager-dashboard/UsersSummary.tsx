import { UserCard } from "../../../../components/cards/user-card";
import { RowFlexContainer } from "../../../../components/row-flex-container";

const userCardData = [
  { title: "Total users", value: "6,650", percentage: -10, text: "-90 today" },
  { title: "Active users", value: "9,650", percentage: -11, text: "-20 today" },
  { title: "New users", value: "650", percentage: 1, text: "+2 today" },
  {
    title: "Non active users",
    value: "650",
    percentage: -91,
    text: "-20 today",
  },
  {
    title: "Non active users",
    value: "650",
    percentage: -91,
    text: "-20 today",
  },
  {
    title: "Non active users",
    value: "650",
    percentage: -91,
    text: "-20 today",
  },
  {
    title: "Non active users",
    value: "650",
    percentage: -91,
    text: "-20 today",
  },
  {
    title: "Non active users",
    value: "650",
    percentage: -91,
    text: "-20 today",
  },
];

export const UsersSummary = () => {
  return (
    <RowFlexContainer>
      {userCardData.map(({ title, value, percentage, text }, index) => (
        <UserCard
          key={index}
          title={title}
          value={value}
          percentage={percentage}
          text={text}
        />
      ))}
    </RowFlexContainer>
  );
};
