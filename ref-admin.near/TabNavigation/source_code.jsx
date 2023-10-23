const AbsoluteContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  color: #ffffff;
  padding: 30px 24px 20px 24px;
  border-bottom: 1px #292c42 solid;
  display: flex;
  .icon {
    line-height: 56px;
  }
  img {
    width: 52px;
    height: 52px;
    margin: 0 14px 0 30px;
  }
  .container-text {
    img {
      width: 16px;
      height: 16px;
      margin: 0 6px 0 0;
    }
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 700;
  }
  .widget-name {
    font-size: 20px;
    font-weight: 700;
  }
  .account-name {
    display: inline-block;
    margin: 0;
    font-size: 16px;
  }

  @media (max-width: 900px) {
    position: relative;
    padding: 0px;
    align-items: center;
    padding: 0px 12px;
    border-bottom: none;
    .icon {
      width: 36px;
      height: 26px;
      background-color: #373a53;
      line-height: 26px;
      text-align: center;
      border-radius: 10px;
      svg {
        width: 14px !important;
        height: 12px !important;
      }
    }
    .logo,
    .avatar,
    .account-name {
      display: none;
    }
    .widget-name {
      margin-bottom: 0px;
    }
    .container-text {
      text-align: center;
      flex-grow: 1;
    }
  }
`;

const Banner = styled.a`
  img {
    width: 100%;
  }
  .replaceImg {
    width: 100%;
  }
`;

const GoBackIcon = (
  <svg
    width="18"
    height="16"
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17 9C17.5523 9 18 8.55228 18 8C18 7.44772 17.5523 7 17 7V9ZM0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM17 7L1 7V9L17 9V7Z"
      fill="#979ABE"
    />
  </svg>
);

const [accountId, widget, widgetName] = props.src.split("/");
const metadata = Social.get(`${props.src}/metadata/**`, "final");

let imgSrc = "";
if (metadata.image.ipfs_cid) {
  imgSrc = "https://ipfs.near.social/ipfs/" + metadata.image.ipfs_cid;
} else if (metadata.image.url) {
  imgSrc = metadata.image.url;
}

return (
  <AbsoluteContainer>
    <Link className="icon" href={props.toUrl}>
      {GoBackIcon}
    </Link>
    <img src={imgSrc} alt="" className="logo" />
    <div className="container-text">
      {/* <h3 className="widget-name">{metadata.name || widgetName}</h3> */}
      {metadata.name || widgetName}
    </div>
  </AbsoluteContainer>
);
