const calculateTimeLeft = () => {
  const now = new Date();
  let target = new Date();
  target.setUTCHours(14, 0, 0, 0);
  if (target < now) {
    target.setDate(target.getDate() + 1);
  }
  const difference = target - now;
  return difference;
};

const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

useEffect(() => {
  const interval = setInterval(() => {
    setTimeLeft(calculateTimeLeft());
  }, 1000);

  return () => clearInterval(interval);
}, []);

const formatTimeLeft = () => {
  let seconds = Math.floor((timeLeft / 1000) % 60)
    .toString()
    .padStart(2, "0");
  let minutes = Math.floor((timeLeft / 1000 / 60) % 60)
    .toString()
    .padStart(2, "0");
  let hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24)
    .toString()
    .padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

return (
  <div
    class="rounded shadow text-center text-white py-1"
    style={{ backgroundColor: "rgba(5, 48, 54, 0.5)" }}
  >
    <span>NEXT WORD IN</span>
    <span class="fw-bold">{formatTimeLeft()}</span>
  </div>
);
