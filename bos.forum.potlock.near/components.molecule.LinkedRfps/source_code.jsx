const { readableDate } = VM.require(`devhub.near/widget/core.lib.common`) || {
  readableDate: () => {},
};
const { href } = VM.require(`devhub.near/widget/core.lib.url`) || {
  href: () => {},
};
const linkedRfpIds = props.linkedRfpIds ?? [];
const linkedRfpsData = [];
linkedRfpIds.map((item) => {
  const data = Near.view("forum.potlock.near", "get_rfp", {
    rfp_id: item,
  });
  if (data !== null) {
    linkedRfpsData.push(data);
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
    {linkedRfpsData.map((item) => {
      return (
        <a
          href={href({
            widgetSrc: `bos.forum.potlock.near/widget/app`,
            params: {
              page: "rfp",
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
                accountId: item.author_id,
              }}
            />
            <div className="d-flex flex-column" style={{ maxWidth: 250 }}>
              <b className="text-truncate">{item.snapshot.name}</b>
              <div className="text-sm text-muted">
                created on {readableDate(item.snapshot.timestamp / 1000000)}
              </div>
            </div>
          </div>
        </a>
      );
    })}
  </Container>
);
