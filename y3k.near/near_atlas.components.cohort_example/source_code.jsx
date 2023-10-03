let rawData;

try {
  rawData = fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/cda79e6a-1379-41df-9a90-b2eb18022280/data/latest",
    {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    }
  );
} catch (e) {
  console.error("Error fetching data:", e);
}

const data = (rawData && rawData.body) || [];

const transformData = (dataArray) => {
  const result = dataArray.map((item) => ({
    CREATED_MONTH: item.CREATED_MONTH,
    MONTHS_SINCE: item.MONTHS_SINCE,
    COHORT_SIZE: item.COHORT_SIZE,
    ACTIVE_USERS: item.ACTIVE_USERS,
    RETENTION_RATE: item.RETENTION_RATE,
    include: true,
  }));
  return result;
};

// const transforedmData = transformData(data);
// const transformedData = transformData(data);

// console.log(transforedmData);
const data_sample = [
  {
    CREATED_MONTH: "2022-09-01",
    MONTHS_SINCE: 0,
    COHORT_SIZE: 962848,
    ACTIVE_USERS: 962848,
    RETENTION_RATE: 1,
    include: true,
  },
  {
    CREATED_MONTH: "2022-09-01",
    MONTHS_SINCE: 1,
    COHORT_SIZE: 962848,
    ACTIVE_USERS: 439722,
    RETENTION_RATE: 0.456689,
    include: true,
  },
];

function getColorForRetentionRate(rate) {
  if (rate <= 0.1) return "bg-teal-200";
  if (rate <= 0.2) return "bg-teal-300";
  if (rate <= 0.3) return "bg-teal-400";
  if (rate <= 0.4) return "bg-teal-500";
  if (rate <= 0.5) return "bg-teal-600";
  if (rate <= 0.6) return "bg-teal-700";
  if (rate <= 0.7) return "bg-teal-800";
  if (rate <= 0.8) return "bg-teal-900";
  if (rate <= 0.9) return "bg-teal-1000"; // This isn't an official Tailwind color, adjust as needed
  return "bg-teal-1100"; // This isn't an official Tailwind color, adjust as needed
}

const rawData2 = [
  {
    CREATED_MONTH: "2022-09-01",
    MONTHS_SINCE: 0,
    COHORT_SIZE: 962848,
    ACTIVE_USERS: 962848,
    RETENTION_RATE: 1,
  },
  {
    CREATED_MONTH: "2022-09-01",
    MONTHS_SINCE: 1,
    COHORT_SIZE: 962848,
    ACTIVE_USERS: 439722,
    RETENTION_RATE: 0.456689,
  },
  {
    CREATED_MONTH: "2022-09-01",
    MONTHS_SINCE: 2,
    COHORT_SIZE: 962848,
    ACTIVE_USERS: 332678,
    RETENTION_RATE: 0.345515,
  },
  {
    CREATED_MONTH: "2022-09-01",
    MONTHS_SINCE: 3,
    COHORT_SIZE: 962848,
    ACTIVE_USERS: 269995,
    RETENTION_RATE: 0.280413,
  },
  {
    CREATED_MONTH: "2022-09-01",
    MONTHS_SINCE: 4,
    COHORT_SIZE: 962848,
    ACTIVE_USERS: 331134,
    RETENTION_RATE: 0.343911,
  },
  {
    CREATED_MONTH: "2022-09-01",
    MONTHS_SINCE: 5,
    COHORT_SIZE: 962848,
    ACTIVE_USERS: 255028,
    RETENTION_RATE: 0.264868,
  },
];

const newData = data.map((item) => ({
  ...item,
  include: true,
}));

return (
  <div class="container border border-info p-3 text-center min-vw-100">
    <CohortEl data={newData} minRowsShown={5} />
  </div>
);
