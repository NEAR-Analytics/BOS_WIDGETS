const widgetOwner =
  props.widgetOwner ??
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";

const handlerStateUpdate = props.handlerStateUpdate;
const navegateTo = props.navegateTo;

const cardHeaderWidgetName =
  props.cardHeaderWidgetName ?? "minimalistQuestionHeader";
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
  body: {
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
          flexClassName:
            "flex-column justify-content-start align-items-center border-right",
          style: { width: "33%" },
          content: [
            {
              type: "text",
              value: "Created by",
            },
            {
              type: "key",
              value: ["accountId"],
              style: {
                maxWidth: "100%",
                textOverflow: "ellipsis",
                overflow: "hidden",
                textWrap: "nowrap",
              },
            },
          ],
        },
        {
          type: "flex",
          flexClassName:
            "flex-column justify-content-start align-items-center border-right",
          style: { width: "33%" },
          content: [
            {
              type: "text",
              value: "Started",
            },
            {
              type: "timeStampKey",
              value: "startTimestamp",
            },
          ],
        },
        {
          type: "flex",
          flexClassName:
            "flex-column justify-content-start align-items-center border-right",
          style: {
            width: "33%",
          },
          content: [
            {
              type: "text",
              value: "Ended",
            },
            {
              type: "timeStampKey",
              value: "endTimestamp",
            },
          ],
        },
      ],
    },
  },
  footer: {},
};

const footerFormat = props.footerFormat ?? {
  comment: {
    status: true,
    key: "kudo",
    path: "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/Kudos",
    pushDataModel:
      '{"kudo":"{\\"key\\":\\"commentAnswers\\",\\"value\\":{\\"commentAnswer\\":\\"\\",\\"blockHeight\\":0}}"}',
  },
  repost: {
    status: true,
  },
  upVoteButton: {
    status: true,
    pushDataModel:
      '{"kudo":"{\\"key\\":\\"upvote\\",\\"value\\":{\\"blockHeight\\":0}}"}',
  },
  shareWidget: {
    status: true,
    popUpDescription: "Use this link to share the kudo",
    shareingWidget: "Kudos.Styles",
    propName: "sharedBlockHeight",
  },
};

function getValue(object, path) {
  let lastStepValue = object;
  for (let i = 0; i < path.length; i++) {
    lastStepValue = lastStepValue[path[i]];
  }
  return lastStepValue;
}

return (
  <div className="col-sm-12 col-lg-6 col-2xl-4 gy-3">
    <div
      className="card h-100"
      onClick={
        navegateTo
          ? () =>
              handlerStateUpdate({
                tab: navegateTo,
                postBlockHeight: cardData.blockHeight,
              })
          : () => {}
      }
      style={navegateTo ? { cursor: "pointer" } : {}}
    >
      <Widget
        src={`${widgetOwner}/widget/${cardHeaderWidgetName}`}
        props={{ ...cardData }}
      />
      <div className="card-body">
        {Object.keys(formatCard.body).map((rowKey) => {
          let rowData = formatCard.body[rowKey];
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
          } else if (rowData.rowType == "key") {
            return (
              <p style={rowData.style ? rowData.style : {}}>
                {getValue(rowData, rowData.contentData)}
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
                              <p
                                style={secondItem.style ? secondItem.style : {}}
                              >
                                {secondItem.value}
                              </p>
                            );
                          } else if (secondItem.type == "timeStampKey") {
                            return (
                              <p
                                style={secondItem.style ? secondItem.style : {}}
                              >
                                {new Date(
                                  cardData.value[secondItem.value]
                                ).toLocaleDateString([], dateFormatOptions)}
                              </p>
                            );
                          } else if (secondItem.type == "key") {
                            return (
                              <p
                                style={secondItem.style ? secondItem.style : {}}
                              >
                                {getValue(cardData, secondItem.value)}
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
      <Widget
        src={`${widgetOwner}/widget/general_neardigitalcollective_footer`}
        props={{ ...cardData, footerFormat }}
      />
    </div>
  </div>
);
