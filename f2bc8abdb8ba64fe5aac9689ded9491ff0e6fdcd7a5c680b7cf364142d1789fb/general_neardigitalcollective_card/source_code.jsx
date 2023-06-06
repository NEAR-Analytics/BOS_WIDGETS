const cardData = props.cardData ?? {
  accountId: "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
  blockHeight: 83806538,
  value: {
    isDraft: false,
    title: "Last test?",
    description: "Is this the last test?",
    tgLink: "",
    startTimestamp: 1674701520000,
    endTimestamp: 1674787920000,
    questions: [
      {
        question: "What do you think?",
        questionType: "0",
        choicesOptions: ["Yes", "No"],
      },
      {
        question: "Why?",
        questionType: "1",
        choicesOptions: [
          "Because it can't be other way",
          "Because i'm sure",
          "Why not?",
        ],
      },
      {
        question: "Multiselect?",
        questionType: "2",
        choicesOptions: ["1", "2", "3"],
      },
      {
        question: "Give me a feedback",
        questionType: "3",
        choicesOptions: [],
      },
    ],
    timestamp: 1674701636048,
  },
};

const formatCard = props.formatCard ?? {
  row1: {
    rowType: "markdown",
    contentData: "data",
  },
  row2: {
    rowType: "text",
    contentData: "data2",
  },
  row3: {
    rowType: "flex",
    flexClassName: "justify-content-between border rounded p-3",
    contentData: [
      {
        type: "flex",
        flexClassName: "flex-column justify-content-start align-items-center",
        style: {
          width: "33%",
        },
        content: [
          {
            type: "text",
            value: "Created by",
            style: {
              width: "33%",
            },
          },
          {
            type: "key",
            value: "accountId",
            style: {
              width: "33%",
              textOverflow: "ellipsis",
              overflow: "hidden",
            },
          },
        ],
      },
      {
        type: "flex",
        flexClassName: "flex-column justify-content-start align-items-center",
        style: {
          width: "33%",
        },
        content: [
          {
            type: "text",
            value: "Started",
            style: {
              width: "33%",
            },
          },
          {
            type: "timeStampKey",
            value: "startTimestamp",
            style: {
              width: "33%",
            },
          },
        ],
      },
      {
        type: "flex",
        flexClassName: "flex-column justify-content-start align-items-center",
        style: {
          width: "33%",
          textOverflow: "ellipsis",
          overflow: "hidden",
        },
        content: [
          {
            type: "text",
            value: "Ended",
            style: {
              width: "33%",
            },
          },
          {
            type: "timeStampKey",
            value: "endTimestamp",
            style: {
              width: "33%",
            },
          },
        ],
      },
    ],
  },
};

return (
  <div>
    {Object.keys(formatCard).map((rowKey) => {
      let rowData = formatCard[rowKey];
      if (rowData.rowType == "markdown") {
        return <Markdown text={rowData.contentData} />;
      } else if (rowData.rowType == "text") {
        return (
          <p style={rowData.style ? rowData.style : {}}>
            {rowData.contentData}
          </p>
        );
      } else if (rowData.rowType == "timeStampKey") {
        return (
          <p style={rowData.style ? rowData.style : {}}>
            {new Date(cardData.value[secondItem.value]).toLocaleDateString(
              [],
              dateFormatOptions
            )}
          </p>
        );
      } else if (rowData.rowType == "flex") {
        return (
          <div
            className={`d-flex ${rowData.flexClassName}`}
            style={rowData.style ? rowData.style : {}}
          >
            {rowData.contentData.map((item) => {
              if (item.type == "markdown") {
                return <Markdown text={item.content} />;
              } else if (item.type == "text") {
                return (
                  <p style={item.style ? item.style : {}}>{item.content}</p>
                );
              } else if (item.type == "flex") {
                return (
                  <div
                    className={`d-flex ${item.flexClassName}`}
                    style={item.style ? item.style : {}}
                  >
                    {item.content.map((secondItem) => {
                      console.log(secondItem);
                      if (secondItem.type == "markdown") {
                        return <Markdown text={secondItem.value} />;
                      } else if (secondItem.type == "text") {
                        return (
                          <p style={secondItem.style ? secondItem.style : {}}>
                            {secondItem.value}
                          </p>
                        );
                      } else if (secondItem.type == "timeStampKey") {
                        return (
                          <p style={secondItem.style ? secondItem.style : {}}>
                            {new Date(
                              cardData.value[secondItem.value]
                            ).toLocaleDateString([], dateFormatOptions)}
                          </p>
                        );
                      } else if (secondItem.type == "key") {
                        return (
                          <p style={secondItem.style ? secondItem.style : {}}>
                            {cardData[secondItem.value]}
                          </p>
                        );
                      } else {
                        return (
                          <p className="text-danger">Error passing data</p>
                        );
                      }
                    })}
                  </div>
                );
              } else {
                return <p className="text-danger">Error passing data</p>;
              }
            })}
          </div>
        );
      } else if (rowData.rowType == "timeStampKey") {
        return (
          <p style={rowData.style ? rowData.style : {}}>
            {new Date(cardData[rowData.value]).toLocaleDateString(
              [],
              dateFormatOptions
            )}
          </p>
        );
      } else {
        return <p className="text-danger">Error passing data</p>;
      }
    })}
  </div>
);
