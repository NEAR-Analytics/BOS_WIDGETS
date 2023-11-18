const Wrapper = styled.div`
  .shadow-xl {
    --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / .1), 0 8px 10px -6px rgb(0 0 0 / .1);
    --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow);
  }

  .bg-base-100 {
    --tw-bg-opacity: 1;
    background-color: var(--fallback-b1,oklch(var(--b1)/var (--tw-bg-opacity)));
 }
 .w-96 {
    width: 24rem;
}
.card {
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: var(--rounded-box,1rem);
}
.card-body {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    padding: var(--padding-card,2rem);
    gap: 0.5rem;
}
.card-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 600;
}
.card-body :where(p) {
    flex-grow: 1;
}
.justify-end {
    justify-content: flex-end;
}
.card-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 0.5rem;
}

`;

const buttonTitle = props.buttonTitle || "Button Title";
const title = props.title || "Title";
const desc = props.desc || "Description";
const idx = props.idx || 0;
const imgURL =
  props.imgURL ||
  "https://raw.githubusercontent.com/gonzalobarria/testpub/master/images/ppd-lila.jpg";
const action = props.action;

return (
  <Wrapper>
    <div class="card w-96 bg-base-100 shadow-xl">
      <img src={imgURL} alt={title} />
      <div class="card-body">
        <h2 class="card-title">{title}</h2>
        <p>{desc}</p>
        <div class="justify-end card-actions">
          <button class="btn btn-primary" onClick={action}>
            {buttonTitle}
          </button>
        </div>
      </div>
    </div>
  </Wrapper>
);
