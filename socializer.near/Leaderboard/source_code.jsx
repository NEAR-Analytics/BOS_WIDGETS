const Owner = "socializer.near";
const accountId = context.accountId;
const API_URL = props?.API_URL || "http://localhost:3000";

const UserOptions = [
  {
    text: "users",
    value: "users",
  },
  {
    text: "Creators",
    value: "creators",
  },
];

const TimeOptions = [
  {
    text: "Monthly",
    value: "monthly",
  },
  {
    text: "Weekly",
    value: "weekly",
  },
  {
    text: "All-Time",
    value: "all",
  },
];

State.init({
  menu: { value: "users" },
  time: { value: "monthly" },
});

const selectMenu = (data, key) => {
  State.update({ [key]: data });
};

return (
  <div>
    <div className="d-flex" style={{ gap: 20 }}>
      <h3>Leader Board : </h3>
      <Widget
        props={{
          API_URL,
          noLabel: true,
          options: UserOptions,
          value: state.menu,
          onChange: (data) => selectMenu(data, "menu"),
        }}
        src={`${Owner}/widget/Select`}
      />
    </div>
    <Widget
      props={{
        API_URL,
        noLabel: true,
        options: TimeOptions,
        value: state.time,
        onChange: (data) => selectMenu(data, "time"),
      }}
      src={`${Owner}/widget/Select`}
    />
  </div>
);
