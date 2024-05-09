const {
  CardStyle,
  CardTitleStyle,
  NewButtonStyle,
  CardActionButtonStyle,
  CardLabelStyle,
} = VM.require("silkking.near/widget/homeStyles");

function renderColumn(
  columnId,
  col,
  onDragStart,
  onDragOver,
  onDragEnd,
  newCardCallBack
) {
  return (
    <div data-column={columnId}>
      <CardTitleStyle data-column={columnId}>
        {col.title} ({col.cards.length})
        {col.newCard ? (
          <CardStyle data-column={columnId}>
            <CardTitleStyle>New Card</CardTitleStyle>
            <CardLabelStyle>Title</CardLabelStyle>
            <input
              type="text"
              data-action="title"
              onChange={(e) => newCardCallBack(e, e.target.value)}
            ></input>
            <br />
            <CardLabelStyle>Content</CardLabelStyle>
            <input
              type="text"
              data-action="content"
              onChange={(e) => newCardCallBack(e, e.target.value)}
            ></input>
            <br />
            <NewButtonStyle
              data-column={columnId}
              data-action="ok"
              onClick={newCardCallBack}
            >
              Ok
            </NewButtonStyle>
            <NewButtonStyle
              data-column={columnId}
              data-action="cancel"
              onClick={newCardCallBack}
            >
              Cancel
            </NewButtonStyle>
          </CardStyle>
        ) : col.allowCardCreation ? (
          <NewButtonStyle
            data-column={columnId}
            data-action="new"
            onClick={newCardCallBack}
          >
            +
          </NewButtonStyle>
        ) : (
          ""
        )}
      </CardTitleStyle>

      {col.cards.map((card, index) => {
        return (
          <CardStyle
            id={"card_" + columnId + "_" + index}
            data-column={columnId}
            data-card={index}
            draggable
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
            key={index}
          >
            <b data-column={columnId} data-card={index}>
              {card.title}
            </b>
            <br />
            <p data-column={columnId} data-card={index}>
              {card.content}
            </p>
            <br />
            {card.action ? (
              <CardActionButtonStyle
                data-column={columnId}
                data-card={index}
                onClick={card.action.callBack}
              >
                {card.action.text}
              </CardActionButtonStyle>
            ) : (
              ""
            )}
          </CardStyle>
        );
      })}
    </div>
  );
}

return { renderColumn };
