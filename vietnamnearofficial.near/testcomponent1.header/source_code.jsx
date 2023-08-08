const title = props.title ?? "HEADER";
const logoSvg = props.logoSvg ?? <svg width="100%" height="100%"></svg>;
const Logo = styled.div`
    width: 60px;
    margin: 0 20px 0 10px;
`;

const H1 = styled.h1`
  font-size: 60px;
  font-weight: 400;
  margin-bottom: 0;
`;

const TitleContainer = () => (
  <>
    <Logo>{logoSvg}</Logo>
    <H1>{title}</H1>
  </>
);

return (
  <div className="p-4 bg-black text-white d-none d-lg-flex rounded justify-content-between align-items-center">
    <div className="d-flex align-items-center">
      <TitleContainer />
    </div>
  </div>
);
