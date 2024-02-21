if (!props.timeMs) {
  return "unknown";
}

const timeMs = parseFloat(props.timeMs);
const [dateNow, setDateNow] = useState(new Date());

const date = new Date(timeMs);
const title = `${date.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
})} ${date.toLocaleDateString([], {
  day: "numeric",
  month: "short",
  year: "numeric",
})}`;

const timeAgo = (diffSec) =>
  diffSec < 60000
    ? `${(diffSec / 1000) | 0}s`
    : diffSec < 3600000
    ? `${(diffSec / 60000) | 0}m`
    : diffSec < 86400000
    ? `${(diffSec / 3600000) | 0}h`
    : date.getFullYear() === dateNow.getFullYear()
    ? date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
      })
    : date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

setTimeout(() => {
  setDateNow(new Date());
}, 1000);

return (
  <span className={props.className} title={title}>
    {timeAgo(dateNow.getTime() - timeMs, date)}
  </span>
);
