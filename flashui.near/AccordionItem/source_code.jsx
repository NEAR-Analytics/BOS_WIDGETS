let title = props.title;
let content = props.content;
let show = props.show || false;

function generateUUID() {
  let uuid = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      uuid += "-";
    } else if (i === 14) {
      uuid += "4";
    } else if (i === 19) {
      uuid += characters[(Math.random() * 4) | 8];
    } else {
      uuid += characters[Math.floor(Math.random() * 16)];
    }
  }
  return uuid;
}
const itemId = generateUUID();

return (
  <>
    {
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class={
              show == true ? "accordion-button" : "accordion-button collapsed"
            }
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#${itemId}`}
            aria-expanded="true"
            aria-controls={`${itemId}`}
          >
            {title}
          </button>
        </h2>
        <div
          id={`${itemId}`}
          class={
            show == true
              ? "accordion-collapse collapse show"
              : "accordion-collapse collapse"
          }
        >
          <div class="accordion-body">{content}</div>
        </div>
      </div>
    }
  </>
);
