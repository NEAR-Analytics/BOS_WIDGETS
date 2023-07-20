const path = props.path;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const subscribe = !!props.subscribe;
const parts = path.split("/");
const accountId = parts[0];
const notifyAccountId = accountId;
const issuer = props.issuer ?? "issuer.proofofvibes.near";
const receiver = props.receiver ?? "daoshe.near";
const showReciever = props.showReciever ?? true;
const showIssuer = props.showIssuer ?? true;
const showReference = props.showReference ?? true;
const showDAO = props.showDAO ?? true;
const showClass = props.showClass ?? true;
const showHeader = props.showHeader ?? true;
const classId = props.classId ?? 1;
const reference =
  props.reference ??
  "https://genadrop.mypinata.cloud/ipfs/QmQ1662QyTESnzWK8gBJdD7BtwQ3ddfXCMy6Hh3FHdmjMk?_gl=1*wrbb39*_ga*MTQ0ODg3NzEzNS4xNjgyNjA0ODQy*_ga_5RMPXG14TE*MTY4OTY4Njc3Ni44LjEuMTY4OTY4NjgyMi4xNC4wLjA";
const accountLoggedIn = context.accountId; // use this just in case
const postUrl = `https://near.org#/near/widget/PostPage?accountId=${accountId}&blockHeight=${blockHeight}`;

State.init({
  receiver: receiver,
  issuer: issuer,
  reference: reference,
  daoId: daoId,
  classId: classId,
});
const post_args = JSON.stringify({
  receiver: state.receiver,
  metadata: {
    class: state.classId,
  },
  reference: state.reference,
});

const proposal_args = Buffer.from(post_args, "utf-8").toString("base64");
//   const gas = 200000000000000;
//   const deposit = 80000000000000000000000; // 0.008 //
const policy = Near.view(daoId, "get_policy");

const content = props.content ?? JSON.parse(Social.get(path, blockHeight));
const type = content.type;
const metadata = content.metadata;

const item = {
  type: "social",
  path: path,
  blockHeight,
};

const Post = styled.div`
  position: relative;

  &::before {
    content: "";
    display: block;
    position: absolute;
    left: 19px;
    top: 52px;
    bottom: 12px;
    width: 2px;
    background: #eceef0;
  }
`;

const Header = styled.div`
  margin-bottom: 0;
  display: inline-flex;
`;

const Body = styled.div`
  padding-left: 52px;
  padding-bottom: 1px;
`;

const Content = styled.div`
  img {
    display: block;
    max-width: 100%;
    max-height: 80vh;
    margin: 0 0 12px;
  }
`;

const Text = styled.p`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #687076;
  white-space: nowrap;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: -6px -6px 6px;
`;

function renderContent() {
  if (type === "md" || type === "social") {
    return (
      <>
        {content.text && (
          <Widget
            src="near/widget/SocialMarkdown"
            props={{ text: content.text }}
          />
        )}

        {content.image && (
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: content.image,
            }}
          />
        )}
      </>
    );
  }
}

const daoId = props.daoId ?? "vibes.sputnik-dao.near";
const role = props.role ?? "vibee";

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

// need to check role if tastemaker

const proposeVibee = () => {
  const gas = 200000000000000;
  const deposit = 100000000000000000000000;
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "Recommended as a vibee",
          kind: {
            AddMemberToRole: {
              member_id: accountId,
              role: role,
            },
          },
        },
      },
      gas: gas,
      deposit: deposit,
    },
  ]);
};

// change this
const sbtMint = () => {
  Near.call([
    {
      contractName: state.daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "create proposal to mint SBT",
          kind: {
            FunctionCall: {
              receiver_id: state.issuer,
              actions: [
                {
                  method_name: "sbt_mint",
                  args: proposal_args,
                  deposit: "80000000000000000000000",
                  gas: "200000000000000",
                },
              ],
            },
          },
        },
      },
      deposit: deposit,
      gas: "219000000000000",
    },
  ]);
};

return (
  <div className="border-bottom pt-3 pb-1">
    <div>
      <div className="d-flex flex-row align-items-center">
        <div className="flex-grow-1 text-truncate">
          <a
            className="text-dark text-decoration-none text-truncate"
            href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
          >
            <Widget
              src="mob.near/widget/Profile.ShortInlineBlock"
              props={{ accountId, tooltip: true }}
            />
          </a>
        </div>

        <span className="text-nowrap text-muted">
          <Widget
            src="efiz.near/widget/SBT.Badge"
            props={{ accountId: accountId }}
          />
          <small>
            {blockHeight === "now" ? (
              "now"
            ) : (
              <a className="text-muted" href={link}>
                <Widget src="mob.near/widget/TimeAgo" props={{ blockHeight }} />
              </a>
            )}
          </small>
          {true && blockHeight !== "now" && (
            <div>
              <span>
                <a
                  href="javascript:void"
                  className="link-secondary ms-2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fs-6 bi bi-three-dots" />
                </a>
                <ul className="dropdown-menu row">
                  <li className="dropdown-item col">
                    <a
                      className="link-dark text-decoration-none"
                      onClick={proposeVibee}
                    >
                      <i className="bi bi-emoji-sunglasses" /> Recommend as
                      Vibee
                    </a>
                    <a
                      className="link-dark text-decoration-none"
                      onClick={sbtMint}
                    >
                      <i className="bi bi-shield-lock" /> Propose to Mint Proof
                      of Vibe SBT
                    </a>
                  </li>
                </ul>
              </span>
            </div>
          )}
        </span>
      </div>
    </div>
    <div className="mt-3 text-break">
      <Widget
        src="mob.near/widget/MainPage.Post.Content"
        props={{ content, raw }}
      />
    </div>
    {blockHeight !== "now" && (
      <div className="mt-1 d-flex justify-content-between">
        <div className="me-4">
          <Widget
            src="mob.near/widget/CommentButton"
            props={{
              onClick: () =>
                !state.showReply && State.update({ showReply: true }),
            }}
          />
        </div>
        <div className="me-4">
          <Widget
            src="mob.near/widget/LikeButton"
            props={{
              notifyAccountId,
              item,
            }}
          />
        </div>
        <div>
          <Widget
            src="mob.near/widget/MainPage.Post.ShareButton"
            props={{ accountId, blockHeight, postType: "post" }}
          />
        </div>
      </div>
    )}
    <div className="mt-3 ps-5">
      {state.showReply && (
        <div className="mb-2">
          <Widget
            src="mob.near/widget/MainPage.Comment.Compose"
            props={{
              notifyAccountId,
              item,
              onComment: () => State.update({ showReply: false }),
            }}
          />
        </div>
      )}
      <Widget
        src="mob.near/widget/MainPage.Comment.Feed"
        props={{
          item,
          highlightComment: props.highlightComment,
          limit: props.commentsLimit,
          subscribe,
          raw,
        }}
      />
    </div>
  </div>
);
