const { startDate } = props;

const [times, setTimes] = useState("-- : -- : --");
const formatTime = (time) => time;

// const timer = setInterval(() => {
//   const distance = startDate - new Date().getTime();
//   const seconds = Math.floor((distance / 1000) % 60);
//   const minutes = Math.floor((distance / 1000 / 60) % 60);
//   const hours = Math.floor(distance / (1000 * 60 * 60));

//   setTimes(`${formatTime(minutes)} m : ${formatTime(seconds)} s`);

//   clearInterval(timer);
// }, 1000);

return <h4>{times}</h4>;
