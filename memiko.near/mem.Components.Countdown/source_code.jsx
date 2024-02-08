const { startDate } = props;

const [times, setTimes] = useState("** : ** : **");
const [disabled, setDisabled] = useState(false);
const formatTime = (time) => (time < 10 ? `0${time}` : time);

const timer = setInterval(() => {
  const distance = startDate - new Date().getTime();
  const seconds = Math.floor((distance / 1000) % 60);
  const minutes = Math.floor((distance / 1000 / 60) % 60);
  const hours = Math.floor(distance / (1000 * 60 * 60));

  if (distance < 0) {
    setTimes(0);
    setDisabled(true);
  } else {
    setTimes(
      `${formatTime(hours)} h : ${formatTime(minutes)} m : ${formatTime(
        seconds,
      )} s`,
    );
    setDisabled(false);
  }

  clearInterval(timer);
}, 1000);

return <h4 style={{ fontSize: "2rem" }}>{!disabled && times}</h4>;
