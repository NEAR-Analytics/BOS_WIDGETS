function timeSince(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000); // 시간 차이를 초 단위로 계산

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const year = day * 365;

  if (seconds < hour) {
    return "방금";
  } else if (seconds < day) {
    return `${Math.floor(seconds / hour)}시간 전`;
  } else if (seconds < year) {
    return `${Math.floor(seconds / day)}일 전`;
  } else {
    const years = Math.floor(seconds / year);
    const days = Math.floor((seconds % year) / day);
    return `${years}년 ${days}일 전`;
  }
}

return <>{timeSince(props.date)}</>;
