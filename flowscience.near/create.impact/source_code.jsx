const accountId = props.accountId ?? context.accountId;

const template = Social.get(`${accountId}/settings/dev/src`);

if (template === null) {
  return "Loading...";
}

const src = "flowscience.near/widget/hypercert.page";

State.init({
  h1,
  h2,
  tagline,
  communityId,
  contractId,
  buttonText,
  link,
  mainColor,
  name,
});

const handleCreate = () =>
  Social.set({
    widget: {
      [`${state.name}`]: {
        "": `const accountId = props.accountId ?? context.accountId; const ownerId = props.ownerId ?? "hack.near"; const pageId = props.pageId ?? "community.page"; return <Widget src="hack.near/widget/community.page" props={{ accountId, communityId: "${state.communityId}", contractId: "${state.contractId}", h1: "${state.h1}",
        h2: "${state.h2}", tagline: "${state.tagline}", mainColor: "${state.mainColor}", buttonText: "${state.buttonText}", link: "${state.link}" }} />`,
        metadata: {
          tags: {
            build: "",
          },
        },
      },
    },
  });

return (
  <>
    <h3>Publish an Impact Certificate</h3>
    <p>
      <i>
        ↳ read the{" "}
        <a href="https://github.com/open-cann/hypercerts-on-bos">
          documentation
        </a>
        about hypercerts
      </i>
    </p>
    <hr />
    <div className="mt-3">
      <div>
        <h5>Name Your Impact</h5>
        <input type="text" placeholder="My Impact" value={state.h1} />
      </div>
    </div>
    <div className="mt-3">
      <h5>h2</h5>
      <input type="text" placeholder="DAO" value={state.h2} />
    </div>
    <div className="mt-3">
      <h5>Project Account ID</h5>
      <input type="text" placeholder={accountId} value={state.communityId} />
    </div>
    <div className="mt-3">
      <h5>contractId (for an NFT gate)</h5>
      <input
        type="text"
        placeholder="mint.sharddog.near"
        value={state.contractId}
      />
    </div>
    <div className="mt-3">
      <h5>tagline</h5>
      <input
        type="text"
        placeholder="Everyone builds everything together!"
        value={state.tagline}
      />
    </div>
    <div className="mt-3">
      <h5>buttonText</h5>
      <input type="text" placeholder="Get Started" value={state.buttonText} />
    </div>
    <div className="mt-3">
      <h5>link</h5>
      <input
        type="text"
        placeholder="https://everything.dev"
        value={state.link}
      />
    </div>
    <div className="mt-3">
      <h5>mainColor</h5>
      <input type="text" placeholder="#000" value={state.mainColor} />
    </div>
    <div className="mt-3">
      <h5>name (for this page)</h5>
      <input type="text" placeholder="community" value={state.name} />
    </div>
    <div className="mt-3">
      <button
        disabled={
          !state.name ??
          !state.h1 ??
          !state.h2 ??
          !state.tagline ??
          !state.buttonText ??
          !state.link ??
          !state.mainColor ??
          !state.name
        }
        className="btn btn-success mx-1"
        onClick={handleCreate}
      >
        Create
      </button>
      <a
        className="btn btn-outline-success mx-1"
        href="#/edit/flowscience.near/widget/hypercert.page"
      >
        Edit Template
      </a>
    </div>
    <hr />
    <h3>Preview</h3>
    <div className="mb-2">
      <Widget
        src={src}
        props={{
          h1: state.h1,
          h2: state.h2,
          tagline: state.tagline,
          communityId: state.communityId,
          contractId: state.contractId,
          buttonText: state.buttonText,
          link: state.link,
          mainColor: state.mainColor,
          name: state.name,
        }}
      />
    </div>
  </>
);
