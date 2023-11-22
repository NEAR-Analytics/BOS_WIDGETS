const ownerId = "lucus.near";

const Anchor = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  min-width: 10.625em;
  gap: 0.5em;
  border: 1px solid #00ec97;
  border-radius: 50px;
  background: #00ec97;
  color: #11181c;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  text-align: center;
  white-space: nowrap;
  transition: all 0.3s ease-in-out;

  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
    background: #11181c;
    border: 1px solid #11181c;
    color: #fff;
  }
`;

return (
  <Anchor
    href={
      props.href ??
      "https://near.org/near/widget/ComponentDetailsPage?src=lucus.near/widget/Donation.Project.Create"
    }
    target="_balnk"
  >
    Create Project
  </Anchor>
);
