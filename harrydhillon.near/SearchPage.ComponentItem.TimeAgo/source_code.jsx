if (props.now) {
  return "now";
}

const keyPath = props.keyPath;
let blockHeight = props.blockHeight ? parseInt(props.blockHeight) : undefined;

if (blockHeight === undefined && keyPath) {
  blockHeight = Social.keys(keyPath, undefined, {
    return_type: "BlockHeight",
  });
  if (blockHeight === null) {
    return "Loading";
  }
  keyPath.split("/").forEach((key) => {
    blockHeight = blockHeight[key];
  });
}

if (!blockHeight) {
  return "unknown";
}

const block = Near.block(blockHeight);

if (block === null) {
  return "Loading";
}

if (!block) {
  return "unknown";
}

const timeMs = parseFloat(block.header.timestamp_nanosec) / 1e6;
const date = new Date(timeMs);
const title = `${date.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
})} ${date.toLocaleDateString([], {
  day: "numeric",
  month: "short",
  year: "numeric",
})}`;

function timeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30.44; // average month
    const msPerYear = msPerDay * 365.25; // account for leap year

    const elapsed = now - past;

    if (elapsed < msPerMinute) {
        return 'just now';
    } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago';
    } else if (elapsed < msPerMonth) {
        const days = Math.round(elapsed / msPerDay);
        return days === 1 ? '1 day ago' : days + ' days ago';
    } else if (elapsed < msPerYear) {
        const months = Math.round(elapsed / msPerMonth);
        return months === 1 ? '1 month ago' : months + ' months ago';
    } else {
        const years = Math.round(elapsed / msPerYear);
        return years === 1 ? '1 year ago' : years + ' years ago';
    }
}

const TimeAgoContainer = styled.div`
  color: ${props.theme.textColor2};
  display: flex;
  gap: 4px;
  justify-content: center;
  // padding: 4px 8px;
  // border-radius: 4px;

  // position: absolute;
  // top: 8px;
  // right: 8px;
  // background-color: ${props.theme.ui2};

  z-index: 10;
`;

// <TimeAgoContainer>
// <i className="bi bi-clock" style={{ fontSize: 14 }}></i>{" "}
return (
  <p style={props.style} title={title}>
    {timeAgo(Date.now() - timeMs)} ago
  </p>
);
// </TimeAgoContainer>
