const accountId = props.accountId ?? context.accountId ?? "hack.near";
const namespace = props.namespace ?? "widget";
const thingId = props.thingId ?? "Academy";
let tag = props.tag ?? "*";

State.init({ path: props.path ?? `${accountId}/${namespace}/${thingId}` });

const data = Social.keys(`*/graph/context/*/*/*/tags/${tag}`, "final");

if (!data) {
  return "Loading...";
}

function extractThings(data) {
  const uniqueKeys = new Set();
  const things = [];

  Object.keys(data).forEach((curatorId) => {
    const context = data[curatorId]?.graph?.context;

    if (context) {
      Object.keys(context).forEach((creatorId) => {
        const namespaces = context[creatorId];

        if (namespaces) {
          Object.keys(namespaces).forEach((namespace) => {
            const thingData = namespaces[namespace];

            if (thingData) {
              Object.keys(thingData).forEach((thingId) => {
                const key = `${creatorId}-${namespace}-${thingId}`;

                if (!uniqueKeys.has(key)) {
                  uniqueKeys.add(key); // Add the key to the set

                  things.push(
                    <div key={key} className="m-3 mt- card">
                      <div className="card-body m-2 p-1 row">
                        <div className="col m-1 p-2 text-truncate">
                          <Widget
                            src="hack.near/widget/thing.block"
                            props={{
                              path: `${creatorId}/${namespace}/${thingId}`,
                            }}
                          />
                        </div>
                        <div className="col m-1 p-1">
                          <Widget
                            src="hack.near/widget/tags"
                            props={{
                              path: `${creatorId}/${namespace}/${thingId}`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                }
              });
            }
          });
        }
      });
    }
  });

  return things;
}

return (
  <>
    <div className="mb-2 row">
      <div className="mb-1 col">
        <h5 className="mb-3">SocialDB Path of Anything:</h5>
        <input
          type="text"
          value={state.path}
          onChange={(event) =>
            State.update({ path: event.target.value.toLowerCase() })
          }
        />
        <br />
        <div className="row">
          <div className="col m-1 ">
            <Widget
              src="hack.near/widget/star.button"
              props={{ path: state.path }}
            />
          </div>
        </div>
        <div className="col-8 m-1 mt-2">
          <button
            className="btn btn-outline-secondary d-flex"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Guide
          </button>
        </div>
      </div>
      <div className="mb-2 col">
        <Widget
          src="hack.near/widget/meta.editor"
          props={{ path: state.path }}
        />
      </div>
      <div className="collapse" id="collapseExample">
        <div className="card card-body m-3" style={{ background: "#f8f8f8" }}>
          <h5>Best Practices:</h5>
          <ul>
            <li>Keep tags concise and simple</li>
            <li>Use "-" instead of spaces</li>
            <li>English words recommended</li>
            <li>Don't save irrelevant context</li>
            <li>Be kind to everyone</li>
          </ul>
        </div>
      </div>
    </div>
    <br />

    {tag !== "*" ? (
      <>
        <h5 className="ms-2">Filtered by Tag:</h5>

        <h4 className="ms-3">
          <span className="badge rounded-pill bg-primary">{tag}</span>
        </h4>
      </>
    ) : (
      <h5 className="ms-3">All Things</h5>
    )}

    {extractThings(data)}

    {tag !== "*" && (
      <div className="mt-3 mb-5">
        <a
          className="btn btn-outline-primary"
          href="/#/hack.near/widget/every.context"
        >
          Every Tag
        </a>
      </div>
    )}
  </>
);
