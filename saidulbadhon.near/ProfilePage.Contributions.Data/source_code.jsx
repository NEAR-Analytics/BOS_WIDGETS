const accountId = props.accountId || context.accountId;

if (!accountId) return "Login or send accountId in the props";

const profile = Social.getr(`${accountId}/profile`);

const allWidgetsHistoryChangesBlocks = Social.keys(
  `${accountId}/widget/*`,
  "final",
  {
    return_type: "History",
  }
);

// console.log(
//   "allWidgetsHistoryChangesBlocks : ",
//   allWidgetsHistoryChangesBlocks
// );

if (allWidgetsHistoryChangesBlocks === null) return "Loading...";

const widget = allWidgetsHistoryChangesBlocks[accountId].widget;

const totalCommits = Object.keys(widget)
  .map((key) => widget[key])
  .flat()
  .map((blockHeight) => {
    const xs = Near.block(blockHeight);

    const timeMs = parseFloat(xs.header.timestamp_nanosec) / 1e6;

    return new Date(timeMs).toLocaleDateString();
  });

const checkOccurrence = (array, element) => {
  let counter = 0;
  for (let i = 0; i <= array.length; i++) {
    if (array[i] == element) {
      counter++;
    }
  }
  return counter;
};

const generate = () => {
  if (!widget) return;

  const dataArray = [];

  // Get the current date
  const currentDate = new Date();

  // Loop through the last 365 days
  for (let i = 0; i < 365; i++) {
    // Calculate the date for the current iteration (going back in time)
    const date = new Date();
    date.setDate(currentDate.getDate() - i);

    const value = checkOccurrence(totalCommits, date.toLocaleDateString());

    // Create a new object with the date and value and add it to the array
    dataArray.unshift({ date: date, count: value });
    // dataArray.unshift({ date: date.toLocaleDateString(), count: value });
  }

  return dataArray;
};

// const generate = () => {
//   // Create an empty array to hold the objects
//   const dataArray = [] || [{ empty: true }];

//   // Loop through each day of 2023
//   for (let i = 0; i < 365; i++) {
//     // Create a new date object for the current day
//     const date = new Date(2023, 0, i + 1);

//     const value = checkOccurrence(totalCommits, date.toLocaleDateString());

//     // Create a new object with the date and value and add it to the array
//     dataArray.push({ date: date.toLocaleDateString(), count: value });
//   }

//   return dataArray;
// };

const array = generate();

console.log(array);

return (
  <div
    id="Getting-Contributions"
    onClick={() => {
      if (widget) props.responce(generate());
    }}
  />
);
