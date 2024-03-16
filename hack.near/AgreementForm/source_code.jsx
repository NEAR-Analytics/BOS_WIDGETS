const ownerId = "hack.near";

State.init({
  agree: false,
});

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const CloseButton = styled.a`
  padding: 0.75em 1em;
  gap: 0.5em;
  background: #fafafa;
  border: 1px solid #eceef0;
  border-radius: 50px;
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  text-align: center;
  color: #101828;
`;

return (
  <>
    <Dialog.Description>
      <Widget
        src={`${ownerId}/widget/nui.checkbox`}
        props={{
          label: (
            <>
              By executing this Agreement, You agree to comply with those terms,
              which also include the terms of use of the Cooperative’s platforms
              and other policies of the Cooperative and the Council. The parties
              understand and agree to the terms of
              <a href={`/${ownerId}/widget/Agreement`}>
                NEAR Builders Cooperative Membership
              </a>
              .
            </>
          ),
          value: state.agree,
          id: "agree",
          onChange: (agree) => State.update({ agree: !state.agree }),
        }}
      />
    </Dialog.Description>
    <Footer>
      <Dialog.Close asChild>
        <CloseButton href={`/${ownerId}/widget/Agreement`}>Close</CloseButton>
      </Dialog.Close>
      <Widget
        src={`${ownerId}/widget/nui.button`}
        props={{
          text: <>Accept</>,
          disabled: !state.agree,
          onClick: () => {
            if (!state.agree) return;
            props.accept();
          },
        }}
      />
    </Footer>
  </>
);
