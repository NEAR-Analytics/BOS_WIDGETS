const { renderColumn } = VM.require("silkking.near/widget/column");
const { ColumnStyle } = VM.require("silkking.near/widget/homeStyles");

const { columns } = props;

/* ************************ */
/*        Variables         */
/* ************************ */
// Columnas a generar
/*  Estructura

     {
        title : string
        allowCardCreation : bool
        cards : [
            title: string,
            content : string
            action {
                text: string (button text)
                callBack: callbackmethod / javascript
            }
        ]
    }

    */

/* ************************ */
/* Funciones del componente */
/* ************************ */

// Dragging ------------------
var objectOverOn;

function onDragStart(e) {
  console.log(e);
}

function onDragOver(e) {
  objectOverOn = e.target;
  e.preventDefault();
}

function onDragEnd(e) {
  var o = objectOverOn;
  if (o != undefined) {
    const colDestino = o.dataset.column;
    const colOrigen = e.target.dataset.column;
    const cardIndex = e.target.dataset.card;
    if (!isNaN(colDestino)) {
      if (colOrigen != colDestino) {
        var cc = currentColumns;
        const movedCard = cc[colOrigen].cards.splice(cardIndex, 1);
        cc[colDestino].cards.push(movedCard[0]);
        setColumns(cc);
      } else console.log("Dropped on same column", o);
    } else console.log("No droppable destination", o);
  } else console.log("No destination", o);
  objectOverOn = null;
}

// New Card ------------------
function newCardCallBack(e, data) {
  const o = e.target;
  const colDestino = o.dataset.column;
  var cc = currentColumns;
  switch (o.dataset.action) {
    case "new":
      setNewCardTitle(null);
      setNewCardContent(null);
      for (var n = 0; n < cc.length; n++) {
        cc[n].newCard = false;
      }
      cc[colDestino].newCard = true;
      break;
    case "title":
      setNewCardTitle(data);
      break;
    case "content":
      setNewCardContent(data);
      break;
    case "ok":
      const newCard = { title: newCardTitle, content: newCardContent };
      cc[colDestino].cards.push(newCard);
      cc[colDestino].newCard = false;
      break;
    case "cancel":
      cc[colDestino].newCard = false;
      break;
  }
  setColumns(cc);
}

// State ------------------
const [currentColumns, setColumns] = useState(columns);
const [newCardTitle, setNewCardTitle] = useState("");
const [newCardContent, setNewCardContent] = useState("");

// Rendering ------------------
var c = columns.length;
const w = "calc(" + (100 / c).toFixed(2).toString() + "% - 20px)";

return (
  <div id="divMaster">
    {currentColumns.map((col, index) => {
      return (
        <ColumnStyle onDragOver={onDragOver} style={{ width: w }} key={index}>
          {renderColumn(
            index,
            col,
            onDragStart,
            onDragOver,
            onDragEnd,
            newCardCallBack
          )}
        </ColumnStyle>
      );
    })}
  </div>
);
