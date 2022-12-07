const submission = props.submission;

function readableDate(UNIX_timestamp) {
  var a = new Date(parseInt(UNIX_timestamp) / 1000000);
  return a.toDateString() + " " + a.toLocaleTimeString();
}

return (
  <div>
    <h3>{submission.name}</h3>
    <p>Author: {submission.account_id}</p>
    <p>Timestamp: {readableDate(submission.timestamp)} </p>
    <p>{submission.description}</p>
  </div>
);
