const { startTime, endTime, type } = props;

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

  const diff = new Date(parseInt(end)).getTime() - new Date().getTime();
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (now < start) {
    title = <>closed</>;
  } else if (now > start && now < end) {
    title = <>open</>;
  } else {
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
  }

  console.log([days, hours, minutes, seconds]);
  State.update({
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    title: title,
  });

  clearInterval(timer);
}, 1000);

const TimeSlot = styled.div`
  flex: 1;
`;

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

const Time = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
`;

const TimerContent = () => {
  const TimeSlot = ({ time, title }) => (
    <div>
      <div>{formatTime(time)}</div>
      <small className="m-1">{title}</small>
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
        <TimeSlot>
          <div>
            <b>{formatTime(state.days)}</b> d
          </div>
        </TimeSlot>
        <TimeSlot>
          <div>
            <b>{formatTime(state.hours)}</b> h
          </div>
        </TimeSlot>
        <TimeSlot>
          <div>
            <b>{formatTime(state.minutes)}</b> m
          </div>
        </TimeSlot>
        <TimeSlot>
          <div>
            <b>{formatTime(state.seconds)}</b> s
          </div>
        </TimeSlot>
      </Timer>
    </TimerContainer>
  </div>
);
