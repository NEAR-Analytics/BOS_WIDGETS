const index = {
  action: "post",
  key: "main",
  options: {
    limit: 10,
    order: "desc",
    accountId: props.accounts,
  },
};

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const renderItem = (a) => {
  if (a.value.type === "md") {
    return (
      <ImageWrapper key={JSON.stringify(a)} className="insta-item">
        <img
          src={a.value.imageSrc}
          alt={a.value.title}
          style={{ maxWidth: "100%" }}
        />
        <div className="insta-content">
          <h3>{a.value.title}</h3>
          <p>{a.value.description}</p>
        </div>
      </ImageWrapper>
    );
  }
};

const LoadMore = styled.div`
  @media (min-width: 576px) {
    max-width: 288px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

return (
  <div className="insta-feed">
    <h2>NearSta</h2>
    <Widget
      src="mob.near/widget/Image.Feed"
      props={{
        index,
        renderItem,
        loadMoreText: (
          <LoadMore className="text-bg-light ratio ratio-1x1">
            Load More
          </LoadMore>
        ),
        ...{
          headerElement: props.headerElement,
          footerElement: props.footerElement,
        },
      }}
    />
  </div>
);
