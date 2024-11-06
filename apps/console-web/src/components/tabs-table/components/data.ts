// Function to get random integers
const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate random data for chains for different time periods
const generateChainData = (labels: string[]) => {
  const chains = ["Maroosh", "Tikkas", "Premium Grillz", "UNF"];

  return labels.map(() => ({
    data: chains.map((chain) => ({
      chainName: chain,
      orders: getRandomInt(20, 100).toString(),
      sales: getRandomInt(100, 500).toString(),
    })),
  }));
};

// Labels for different time periods
const DAILY_LABELS = ["Today"];
const YESTERDAY_LABELS = ["Yesterday"];
const WEEKLY_LABELS = ["Last 7 Days"];
const MONTHLY_LABELS = ["Last 30 Days"];
const YEARLY_LABELS = ["Last 365 Days"];

// Generate entries for each time period using the same structure as before
export const TODAY_ENTRIES = generateChainData(DAILY_LABELS);
export const YESTERDAY_ENTRIES = generateChainData(YESTERDAY_LABELS);
export const WEEKLY_ENTRIES = generateChainData(WEEKLY_LABELS);
export const MONTHLY_ENTRIES = generateChainData(MONTHLY_LABELS);
export const YEARLY_ENTRIES = generateChainData(YEARLY_LABELS);

// console.log(TODAY_ENTRIES);
// console.log(YESTERDAY_ENTRIES);
// console.log(WEEKLY_ENTRIES);
// console.log(MONTHLY_ENTRIES);
// console.log(YEARLY_ENTRIES);
