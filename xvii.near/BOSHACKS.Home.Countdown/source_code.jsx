const startTime = props.startTime ?? 1709046000000; // NCR Course Start Time
const endTime = props.endTime ?? 1670880000000; // Final Project Submission Deadline
const tupe = props.type ?? "";
// const time = Near.view("nominations.ndc-gwg.near", "active_time", {});
// console.log("Time:" + time);
// console.log("Start time: " + time[0]);
// console.log("End time: " + time[1]);
State.init({
  days: "-",
  hours: "-",
  minutes: "-",
  seconds: "-",
  title: "",
});

const widgets = {
  styledComponents: "nomination.ndctools.near/widget/NDC.StyledComponents",
};

const formatTime = (time) => (time < 10 ? `0${time}` : time);

const timer = setInterval(() => {
  const now = new Date().getTime();
  const start = new Date(parseInt(startTime)).getTime();
  const end = new Date(parseInt(endTime)).getTime();
  let title = "";

  let diff;
  if (now < start)
    diff = new Date(parseInt(start)).getTime() - new Date().getTime();
  else if (now > start && now < end)
    diff = new Date(parseInt(end)).getTime() - new Date().getTime();
  else diff = 0;

  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (now < start) title = <>NCR Course Starts</>;
  else if (now > start && now < end) title = <>Final Project Submission</>;
  else {
    title = <>{type} Course has begun</>;
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
  }

  State.update({
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    title: title,
  });

  clearInterval(timer);
}, 1000);

const H1 = styled.h1`
  font-size: ${(props) => (props.mobile ? "30px" : "40px")};
  font-weight: 500;
  margin-bottom: 0;
  text-transform: capitalize;
`;

const H6 = styled.h6`
  font-size: 12px;
  font-weight: 300;
  margin-right: 32px;
  margin-bottom: 0;
  line-height: 1.5;
  align-items: center;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  width: ${(props) => (props.mobile ? "100%" : "130px")};
`;

const Timer = styled.div`
  .time {
    font-size: 48px;
    font-weight: 800;
    color: #ffd50d;
    width: 100px;
    line-height: 1;
  }
  small {
    margin-bottom: 0;
    align-items: center;
  }
`;

const TimerContainer = styled.div`
  .time {
    font-size: 48px;
    font-weight: 700;
    color: #ffffff;
    width: 100px;
    line-height: 1;
  }
  small {
    margin-bottom: 0;
    align-items: center;
  }
`;

const SmallTimerContainer = styled.div`
  background: #ffd50d;

  .time {
    font-size: 36px;
    font-weight: 700;
    color: #000;
    width: 70px;
    line-height: 1;
  }
  small {
    margin-bottom: 0;
    align-items: center;
    color: grey;
  }
`;

const Info = styled.div`
  background: #6393F8;
`;

const TimerContent = ({ mobile }) => {
  const TimeSlot = ({ time, title, mobile }) => (
    <div className={`${mobile ? "text-center" : ""}`}>
      <div className="time">{formatTime(time)}</div>
      <small>{title}</small>
    </div>
  );

  return (
    <>
      <H6 mobile={mobile} className={`${mobile ? "m-0 mb-3 text-center" : ""}`}>
        {state.title}
      </H6>
      <Timer className="d-flex" mobile={mobile}>
        <TimeSlot title="days" time={state.days} />
        <TimeSlot title="hours" time={state.hours} />
        <TimeSlot title="minutes" time={state.minutes} />
        <TimeSlot title="seconds" time={state.seconds} />
      </Timer>
    </>
  );
};

const InfoBlock = ({ mobile }) => (
  <Info
    className={`py-2 d-flex justify-content-center align-items-center gap-2 ${
      mobile ? "" : "rounded-bottom"
    }`}
  >
    <b className={`mb-0 ${mobile ? "w-50" : ""}`}>Learn about the NRC DAO:</b>
    <div>
      <Widget
        src={widgets.styledComponents}
        props={{
          Link: {
            text: "What is the NRC?",
            size: "sm",
            style: { backgroundColor: "black", color: "white" }, // Inline styles
            href: "https://marmaj.org/inside-the-near-research-collective-blockchain-elevated/",
          },
        }}
      />
    </div>
  </Info>
);

return (
  <div>
    <div className="d-none d-lg-flex flex-column">
      <div className="p-4 bg-black text-white d-lg-flex rounded-top justify-content-between align-items-center">
        <div className="d-flex align-items-center"></div>
        <TimerContainer className="d-flex align-items-center">
          <TimerContent />
        </TimerContainer>
      </div>
      <InfoBlock />
    </div>
    <div className="d-md-flex d-lg-none d-xl-none">
      <div className="row">
        <div className="d-flex bg-black align-items-center justify-content-center bg-black text-white"></div>
        <SmallTimerContainer className="d-flex flex-column p-3 align-items-center justify-content-between">
          <TimerContent mobile />
        </SmallTimerContainer>
        <InfoBlock mobile />
      </div>
    </div>
  </div>
);
