const ownerId = "xvii.near";

const Navbar = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0 2.5rem 0;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  position: sticky;
  top: 0;
  margin-bottom: 0.75rem;
  max-height: 2.5em;
`;

const LogoArea = styled.a`
  display: block;
  width: 14em;
  padding: 0px;
  gap: 0.7em;
  font-style: normal;
  font-weight: 700;
  font-size: 1em;
  line-height: 1em;
  color: #11181c;
  transform: translateY(0.675em);

  &:hover {
    text-decoration: none;
    color: #11181c;
  }
`;

const ActionArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 0px;
  gap: 1em;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 0.5em;
  flex: none;
  order: 0;
  align-self: stretch;
  font-style: normal;
  font-weight: 500;
  font-size: 1em;
  line-height: 1em;
  text-align: right;
  color: #666666;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const logo = (
  <LogoArea>
    <svg
      width="254"
      height="53"
      viewBox="0 0 254 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text x="10" y="40" font-family="'Arial'" font-size="35" fill="#008081">
        NCR Course
      </text>
    </svg>
  </LogoArea>
);

const info = <Info>Feb 28 - May 8 </Info>;

const actions = (
  <ActionArea>
    {info}
    <Widget src={`${ownerId}/widget/BOSHACKS.Register.Button`} />
  </ActionArea>
);

return (
  <Navbar>
    {logo}
    {actions}
  </Navbar>
);

//
