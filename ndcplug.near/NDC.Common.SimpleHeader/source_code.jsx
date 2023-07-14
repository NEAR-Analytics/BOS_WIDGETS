const title = props.title ?? "NDC OG SBT Holders";
const Logo = styled.img`
    width: 60px;
    margin: 0 20px 0 10px;
`;

const H1 = styled.h1`
  font-size: 40px;
  font-weight: 500;
  margin-bottom: 0;
`;

const TitleContainer = () => (
  <>
    <Logo src="https://pbs.twimg.com/profile_images/1622941553839816707/nmf3MWw1_400x400.jpg" />
    <H1>{title}</H1>
  </>
);

return (
  <>
    <div className="p-4 bg-black text-white d-none d-lg-flex rounded justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <TitleContainer />
      </div>
    </div>
  </>
);
