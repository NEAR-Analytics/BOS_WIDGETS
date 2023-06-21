const widgetOwner = "kenrou-it.near";

return (
  <CommitButton
    data={{
      index: {
        kenrou_testing: JSON.stringify(
          {
            key: "kenrou-teaching",
            value: {
              text: "Hope you are learning",
              date: Date.now(),
              students: 2,
            },
          },
          undefined,
          0
        ),
      },
    }}
  >
    Click me
  </CommitButton>
);
