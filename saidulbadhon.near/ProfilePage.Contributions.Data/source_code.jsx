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

console.log(
  "allWidgetsHistoryChangesBlocks : ",
  allWidgetsHistoryChangesBlocks
);

// if (allWidgetsHistoryChangesBlocks === null) return "Loading...";

// const widget = allWidgetsHistoryChangesBlocks[accountId].widget;

// const totalCommits = Object.keys(widget)
//   .map((key) => widget[key])
//   .flat()
//   .map((blockHeight) => {
//     const xs = Near.block(blockHeight);

//     const timeMs = parseFloat(xs.header.timestamp_nanosec) / 1e6;

//     return new Date(timeMs).toLocaleDateString();
//   });

// const checkOccurrence = (array, element) => {
//   let counter = 0;
//   for (let i = 0; i <= array.length; i++) {
//     if (array[i] == element) {
//       counter++;
//     }
//   }
//   return counter;
// };

// const generate = () => {
//   // Create an empty array to hold the objects
//   const dataArray = [] || [{ empty: true }];

//   // Loop through each day of 2023
//   for (let i = 0; i < 365; i++) {
//     // Create a new date object for the current day
//     const date = new Date(2023, 0, i + 1);

//     const value = checkOccurrence(totalCommits, date.toLocaleDateString());

//     // Create a new object with the date and value and add it to the array
//     dataArray.push({ date: date.toLocaleDateString(), value });
//   }

//   return dataArray;
// };

// const array = generate();

return <div />;
