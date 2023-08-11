const Logo = styled.img`
  position: absolute;
  top: 20px;
  left: 40px;
  @media (max-width: 510px) {
    width: 140px;
    top: 10px;
    left: 20px;
  }
`;

return (
  <div className="logo">
    <Logo src="https://humans.nearverselabs.com/logo.png" />
  </div>
);
