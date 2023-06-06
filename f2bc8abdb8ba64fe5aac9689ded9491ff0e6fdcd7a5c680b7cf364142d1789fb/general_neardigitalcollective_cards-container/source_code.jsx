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
const contentWidgetName =
  props.contentWidgetName ?? "minimalistQuestionGeneralInfo";

const cardsData = props.cardsData;
const sectionTtext = props.sectionTtext ?? "All Schedules";

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
            value: "accountId",
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
};

if (isOwnAccountId) {
  cardsData = cardsData.filter(
    (cardData) => cardData.accountId == context.accountId
  );
}

return (
  <div className="row card-group py-3">
    {sectionTtext && <h5>{sectionTtext}</h5>}
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
