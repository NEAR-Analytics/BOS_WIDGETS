const Card = styled.a`
  border-radius: 20px;
  background-color: #373a53;
  height: 320px;
  width: 500px;

  @media (max-width: 900px) {
    width: 100%;
    margin-top: -12px;
    height: 264px;
  }
`;
const Banner = styled.a`
  position: relative;
  display: block;
  height: 192px;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px 16px 0 0;
  }
  .replaceImg {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 900px) {
    height: 162px;
  }
`;
const Metadata = styled.div`
  padding: 0 15px 0 20px;
  .t {
    display: flex;
    .t-r {
      padding-top: 10px;
      .title {
        font-size: 20px;
        color: #fff;
        font-weight: bold;
      }
      .account {
        display: flex;
        align-items: center;
        gap: 12px;
        .a-name {
          font-size: 16px;
          color: #fff;
        }
      }
    }
  }
  .b {
    display: flex;
    justify-content: space-between;
    align-items: center;
    transform: translateY(-5px);
    .label {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .hot {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
  @media (max-width: 900px) {
    .t {
      .t-r {
        .title {
          font-size: 17px;
        }
        .account {
          .a-name {
            font-size: 14px;
            color: #fff;
          }
        }
      }
    }
    .b {
      .hot {
        display: none;
      }
    }
  }
`;
const Label = styled.div`
  border-radius: 30px;
  font-size: 16px;
  padding: 2px 16px;
  color: #000000;
  background: rgba(227, 233, 157, 1);
  @media (max-width: 900px) {
    font-size: 12px;
    padding: 2px 10px;
  } 
`;
const Icon = styled.a`
  position: relative;
  top: -20px;
  padding: 7px;
  display: inline-flex;
  border-radius: 20px;
  background-color: #373a53;
  margin-right: 8px;
  img {
    width: 72px;
    height: 72px;
  }
  .replaceImg {
    width: 72px;
    height: 72px;
  }
  @media (max-width: 900px) {
    margin-left: -4px;
    img {
      width: 60px;
      height: 60px;
    }
    .replaceImg {
      width: 60px;
      height: 60px;
    }
  }
`;

const src = "rainbow-bridge";

const accountId = "bluebiu.near";

return (
  <Card
    href={`/${src}`}
    style={{
      textDecoration: "none",
    }}
  >
    <Banner href={`/${src}`}>
      <img
        style={{
          opacity: 0.6,
        }}
        src={`https://ipfs.near.social/ipfs/bafkreiesfpcxxlyzlaqqd6uyhi77spbdxtjmriuwubfrhtgtqul44gta3e`}
      />
    </Banner>
    <Metadata>
      <div className="t">
        <Icon href={`/${src}`}>
          <img src="https://ipfs.near.social/ipfs/bafkreia75l4donjlz36m7lmdu3ymfeunk2bisfk73rvtqe55uqw7a5rhzq" />
        </Icon>
        <div className="t-r">
          <div className="title">NEAR-Ethereum Bridge </div>
          <div className="account">
            <Widget
              src="mob.near/widget/ProfileImage"
              props={{
                accountId,
                style: {
                  height: "16px",
                  width: "16px",
                },
                imageStyle: {
                  verticalAlign: "unset",
                },
              }}
            />
            <span className="a-name">{accountId}</span>
          </div>
        </div>
      </div>
      <div className="b">
        <div className="label">
          <Label>Bridge</Label>
        </div>
        <div className="hot">
          <img src="https://ipfs.near.social/ipfs/bafkreidey5fw6akzzi33hnqocyuk5a2saxra52nv3rzhlbpdzcfcwsziui"></img>
          <img src="https://ipfs.near.social/ipfs/bafkreidey5fw6akzzi33hnqocyuk5a2saxra52nv3rzhlbpdzcfcwsziui"></img>
          <img src="https://ipfs.near.social/ipfs/bafkreidey5fw6akzzi33hnqocyuk5a2saxra52nv3rzhlbpdzcfcwsziui"></img>
        </div>
      </div>
    </Metadata>
  </Card>
);
