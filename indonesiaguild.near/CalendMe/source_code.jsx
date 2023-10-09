const sourceAccountId = context.accountId;
const targetAccountId = props.accountId || sourceAccountId;
const isOwner = targetAccountId == sourceAccountId;

const dayOptions = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const dayToFullDay = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

const meetDurations = {
  "30 minutes": 1800000,
  "60 minutes": 3600000,
};

const addToGoogleCalendar = (date, details, text) => {
  const dateFormatted = date
    .toISOString()
    .replaceAll(":", "")
    .replaceAll("-", "");
  return (
    <a
      target="_blank"
      href={`https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${dateFormatted}/${dateFormatted}&details=${details}&location=&text=${text}`}
    >
      Add
    </a>
  );
};
const settings = () => {
  const meetPreference = Social.get(`${sourceAccountId}/meet_preference/**`);

  State.init({
    active_days: JSON.parse(meetPreference?.active_days ?? "[]"),
    active_hours_begin: meetPreference?.active_hours_begin ?? null,
    active_hours_end: meetPreference?.active_hours_end ?? null,
    meet_duration: meetPreference?.meet_duration ?? null,
  });

  const quarterHours = ["00"];
  const times = [];
  for (const i = 0; i < 24; i++) {
    for (const j = 0; j < quarterHours.length; j++) {
      const time = i + ":" + quarterHours[j];
      if (i < 10) {
        time = "0" + time;
      }
      times.push(time);
    }
  }

  return (
    <div className="container mx-auto">
      <div className="my-2">
        <p>Preferred Meeting Days (Current: {meetPreference.active_days})</p>
        <Typeahead
          options={dayOptions}
          multiple
          onChange={(value) => {
            State.update({ active_days: value });
          }}
          placeholder="Edit your preferred meeting days..."
        />
      </div>
      <div className="my-2">
        <p>
          Active hours begin at (UTC) (Current:{" "}
          {meetPreference.active_hours_begin})
        </p>
        <Typeahead
          options={times}
          onChange={(value) => {
            State.update({ active_hours_begin: value[0] });
          }}
          placeholder="Edit your preferred starting hour..."
        />
      </div>
      <div className="my-2">
        <p>
          Active hours stop at (UTC) (Current: {meetPreference.active_hours_end}
          )
        </p>
        <Typeahead
          options={times}
          onChange={(value) => {
            State.update({ active_hours_end: value[0] });
          }}
          placeholder="Edit your preferred last hour..."
        />
      </div>
      <div className="my-2">
        <p>Meet duration (Current: {meetPreference.meet_duration})</p>
        <Typeahead
          options={Object.keys(meetDurations)}
          onChange={(value) => {
            State.update({ meet_duration: value[0] });
          }}
          placeholder="Edit your meeting duration..."
        />
      </div>
      <CommitButton force data={{ meet_preference: state }}>
        Update
      </CommitButton>
      <p>
        Your CalendMe link:
        <a
          href={`https://near.social/indonesiaguild.near/widget/CalendMe?accountId=${sourceAccountId}`}
        >{`https://near.social/indonesiaguild.near/widget/CalendMe?accountId=${sourceAccountId}`}</a>
      </p>
    </div>
  );
};

