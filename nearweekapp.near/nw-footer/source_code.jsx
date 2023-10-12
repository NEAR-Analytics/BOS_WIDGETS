const rootUser = "nearweekapp.near";

const breakpoints = {
  md: "768px",
  lg: "1100px",
  xl: "1300px",
};

const Footer = styled.div`
    width: 100%
    display: block;
    --bs-bg-opacity: 1;
    background-color: rgba(var(--bs-dark-rgb),var(--bs-bg-opacity))!important;
    --bs-navbar-color: hsla(0,0%,100%,.55);

    @media screen and (min-width: ${breakpoints.md}) {
      display: none;
    }
`;
const FooterContent = styled.div`
    display: flex;
    justify-content: center;
    padding: 0.5rem;
`;

function Foot() {
  return (
    <Footer>
      <FooterContent>
        <Widget src={`${rootUser}/widget/nw-navbar-social`} />
      </FooterContent>
    </Footer>
  );
}

return <Foot />;
