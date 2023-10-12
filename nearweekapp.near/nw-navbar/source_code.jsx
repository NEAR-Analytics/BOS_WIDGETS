const rootUser = "nearweekapp.near";
const breakpoints = {
  md: "768px",
  lg: "1100px",
  xl: "1300px",
};
const HeaderContainer = styled.div`
    padding: 0.5rem;
    --bs-bg-opacity: 1;
    background-color: rgba(var(--bs-dark-rgb),var(--bs-bg-opacity))!important;
    --bs-navbar-color: hsla(0,0%,100%,.55);
    @media screen and (max-width: ${breakpoints.md}) {
      padding-top:19px;
      padding-bottom:19px;
    }
  `;

function NavBar() {
  return (
    <HeaderContainer>
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="d-none d-md-block col" id="navbarNav">
            <Widget src={`${rootUser}/widget/nw-navbar-social`} />
          </div>
          <div class="col d-flex justify-content-center">
            <a class="navbar-brand" href="#">
              <Widget src={`${rootUser}/widget/nw-navbar-logo`} />
            </a>
          </div>
          <div class="d-none d-md-flex col justify-content-end">
            {/*
                <a class="nav-item" href="#">
                  <Widget src={`${rootUser}/widget/nw-navbar-bluebtn`} />
                </a>
               */}
          </div>
        </div>
      </div>
    </HeaderContainer>
  );
}

return <NavBar />;
