// adapted from the `PublicTagEditor` widget by zavodil.near

const ownerId = props.ownerId ?? "hack.near";
const thingName = props.thingName ?? "widget";
const thingId = props.thingId ?? "catalog";
const accountId = context.accountId;
const path = props.path ?? `${ownerId}/${thingName}/${thingId}`;
const debug = props.debug ?? false;

if (!accountId) {
  return (
    <>
      <h3>Tags</h3>
      <p>Please connect your NEAR account :)</p>
    </>
  );
}

State.init({ path });

const metadata = Social.getr(`${state.path}`, "final");

const pattern = `*/${thingName}/*/metadata/tags/*`;

return (
  <div className="row">
    <div className="col-lg-6">
      <div>
        <h4>Tag Editor</h4>
      </div>
      <div className="mb-2">
        Source Path:
        <input
          type="text"
          value={state.path}
          onChange={(event) =>
            State.update({ path: event.target.value.toLowerCase() })
          }
        />
      </div>
      <div className="mb-2" style={{ minHeight: "62px" }}>
        {metadata !== null ? (
          <Widget
            src={"mob.near/widget/MetadataEditor"}
            key={`public-tags-metadata-${state.contractId}`}
            props={{
              initialMetadata: metadata,
              onChange: (metadata) => {
                State.update({ metadata });
              },
              options: {
                tags: {
                  label: "Tags",
                  pattern,
                  placeholder: "dev, art, gov, edu, social, near",
                },
              },
            }}
          />
        ) : (
          "Loading..."
        )}
      </div>
      <div className="mb-2">
        <CommitButton
          disabled={metadata === null}
          data={{
            [thingName]: {
              [state.path]: state.metadata,
            },
          }}
        >
          Save
        </CommitButton>

        <button
          class="btn btn-outline-secondary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Guide
        </button>
      </div>

      <div className="collapse" id="collapseExample">
        <div class="card card-body">
          <h5>Best Practices:</h5>
          <ul>
            <li>Keep tags concise and simple</li>
            <li>Put "-" (dash) instead of a space</li>
            <li>English words recommended</li>
            <li>Do not create unnecessary tags</li>
          </ul>
        </div>
      </div>
    </div>
    <div className="col-lg-6">
      <div>
        <h4>Preview</h4>
        <br />
      </div>
      <div className="mb-2 card">
        <div className="card-body">
          <div className="text-truncate mb-2">
            <Widget
              src={`mob.near/widget/ProfileLine`}
              props={{ accountId: state.contractId }}
            />
          </div>
          <Widget
            src={`${ownerId}/widget/tags`}
            props={{
              path: state.path,
              extraTags: state.metadata.tags,
            }}
          />
        </div>
      </div>
    </div>
  </div>
);
