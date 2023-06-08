const widgetOwner =
  props.widgetOwner ??
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";

const isOwnAccountId = props.isOwnAccountId;
const tabs = props.tabs;
const prevTab = props.prevTab;
const handlerStateUpdate = props.handlerStateUpdate;
const navegateTo = props.navegateTo;

const cardHeaderWidgetName =
  props.cardHeaderWidgetName ?? "minimalistQuestionHeader";

const cardsData = props.cardsData;
const sectionText = props.sectionText ?? "All Schedules";

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

if (isOwnAccountId) {
  cardsData = cardsData.filter(
    (cardData) => cardData.accountId == context.accountId
  );
}

return (
  <div className="row card-group py-3">
    {sectionText && <h5>{sectionText}</h5>}
    {cardsData.map((cardData) => {
      return (
        <>
          <Widget
            src={`${widgetOwner}/widget/general_neardigitalcollective_card`}
            props={{
              cardHeaderWidgetName,
              widgetOwner,
              cardData,
              handlerStateUpdate,
              navegateTo,
              formatCard,
            }}
          />
        </>
      );
    })}
  </div>
);
