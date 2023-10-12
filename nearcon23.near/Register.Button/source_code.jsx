const ownerId = "nearpad.testnet";

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
   @media screen and (max-width: 768px) {
   padding: 5px 10px;
   min-width: 8em;
  }
`;

const HideInMobile = styled.span`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

return (
  <Anchor href={props.href ?? `/${ownerId}/widget/Index?tab=register`}>
    Register <HideInMobile>$99</HideInMobile>
  </Anchor>
);
