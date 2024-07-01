const { href } = VM.require(`devhub.near/widget/core.lib.url`) || {
  href: () => {},
};
const { readableDate } = VM.require(`devhub.near/widget/core.lib.common`) || {
  readableDate: () => {},
};
const linkedProposalIds = props.linkedProposalIds ?? [];
const linkedProposalsData = [];
const showStatus = props.showStatus ?? false;
// using contract instead of indexer, since indexer doesn't return timestamp
linkedProposalIds.map((item) => {
  const data = Near.view("forum.potlock.near", "get_proposal", {
    proposal_id: item,
  });
  if (data !== null) {
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
      return (
        <a
          href={href({
            widgetSrc: `bos.forum.potlock.near/widget/app`,
            params: {
              page: "proposal",
              id: item.id,
            },
          })}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="d-flex gap-2">
            <Widget
              src={`bos.forum.potlock.near/widget/components.molecule.Profile`}
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
                    src={`devhub.near/widget/devhub.entity.proposal.StatusTag`}
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
