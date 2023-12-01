const simpleBetAccountId = "simplebet.near";
const defaultValue = "1";

function getEvents() {
  return Near.view(simpleBetAccountId, "events");
}

function toNear(yoctoNear) {
  if (yoctoNear.length < 25) {
    yoctoNear = "0".repeat(25 - yoctoNear.length) + yoctoNear;
  }
  let len = yoctoNear.length;
  let big = yoctoNear.slice(0, len - 24);
  let small = yoctoNear.slice(len - 24, len - 24 + 5);
  return big + "." + small;
}

function getCurrentTimestamp() {
  return Date.now();
}

function humanizeDelta(when) {
  let current = Date.now();

  let delta = current / 1000 - when / 1000000000;

  if (delta < 60) {
    return `${Math.round(delta)} seconds ago`;
  }

  delta /= 60;

  if (delta < 60) {
    return `${Math.round(delta)} minutes ago`;
  }

  delta /= 60;

  if (delta < 24) {
    return `${Math.round(delta)} hours ago`;
  }

  delta /= 24;

  return `${Math.round(delta)} days ago`;
}

let events = getEvents();
events = events.reverse();

const Wrapper = styled.div`
  margin: 0 -12px;
  line-height: normal;
  
  .post {
    position: relative;
    padding: 12px;
    padding-bottom: 4px;
    display: flex;
    h1, h2, h3, h4, h5, h6 {
      font-size: 16px !important;
    }
    @media(max-width: 767px) {
      font-size: 15px !important;
      h1, h2, h3, h4, h5, h6 {
        font-size: 15px !important;
      }
    }

    h1, h2, h3, h4, h5, h6, strong, b {
      font-weight: 500 !important;
    }
    ol, ul, dl {
      margin-bottom: 0.5rem;
      white-space: inherit;
    }
    p {
      margin-bottom: 0.5rem;
    }
    hr {
      display: none;
    }
    img {
      border-radius: var(--bs-border-radius-lg);
      max-height: 40em;
    }
    th {
      min-width: 5em;
    }

    .table>:not(caption)>*>* {
      padding: .3rem;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.03);
      .expand-post {
        background-image : linear-gradient(to bottom, 
                      rgba(0,0,0, 0), 
                      rgba(247.35,247.35,247.35, 1) 25%);
      }
    }

    .post-header {
      margin: 4px 0;
    }
  }

  .post:not(:last-child):before {
    content: "";
    position: absolute;
    left: 30px;
    top: 56px;
    bottom: 0;
    width: 2px;
    background-color: #ddd;
    z-index: -1;
  }

  .post:not(:first-child):after {
    content: "";
    position: absolute;
    left: 30px;
    top: 0;
    width: 2px;
    height: 8px;
    background-color: #ddd;
    z-index: -1;
  }
  
  .left {
    margin-right: 12px;
    min-width: 40px;
    width: 40px;
    overflow: hidden;
  }
  .right {
    margin-top: -4px;
    flex-grow: 1;
    min-width: 0;
  }

  .buttons-placeholder {
    padding-bottom: 10px;
  }

  .buttons {
    margin-top: 10px;
    margin-bottom: 6px;
    column-gap: 4px;
    color: #888;
  }

  .reposted {
    padding-top: 30px;
  }
`;

function styledResult(result, amount) {
  if (result === "Lose") {
    return `💸 Lost ${amount} Ⓝ`;
  } else {
    return `🤑 Won ${amount} Ⓝ`;
  }
}

function color(result) {
  if (result === "Lose") {
    return "red";
  } else {
    return "green";
  }
}

return (
  <>
    {events.map(({ bettor, result, bet, timestamp }) => (
      <Wrapper
        style={
          props.hideComments || props.noBorder
            ? undefined
            : {
                borderBottom: "1px solid #eee",
              }
        }
      >
        <div className={`post ${props.reposted ? "reposted" : ""}`}>
          <div className="left">
            <Widget
              loading=""
              src="mob.near/widget/MainPage.N.Post.Left"
              props={{ accountId: bettor }}
            />
          </div>
          <div className="right">
            <Widget
              loading={<div className="post-header" />}
              src="yacare.near/widget/MainPage.N.Post.Header"
              props={{
                link: "#",
                accountId: bettor,
                hideMenu: true,
                timeMs: timestamp / 1000000,
              }}
            />
            <p style={{ color: color(result) }}>
              <strong>{styledResult(result, toNear(bet))}</strong>
            </p>
          </div>
        </div>
      </Wrapper>
    ))}
  </>
);
