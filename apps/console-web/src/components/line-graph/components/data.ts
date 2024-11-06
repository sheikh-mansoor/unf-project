const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomData = (labels: string[], labelKey: string) => {
  return labels.map((label) => ({
    london: getRandomInt(20, 300),
    paris: getRandomInt(20, 300),
    newYork: getRandomInt(20, 300),
    seoul: getRandomInt(20, 300),
    [labelKey]: label,
  }));
};

const MONTHLY_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const WEEKLY_LABELS = Array.from({ length: 7 }, (_, i) => `Week ${i + 1}`);
const YEARLY_LABELS = ["2019", "2020", "2021", "2022", "2023"];

export const MONTHLY_ENTRIES = generateRandomData(MONTHLY_LABELS, "month");
export const WEEKLY_ENTRIES = generateRandomData(WEEKLY_LABELS, "week");
export const YEARLY_ENTRIES = generateRandomData(YEARLY_LABELS, "year");
