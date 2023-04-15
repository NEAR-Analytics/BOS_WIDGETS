const accountId = props.accountId; // which account's Types to use
const font = props.font || "Courier"; // custom font for H1
const hashtag = props.hashtag || "dev"; // where to index data from
const text = props.text || hashtag; // text for H1
const view = props.view || "WIDGETS";

const pageTypes = [
  {
    name: "community",
    hashtag: "community",
    template: "hack.near/widget/Common.Page",
  },
  {
    name: "feed",
    hashtag: "feed",
    template: "hack.near/widget/Feed.Template",
  },
];

const H1 = styled.h1`
  font-family: ${font}, Times, serif;
  font-size: 4em;
  line-height: 1.25;
  font-weight: 400;
  cursor: pointer;
`;

const Container = styled.div`
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const Controller = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;
  margin: 0 4px;
`;

const Button = styled.button`
  text-transform: lowercase !important;
`;

State.init({
  title: text,
  selectedTab: view,
  type: null,
});

const renderView = () => {
  switch (state.selectedTab) {
    case "CREATE":
      return (
        <Widget
          src={"hack.near/widget/Create.Page"}
          props={{ typeTag: state.type.hashtag, template: state.type.template }}
        />
      );
    case "WIDGETS":
      return (
        <Widget
          src={"hack.near/widget/Test.Page"}
          props={{ hashtag: state.type.hashtag || hashtag }}
        />
      );
  }
};

const handleSelectType = (type) => {
  State.update({
    type,
    title: type.name || text,
    selectedTab: "WIDGETS",
  });
};

const handlePageCreate = () => {
  State.update({
    selectedTab: "CREATE",
  });
};

return (
  <>
    <Container>
      <Controller>
        <H1>{state.title}</H1>
        <ButtonRow>
          {state.type === null ? (
            <>
              {pageTypes.map((it) => (
                <Button onClick={() => handleSelectType(it)}>{it.name}</Button>
              ))}
            </>
          ) : (
            <>
              <Button onClick={() => handleSelectType(null)}>back</Button>
              <Button onClick={() => handlePageCreate()}>create new</Button>
            </>
          )}
        </ButtonRow>
      </Controller>
      {renderView()}
    </Container>
  </>
);
