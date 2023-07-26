/**
 *  Format a timestamp (with or without nanoseconds) to a human-readable date.
 * @param {number|string} date
 * @return {string}
 */
function formatTimestamp(date) {
  const dateString = `${date}`;
  return new Date(Number(dateString.substring(0, 13))).toLocaleDateString();
}

function FormatTimestamp({ date }) {
  return <>{formatTimestamp(date)}</>;
}

return { formatTimestamp, FormatTimestamp };
