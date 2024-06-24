const { Feed } = VM.require("devs.near/widget/Feed") || {
  Feed: () => <></>,
};
const { Post, Button } = VM.require("abdullahi3000.near/widget/components") || {
  Post: () => <></>,
  Button: () => <></>,
};
const { Header } = VM.require("buildhub.near/widget/components.Header") || {
  Header: () => <></>,
};

const LoginContainer = styled.div`
  background-color: #23242b;
  color: #fff;

  width: 100%;
  height: 16rem;
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;

  margin-bottom: 1rem;
`;

const { name: feedName, template, requiredHashtags, customActions } = props;

// for modals
const [item, setItem] = useState(null);
const [showProposeModal, setShowProposeModal] = useState(false);
const toggleProposeModal = () => {
  setShowProposeModal(!showProposeModal);
};

const modalToggles = {
  propose: toggleProposeModal,
};

customActions = [
  {
    type: "modal",
    icon: "bi-file-earmark-text",
    label: "Propose",
    onClick: (modalToggles) => {
      const toggle = modalToggles.propose;
      toggle();
    },
  },
];

return (
  <div key={feedName}>
    <Header>{feedName} Feed</Header>
    {/* Modals */}
    <Widget
      src="buildhub.near/widget/components.modals.CreateProposal"
      loading=""
      props={{
        showModal: showProposeModal,
        toggleModal: toggleProposeModal,
        item: item,
      }}
    />
    {!context.accountId ? ( // if not logged in
      <LoginContainer>
        <p>Please login in order to post.</p>
        <a
          href={"https://nearbuilders.org/join"}
          style={{ textDecoration: "none" }}
        >
          <Button variant="primary">Login</Button>
        </a>
      </LoginContainer>
    ) : (
      accountId
    )}
    <Feed
      index={(requiredHashtags || []).map((it) => ({
        action: "hashtag",
        key: it,
        options: {
          limit: 10,
          order: "desc",
          subscribe: true,
        },
        cacheOptions: {
          ignoreCache: true,
        },
        required: true,
      }))}
      Item={(p) => (
        <Post
          accountId={p.accountId}
          blockHeight={p.blockHeight}
          noBorder={true}
          currentPath={`/abdullahi3000.near/widget/app?page=feed`}
          customActions={customActions}
          modalToggles={modalToggles}
          setItem={setItem}
        />
      )}
    />
  </div>
);
