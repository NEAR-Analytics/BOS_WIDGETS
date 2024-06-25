const { startTime, endTime } = props;

State.init({
  days: "-",
  hours: "-",
  minutes: "-",
  seconds: "-",
  title: "",
});

const formatTime = (time) => (time < 10 ? `0${time}` : time);

const timer = setInterval(() => {
  const now = new Date().getTime();
  const start = new Date(parseInt(startTime)).getTime();
  const end = new Date(parseInt(endTime)).getTime();
  let title = "";

  const diff = new Date(parseInt(end)).getTime() - new Date().getTime();
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (now < start) title = <>closed</>;
  else if (now > start && now < end) title = <>open</>;
  else {
    title = <>ended</>;
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
  }
  console.log([days, hours, minutes, seconds, title]);
  State.update({
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    title: title,
  });

  clearInterval(timer);
}, 1000);

const Timer = styled.div`
  font-size: 23px;
  color: #000;
  display: flex;
  width: 290px;
  padding: 0 20px;
`;

const TimerContainer = styled.div`
  font-size: 19px;
  color: #fff;
  display: flex;
  align-items: center;
  line-height: 1;
  padding: 12px;
`;

const TimerContent = () => {
  const TimeSlot = ({ time, title }) => (
    <div>
      <div className="time">{formatTime(time)}</div>
      <small>{title}</small>
    </div>
  );

  return (
    <>
      <Timer className="d-flex">
        <TimeSlot title="days" time={state.days} />
        <TimeSlot title="hours" time={state.hours} />
        <TimeSlot title="minutes" time={state.minutes} />
        <TimeSlot title="seconds" time={state.seconds} />
      </Timer>
    </>
  );
};

return (
  <div className="p-3 justify-content-between align-items-center">
    <TimerContainer className="d-flex align-items-center justify-content-center">
      <Timer>
        <div className="m-2">
          <b>{formatTime(state.days)}</b>d
        </div>
        <div className="m-2">
          <b>{formatTime(state.hours)}</b>h
        </div>
        <div className="m-2">
          <b>{formatTime(state.minutes)}</b>m
        </div>
        <div className="m-2">
          <b>{formatTime(state.seconds)}</b>s
        </div>
      </Timer>
    </TimerContainer>
  </div>
);
