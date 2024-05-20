import {
  REPL_INFRASTRUCTURE_COMMITTEE,
  REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT,
  REPL_DEVHUB,
} from "@/includes/common";

const { readableDate } = VM.require(
  `${REPL_DEVHUB}/widget/core.lib.common`
) || { readableDate: () => {} };

const linkedProposalIds = props.linkedProposalIds ?? [];
const linkedProposalsData = [];
const hideStatuses = props.hideStatuses ?? [];
const showStatus = props.showStatus ?? false;

// using contract instead of indexer, since indexer doesn't return timestamp
linkedProposalIds.map((item) => {
  const data = Near.view(
    REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT,
    "get_proposal",
    {
      proposal_id: item,
    }
  );
  if (data !== null && !hideStatuses.includes(data.snapshot.timeline.status)) {
    linkedProposalsData.push(data);
  }
});

const Container = styled.div`
  a {
    &:hover {
      text-decoration: none !important;
    }
  }
`;

return (
  <Container className="d-flex flex-column gap-3">
    {linkedProposalsData.map((item) => {
      const link = `https://near.org/${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.pages.app?page=proposal&id=${item.id}`;
      return (
        <a href={link} target="_blank" rel="noopener noreferrer">
          <div className="d-flex gap-2">
            <Widget
              src={`${REPL_DEVHUB}/widget/devhub.entity.proposal.Profile`}
              props={{
                accountId: item.snapshot.editor_id,
              }}
            />
            <div className="d-flex flex-column" style={{ maxWidth: 250 }}>
              <b className="text-truncate">{item.snapshot.name}</b>
              <div className="text-sm text-muted">
                created on {readableDate(item.snapshot.timestamp / 1000000)}
              </div>
              {showStatus && (
                <div style={{ width: "fit-content" }} className="mt-1">
                  <Widget
                    src={`${REPL_DEVHUB}/widget/devhub.entity.proposal.StatusTag`}
                    props={{
                      timelineStatus: item.snapshot.timeline.status,
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </a>
      );
    })}
  </Container>
);
