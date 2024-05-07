if (!props.date) return "-";

const monthsStr = [
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
const date = new Date(props.date);
const monthStr = monthsStr[date.getMonth()];
const day = date.getDate();
const year = date.getFullYear();

return `${day} ${monthStr} ${year}`;
