const contract = props.contract;
const bounty = props.bounty;
const deadline = bounty.deadline;
const accountId = bounty.owner;
const profile = Social.getr(`${accountId}/profile`);
const image = profile.image;
const url =
  (image.ipfs_cid
    ? `https://ipfs.near.social/ipfs/${image.ipfs_cid}`
    : image.url) || "https://thewiki.io/static/media/sasha_anon.6ba19561.png";

const claims = Near.view(props.contract, "get_bounty_claims_by_id", {
  id: props.id,
});

const Description = styled.div`  
    overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
`;

function convertNanoToUnits(nanoseconds) {
  const seconds = nanoseconds / 1e9;
  const minutes = seconds / 60;
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30.44); // Approximate average days per month

  if (months >= 1) {
    return `${months} months`;
  } else if (weeks >= 1) {
    return `${weeks} weeks`;
  } else if (days >= 1) {
    return `${days} days`;
  } else {
    return `${hours} hours`;
  }
}

function isBountyClaimed(claims, bounty) {
  if (claims !== null) {
    return (
      claims.some((item) => item[1].status === "InProgress") ||
      bounty.status === "Completed" ||
      bounty.status === "Claimed"
    );
  }
}

function formatDate(epoch, output) {
  const dateObj = new Date(epoch / 1000000);
  let humanDate = null;
  if (output === "datetime") {
    humanDate = dateObj.toLocaleString();
  } else {
    humanDate = dateObj.toLocaleDateString();
  }
  return humanDate;
}

function isObjectNotNull(value) {
  return value !== null && typeof value === "object";
}

console.log(deadline);

let due;
if (deadline === "WithoutDeadline") {
  due = "Deadline not specified";
} else if (isObjectNotNull(deadline) && isObjectNotNull(deadline.DueDate)) {
  due = "Deadline: " + formatDate(deadline.DueDate.due_date.toString(), "date");
} else if (isObjectNotNull(deadline) && isObjectNotNull(deadline.MaxDeadline)) {
  due =
    "Deadline: " +
    convertNanoToUnits(deadline.MaxDeadline.max_deadline).toString();
} else {
  due = "Deadline unknown";
}

const isDisabled = (bountyOwner) => {
  return bountyOwner === context.accountId ? "" : " disabled";
};

const handleAccept = (claim, approve) => {
  console.log("claim", claim);
  Near.call([
    {
      contractName: contract,
      methodName: "decision_on_claim",
      args: {
        id: claim[1].bounty_id,
        claimer: claim[0],
        approve: approve,
      },
      gas: 300000000000000,
      deposit: 1,
    },
  ]);
};

return (
  <div className="text-bg-light rounded-4 p-3 mb-3 border">
    {bounty !== null ? (
      <p>
        <div class="container">
          <div class="row">
            <div class="col-sm col-lg-5">
              <div class="container">
                <div class="row">
                  <div class="col-8">
                    <div class="d-flex">
                      <div
                        className="profile-image me-2"
                        style={{ width: "3em", minWidth: "3em", height: "3em" }}
                      >
                        <img
                          className="rounded w-100 h-100"
                          style={{ objectFit: "cover" }}
                          src={url}
                          alt="profile image"
                        />
                      </div>
                      <div className="profile-info text-truncate">
                        <div className="profile-name">
                          {formatDate(bounty.created_at, "datetime")}
                        </div>
                        <div className="profile-name">{accountId}</div>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div>
                      <div class="d-flex float-end">
                        <span
                          class={
                            bounty.status === "New"
                              ? "bg-warning badge rounded-pill"
                              : "bg-success badge rounded-pill"
                          }
                        >
                          {bounty.status}
                        </span>
                      </div>
                      <br />
                      <div class="float-end">
                        {" "}
                        <span class={"badge p-2 badge bg-light text-dark"}>
                          <div class=""> {due}</div>
                        </span>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex clearfix"></div>
              <hr />
              <Description>
                <Markdown text={bounty.metadata.description} />
              </Description>
              <div class="text-break">
                {/*p class="text-break" style={{ textAlign: "justify" }}>
                  {bounty.metadata.description.replace(/(?:\r\n)/g, "\n")}
                </p>
                */}
              </div>
            </div>
            <div class="p-2 col-sm col-lg-7">
              <div class="container">
                <div class="row">
                  <div class="col-12 col-lg-6 mb-2">
                    <Widget
                      src={`${props.rootUser}/widget/Heroes.ClaimData`}
                      props={{
                        contract: props.contract,
                        whitelistContract: props.whitelistContract,
                        amount: bounty.amount,
                        token: bounty.token,
                        deadline: bounty.deadline.DueDate.due_date,
                        bountyClaimed: isBountyClaimed(claims, bounty),
                        bountyTitle: bounty.metadata.title,
                        bountyCompleted: bounty.status === "Completed",
                        bountyId: props.id,
                        kyc_config: bounty.kyc_config,
                      }}
                    />
                  </div>
                  <div class="col-12 col-lg-6">
                    <div class="card">
                      <div class="card-header">
                        <h4>Applicants:</h4>
                      </div>
                      {claims !== null ? (
                        <div class="card-body">
                          {claims.length !== 0 ? (
                            claims
                              .slice(0)
                              .reverse()
                              .map((claim) => {
                                return (
                                  <div>
                                    <Widget
                                      src={`${props.rootUser}/widget/Heroes.Profile`}
                                      props={{
                                        contract: props.contract,
                                        accountId: claim[0],
                                        createdAt: claim[1].created_at,
                                        claimStatus: claim[1].status,
                                      }}
                                    />
                                    <div class="d-flex clearfix"></div>
                                    <p />
                                    <div class="text-justify text-wrap bd-highlight">
                                      <Markdown text={claim[1].description} />
                                      {bounty.status !== "Completed" && (
                                        <div class="d-flex clearfix float-end">
                                          <a
                                            class={
                                              "btn btn-sm btn-warning text-warning-emphasis" +
                                              isDisabled(bounty.owner)
                                            }
                                            onClick={() =>
                                              handleAccept(claim, true)
                                            }
                                          >
                                            Accept
                                          </a>
                                          <a
                                            class={
                                              "btn btn-dark btn-sm ms-2 text-warning-emphasis" +
                                              isDisabled(bounty.owner)
                                            }
                                            onClick={() =>
                                              handleAccept(claim, false)
                                            }
                                          >
                                            Decline
                                          </a>
                                        </div>
                                      )}
                                    </div>
                                    <div class="clearfix"></div>
                                    <hr />
                                  </div>
                                );
                              })
                          ) : (
                            <div>
                              No one has claimed this bounty yet. Be the first
                              to seize the opportunity!
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>Loading</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </p>
    ) : (
      <div>Loading ...</div>
    )}
  </div>
);