const bookAMeet = () => {
  const meetPreference = Social.get(`${targetAccountId}/meet_preference/*`);

  if (!meetPreference) {
    return (
      <div>
        <p>
          <b>{targetAccountId}</b> is not on CalendMe yet, please invite them
          here!
        </p>
      </div>
    );
  }

  // Generating time slots
  const currentDate = new Date();

  const dates = [];
  for (const i = 0; i < 9; i++) {
    const utcString = currentDate.toUTCString();
    const splittedStr = utcString.split(" ");

    if (meetPreference.active_days.includes(splittedStr[0].slice(0, 3))) {
      dates.push(
        `${splittedStr[0]} ${splittedStr[1]} ${splittedStr[2]} ${splittedStr[3]}`
      );
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  const times = [];
  const quarterHours = ["00"];

  if (meetPreference?.meet_duration == "30 minutes") {
    quarterHours.push("30");
  }

  for (
    const i = parseInt(
      meetPreference?.active_hours_begin.substring(0, 2) ?? "0"
    );
    i < parseInt(meetPreference?.active_hours_end.substring(0, 2) ?? "0");
    i++
  ) {
    for (const j = 0; j < quarterHours.length; j++) {
      const time = i + ":" + quarterHours[j];
      if (i < 10) {
        time = "0" + time;
      }
      times.push(time);
    }
  }

  const generateTime = (date, time_slot) => {
    return new Date(`${date} ${time_slot} GMT`);
  };

  State.init({
    time_slot: null,
    date: null,
    msg: null,
  });

  return (
    <div className="container mx-auto">
      <div className="container mx-auto">
        <div className="my-2">
          <p>Select date</p>
          <Typeahead
            options={dates}
            onChange={(value) => {
              State.update({ date: value[0] });
            }}
            placeholder="Select your date..."
          />
        </div>
        <div className="my-2">
          <p>Select time slot (UTC)</p>
          <Typeahead
            options={times}
            onChange={(value) => {
              State.update({ time_slot: value[0] });
            }}
            placeholder="Select your time slot..."
          />
        </div>
        <div className="my-2">
          <p>Message</p>
          <input
            onChange={(e) => State.update({ msg: e.target.value })}
            placeholder="Hey let's meet at https://meet.google.com/xxx"
          ></input>
        </div>
        {state.date && state.time_slot && (
          <p>
            <b>Meet date:</b>{" "}
            {generateTime(state.date, state.time_slot).toUTCString()}
          </p>
        )}
        <CommitButton
          force
          data={{
            calendme: {
              [`${targetAccountId}`]: {
                [generateTime(state.date, state.time_slot).getTime()]: {
                  msg: state.msg,
                },
              },
            },
          }}
        >
          Book
        </CommitButton>
      </div>
    </div>
  );
};

const proposedCalendar = () => {
  const proposedMeets = Social.get(`${sourceAccountId}/calendme/**`) || {};

  const proposedMeetsBlocks = Object.keys(proposedMeets).map((accountId) => {
    return Object.keys(proposedMeets[accountId]).map((timeStamp) => (
      <tr>
        <td>
          <Widget
            src="mob.near/widget/N.ProfileLine"
            props={{
              accountId: accountId,
              link: false,
              hideAccountId: true,
              hideImage: false,
            }}
          />
        </td>
        <td>{proposedMeets?.[accountId]?.[timeStamp]?.msg ?? null}</td>

        <td>{new Date(parseInt(timeStamp)).toUTCString()}</td>
        <td>
          {addToGoogleCalendar(
            new Date(parseInt(timeStamp)),
            proposedMeets?.[accountId]?.[timeStamp]?.msg,
            `Meet with ${accountId}`
          )}
        </td>
      </tr>
    ));
  });

  return (
    <div>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th>To Account</th>
            <th>Message</th>
            <th>Date</th>
            <th>Add To Google Calendar</th>
          </tr>
        </thead>
        <tbody>{proposedMeetsBlocks}</tbody>
      </table>
    </div>
  );
};

const receivedCalendar = () => {
  const accountsHaveCal =
    Social.keys(`*/calendme/${sourceAccountId}`, "final", {}) || {};

  const allProposedMeets = [];

  Object.keys(accountsHaveCal).map((accountId) => {
    allProposedMeets.push({
      [accountId]: Social.get(`${accountId}/calendme/${sourceAccountId}/**`),
    });
  });

  const proposedMeetsBlocks = allProposedMeets.map((proposedMeets) => {
    return Object.keys(proposedMeets).map((accountId) => {
      return Object.keys(proposedMeets[accountId]).map((timeStamp) => (
        <tr>
          <td>
            <Widget
              src="mob.near/widget/N.ProfileLine"
              props={{
                accountId: accountId,
                link: false,
                hideAccountId: true,
                hideImage: false,
              }}
            />
          </td>
          <td>{proposedMeets?.[accountId]?.[timeStamp]?.msg ?? null}</td>
          <td>{new Date(parseInt(timeStamp)).toUTCString()}</td>
          <td>
            {addToGoogleCalendar(
              new Date(parseInt(timeStamp)),
              proposedMeets?.[accountId]?.[timeStamp]?.msg,
              `Meet with ${accountId}`
            )}
          </td>
        </tr>
      ));
    });
  });

  return (
    <div>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th>From Account</th>
            <th>Message</th>
            <th>Date</th>
            <th>Add To Google Calendar</th>
          </tr>
        </thead>
        <tbody>{proposedMeetsBlocks}</tbody>
      </table>
    </div>
  );
};

if (!sourceAccountId) {
  return (
    <>
      <h1>Please Login before using CalendMe!</h1>
    </>
  );
}
return (
  <>
    <h1>Hey {sourceAccountId}, welcome to CalendMe!</h1>
    <hr />
    {isOwner ? (
      <>
        <h2>Your Settings</h2>
        <hr />
        {settings()}
        <hr />

        <h2>Your Meets</h2>
        <hr />
        {proposedCalendar()}
        <hr />
        {receivedCalendar()}
      </>
    ) : (
      <>
        <h2>Book a meet with {targetAccountId}</h2>
        <hr />
        {bookAMeet()}
      </>
    )}
  </>
);
