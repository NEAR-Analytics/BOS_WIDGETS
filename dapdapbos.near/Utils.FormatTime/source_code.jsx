const { time } = props;

function formatTime(_timestamp) {
  var date = new Date(_timestamp * 1000);
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);
  return year + "/" + month + "/" + day;
}

return formatTime(time);
