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
const hour = date.getHours();
const toTwo = (num) => (num > 10 ? num : "0" + num);
const hourStr = hour > 12 ? hour - 12 : hour;
const minutes = date.getMinutes();
const unit = hour > 11 ? "PM" : "AM";

return `${monthStr} ${day}, ${year} ${toTwo(hourStr)}:${toTwo(
  minutes
)} ${unit}`;
