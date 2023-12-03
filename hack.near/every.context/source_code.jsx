const accountId = props.accountId ?? context.accountId ?? "hack.near";
const namespace = props.namespace ?? "widget";
let tag = props.tag ?? "*";

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
                            props={{ creatorId, namespace, thingId }}
                          />
                        </div>
                        <div className="col m-1 p-1">
                          <Widget
                            src="hack.near/widget/tags"
                            props={{ creatorId, namespace, thingId }}
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
    <Widget
      src="hack.near/widget/tag.editor"
      props={{ creatorId: accountId }}
    />
    <hr />
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
