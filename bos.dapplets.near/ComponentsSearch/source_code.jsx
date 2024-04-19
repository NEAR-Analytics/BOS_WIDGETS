const { apps, waitingAppIdsSet } = props;

const CloseModal = styled.span`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.2);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  padding-right: 15px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  padding-bottom: 25px;
  padding-top: 50px;
  width: 422px;
  min-height: 350px;
  max-height: 547px;
  border: 1px solid #d9d9d9;
  background: #fff;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.01) 0px 16px 16px 0px,
    rgba(0, 0, 0, 0.049) 0px 65px 65px 0px,
    rgba(0, 0, 0, 0.005) 0px 15px 17px 0px, rgba(0, 0, 0, 0.01) 0px 8px 13px 0px,
    rgba(0, 0, 0, 0) 0px 14px 13px 0px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const H1 = styled.h1`
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  color: #11181c;
  margin: 0;
`;

const H2 = styled.h2`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #687076;
  margin: 0;
`;

const Text = styled.p`
  margin: 0;
  line-height: 1.5rem;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")} !important;
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "")};
  white-space: ${(p) => (p.ellipsis ? "nowrap" : "")};
  overflow-wrap: anywhere;

  b {
    font-weight: 600;
    color: #11181c;
  }

  &[href] {
    display: inline-flex;
    gap: 0.25rem;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;
  transition: all 0.15s;
`;

const Item = styled.div`
  width: 100%;
  padding-top: 12px;
  transition: all 0.15s;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 8px;
  height: 32px;
  background: #fbfcfd;
  border: 1px solid #d7dbdf;
  border-radius: 50px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  color: #11181c !important;
  margin: 0;

  &:hover,
  &:focus {
    background: #ecedee;
    text-decoration: none;
    outline: none;
  }

  span {
    color: #687076 !important;
  }
`;

const WarningMessage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 10px;
  gap: 6px;
  align-items: center;
  background: rgba(56, 75, 255, 0.05);
  border-radius: 5px;
  flex: none;
  flex-grow: 0;
  position: relative;

  p {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    color: #384bff;
    flex: none;
    flex-grow: 0;
  }

  svg {
    padding: 0;
    margin: 0;
  }
`;

const AlertIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke="#384BFF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.01 16L12.01 12"
      stroke="#384BFF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.01 8L12 8"
      stroke="#384BFF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const iconCloseModal = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      d="M16.25 4.25L3.75 16.75"
      stroke="#C1C6CE"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.75 4.25L16.25 16.75"
      stroke="#C1C6CE"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

return (
  <Wrapper>
    <CloseModal onClick={props.handleCloseMenu}>{iconCloseModal}</CloseModal>

    {context.accountId === null ? (
      <WarningMessage>
        <AlertIcon />
        <p>You must be Logged In to start using this</p>
      </WarningMessage>
    ) : null}

    {apps.length > 0 ? (
      <Items style={{ paddingRight: apps && apps.length >= 5 ? "20px" : "" }}>
        {apps.map((app) => {
          return (
            <Item key={app.id}>
              <Widget
                src="bos.dapplets.near/widget/SearchCard"
                props={{
                  src: app.id,
                  metadata: app.metadata,
                  onComponentSelect: () => props.onSelect(app),
                  hideButtons: !context.accountId,
                  isWaiting: waitingAppIdsSet.has(app.id),
                }}
              />
            </Item>
          );
        })}
      </Items>
    ) : (
      <Text>No apps available for this context</Text>
    )}
  </Wrapper>
);
