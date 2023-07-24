State.init({
  higriDate: higriDatee,
  selectedOption: "",
  isOpen: false,
  date: "",
  location: "",
  prayers: {},
  upcomingPrayerName: "...",
  upcomingPrayerTime: "",
  countdown: "00:00:00",
});

// today's date formatted
const date = new Date();

const currentDay = ("0" + date.getDate()).slice(-2);
const currentMonth = ("0" + (date.getMonth() + 1)).slice(-2); //
const currentYear = date.getFullYear();

const currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
const currentDateReversedFormat = `${currentYear}-${currentMonth}-${currentDay}`;

const calcUpcomingPrayer = (prayers) => {
  // calc upcoming salah
  const time =
    ("0" + date.getHours()).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2);

  const prayerNames = Object.keys(prayers);
  for (let i = 0; i < prayerNames.length; i++) {
    const prayTime = prayers[prayerNames[i]];
    let countdownDate = new Date(`${currentDateReversedFormat}T${prayTime}`);

    if (time < prayTime) {
      return State.update({
        upcomingPrayerName: prayerNames[i],
        upcomingPrayerTime: countdownDate,
      });
    }

    if (prayerNames[i] === "Isha") {
      // set upcoming pray to Fajr(tomorrow)
      const fagrPrayer = prayers["Fajr"];
      countdownDate = new Date(`${currentDateReversedFormat}T${fagrPrayer}`);
      var day = 60 * 60 * 24 * 1000;
      const newDay = new Date(countdownDate.getTime() + day);
      return State.update({
        upcomingPrayerName: "Fajr",
        upcomingPrayerTime: newDay,
      });
    }
  }
};
const setCountDown = () => {
  if (state.upcomingPrayerTime) {
    // Calculate the time difference in milliseconds
    var timeDiff = Math.abs(
      state.upcomingPrayerTime.getTime() - date.getTime()
    );

    // Calculate the difference in hours, minutes, and seconds
    var diffHours = Math.floor(timeDiff / (1000 * 3600));
    var diffMinutes = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));
    var diffSeconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    var formattedDiff =
      ("0" + diffHours).slice(-2) +
      ":" +
      ("0" + diffMinutes).slice(-2) +
      ":" +
      ("0" + diffSeconds).slice(-2);

    State.update({
      countdown: formattedDiff,
    });
    calcUpcomingPrayer(state.prayers);
  }
  setTimeout(setCountDown, 1000);
};
setCountDown();
const options = [
  { label: "Muslim World League", value: "3" },
  { label: "Islamic Society of North America (ISNA)", value: "2" },
  { label: "Egyptian General Authority of Survey", value: "5" },
  { label: "Umm Al-Qura University, Makkah", value: "4" },
  { label: "University of Islamic Sciences, Karachi", value: "1" },
  {
    label: "Institute of Geophysics, University of Tehran",
    value: "7",
  },
  { label: "Shia Ithna-Ashari, Leva Institute, Qum", value: "0" },
  { label: "Gulf Region", value: "8" },
  { label: "Kuwait", value: "9" },
  { label: "Qatar", value: "10" },
  { label: "Majlis Ugama Islam Singapura, Singapore", value: "11" },
  { label: "Union Organization Islamic de France", value: "12" },
  {
    label: "Diyanet \u0130\u015fleri Ba\u015fkanl\u0131\u011f\u0131, Turkey",
    value: "13",
  },
  {
    label: "Spiritual Administration of Muslims of Russia",
    value: "14",
  },
  {
    label: "Moonsighting Committee Worldwide",
    value: "15",
  },
  { label: "Dubai", value: "16" },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
`;
const Location = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #54433a;
  justify-content: space-between;
  text-align: center;
  gap: 0.25rem;
`;
const City = styled.div`
  font-weight: 700;
`;
const CurrentPrayer = styled.div`
  font-weight: 700;
  text-align: center;
  margin-top: 1rem;
`;
const PrayerTime = styled.div`
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.75rem;
  text-align: center;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 2rem;
  padding-right: 2rem;
  background-color: #fdb28b;
  border-radius: 0.375rem;
  overflow: hidden;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  position: relative;
`;
const Label = styled.div`
  font-weight: 700;
  color: #54433a;
`;
const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const SelectButton = styled.div`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  padding: 4px 0px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const OptionItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  :hover {
    background-color: #fee7dc;
  }
`;
const PrayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;
const Prayer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const PrayerName = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
`;
const handleSelectClick = () => {
  State.update({ isOpen: !state.isOpen });
};

const handleOptionClick = async (option) => {
  State.update({ isOpen: false, selectedOption: option });

  const res = asyncFetch(
    "https://api.geoapify.com/v1/ipinfo?&apiKey=0485481476634b4d98f7d337d4821f52"
  )
    .then((data) => {
      const { longitude, latitude } = data.body.location;
      State.update({
        location: data.body.city.name + ", " + data.body.country.name,
      });
      return asyncFetch(
        `https://api.aladhan.com/v1/timings/17-07-2007?latitude=${latitude}&longitude=${longitude}&method=${option}`
      );
    })
    .then((data) => {
      const { timings, date } = data.body.data;
      const higriDate = `${date.hijri.weekday.en},${date.hijri.month.en}, ${date.hijri.year}`;

      const prayers = {
        Fajr: timings.Fajr,
        Sunrise: timings.Sunrise,
        Dhuhr: timings.Dhuhr,
        Asr: timings.Asr,
        Maghrib: timings.Maghrib,
        Isha: timings.Isha,
      };
      calcUpcomingPrayer(prayers);
      State.update({ prayers: prayers, date: higriDate });
    })
    .catch((err) => console.log(err));
};

return (
  <Container>
    <Location>
      <City>{state.location}</City>
      <div>{state.date}</div>
    </Location>

    <CurrentPrayer>{state.upcomingPrayerName} is in</CurrentPrayer>
    <PrayerTime key={state.countdown}>{state.countdown}</PrayerTime>
    <Container>
      <Label>Prayer time conventions</Label>
      <SelectContainer>
        <SelectButton
          onClick={handleSelectClick}
          style={{
            color: state.selectedOption ? "#000" : "#BCA79D",
          }}
        >
          {state.selectedOption ? state.selectedOption.label : "Select"}
          <svg
            style={{ transform: `rotate(${state.isOpen ? "180deg" : "0"})` }}
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
          </svg>
        </SelectButton>
        {state.isOpen && (
          <DropdownContainer>
            {options.map((option) => (
              <OptionItem
                key={option.value}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </OptionItem>
            ))}
          </DropdownContainer>
        )}
      </SelectContainer>
    </Container>
    <PrayerContainer>
      {state.selectedOption &&
        Object.keys(state.prayers).map((key) => (
          <Prayer key={key}>
            <PrayerName>
              <svg
                fill="#fdb28b"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
              </svg>

              {key}
            </PrayerName>
            <div>{state.prayers[key]}</div>
          </Prayer>
        ))}
    </PrayerContainer>
  </Container>
);
