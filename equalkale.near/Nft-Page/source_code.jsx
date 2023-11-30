const items = {
  data: {
    mb_views_nft_tokens: [
      {
        nft_contract_id: "yeeehaw.mintbase1.near",
        title: "Frog",
        description: null,
        media:
          "https://arweave.net/sL07YfYHSnquvcTumKu2mlsUUjbCEGUQGPMFfdc1tHw",
        last_transfer_receipt_id:
          "4dQhe9bdEJ2gbt3PMVgHVKhCL7BDieYGa6MygSE5HiWu",
      },
      {
        nft_contract_id: "2022.mintbase1.near",
        title: "f",
        description: "f",
        media:
          "https://arweave.net/z6L6IigyvKxLwSp4DYi6Z9dgpoM32a5iNLBvEXoDLZw",
        last_transfer_receipt_id:
          "ECJmHNSYVpEWU8kNLfrXPQjc5JjgaTJA8jH71kkwUEj7",
      },
      {
        nft_contract_id: "affiliatedirect.mintbase1.near",
        title: "Test buying with this!",
        description:
          "We'll make this price low to test out the AffiliateDirect process.",
        media:
          "https://arweave.net/yvA-YSaLCpbRivCs0Q77Pi10XgO8MJktruX7IDOC-FA",
        last_transfer_receipt_id:
          "5vyf6xtdc8bZD7HYkeDJvt1bokbMFjdjWnvqoKZnmcqr",
      },
      {
        nft_contract_id: "x.paras.near",
        title: "Tina Turner #1",
        description: "Tina Turner",
        media: "bafybeibckaoultc22delvrcvifbfhpjza3vyz3ebktfcplosrrwnewyxqe",
        last_transfer_receipt_id:
          "2A8pyiGTBTfy4u8hkPa8Djc2FG8oEzFF8GXSpMD7evwi",
      },
      {
        nft_contract_id: "mint.sharddog.near",
        title: "MMC Investigators - 34",
        description:
          "The Murder Mystery Collective is the first ever solve-and-earn game built on the NEAR Protocol. Our community works together to find and reveal clues, solve puzzles, and solve murder mysteries! This Investigator Badge will gain you access to the community and a special role in our Discord server.",
        media:
          "https://nftstorage.link/ipfs/bafkreif7g76jre76i5mnjc2y63pidnfhfabdnik3naq2udvxjf2hhr3bui",
        last_transfer_receipt_id:
          "J25vFQSWnzYjGeyZA4V186pUkA8g1PY1qBbx41NQG3Lh",
      },
    ],
  },
};

const Wrapper = styled.div`
body {
  padding-top: 90px;
  font-family: "Poppins", sans-serif;
  margin: 0 100px;
}

.profile-header {
  background: #fff;
  width: 100%;
  display: flex;
  height: 190px;
  position: relative;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.2);
}

.profile-img {
  float: left;
  width: 340px;
  height: 200px;
}

.profile-img img {
  border-radius: 50%;
  height: 230px;
  width: 230px;
  border: 5px solid #fff;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  position: absolute;
  left: 50px;
  top: 20px;
  z-index: 5;
  background: #fff;
}

.profile-nav-info {
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 60px;
}

.profile-nav-info h3 {
  font-variant: small-caps;
  font-size: 2rem;
  font-family: sans-serif;
  font-weight: bold;
}

.profile-nav-info .address {
  display: flex;
  font-weight: bold;
  color: #777;
}

.profile-nav-info .address p {
  margin-right: 5px;
}

.profile-option {
  width: 40px;
  height: 40px;
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  outline: none;
  background: #68e79d;
  font-weight: bold;
}

.main-bd {
  width: 100%;
  display: flex;
  padding-right: 15px;
}

.profile-side {
  width: 300px;
  background: #fff;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
  padding: 90px 30px 20px;
  font-family: "Bree Serif", serif;
  margin-left: 10px;
  z-index: 99;
}

.profile-side p {
  margin-bottom: 7px;
  color: #333;
  font-size: 14px;
}

.profile-side p i {
  color: #e40046;
  margin-right: 10px;
}

.mobile-no i {
  transform: rotateY(180deg);
  color: #e40046;
}

.profile-btn {
  display: flex;
}


.profile-body {
  width: 100%;
  z-index: -1;
}

.tab {
  padding: 20px;
  width: 100%;
  text-align: center;
}

@media (max-width: 1100px) {
  .profile-side {
    width: 250px;
    padding: 90px 15px 20px;
  }

  .profile-img img {
    height: 200px;
    width: 200px;
    left: 50px;
    top: 50px;
  }
}

@media (max-width: 900px) {
  body {
    margin: 0 20px;
  }

  .profile-header {
    display: flex;
    height: 100%;
    flex-direction: column;
    text-align: center;
    padding-bottom: 20px;
  }

  .profile-img {
    float: left;
    width: 100%;
    height: 200px;
  }

  .profile-img img {
    position: relative;
    height: 200px;
    width: 200px;
    left: 0px;
  }

  .profile-nav-info {
    text-align: center;
  }

  .profile-option {
    right: 20px;
    top: 75%;
    transform: translateY(50%);
  }

  .main-bd {
    flex-direction: column;
    padding-right: 0;
  }

  .profile-side {
    width: 100%;
    text-align: center;
    padding: 20px;
    margin: 5px 0;
  }

  .profile-nav-info .address {
    justify-content: center;
  }

  .user-rating {
    justify-content: center;
  }
}

@media (max-width: 400px) {
  body {
    margin: ;
  }

  .profile-header h3 {
  }

  .profile-option {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 15px;
    top: 83%;
  }

  .profile-nav-info h3 {
    font-size: 1.9rem;
  }

  .profile-nav-info .address p,
  .profile-nav-info .address span {
    font-size: 0.7rem;
  }
}
#see-more-bio,
#see-less-bio {
  color: blue;
  cursor: pointer;
  text-transform: lowercase;
}
.tab h1 {
  font-family: "Bree Serif", sans-serif;
  display: flex;
  justify-content: center;
  margin: 20px auto;
}
`;

return (
  <Wrapper>
    <div class="profile-header">
      <div class="profile-img">
        <img
          src="https://image-cache-service-z3w7d7dnea-ew.a.run.app/small?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fomni-live.appspot.com%2Fo%2Fstore%252Fnearconminsta.mintbase1.near%253Aprofile%3Falt%3Dmedia%26token%3D99c42b64-ec70-43f0-8597-1d8b01f74fc8"
          width="200"
          alt="Profile Image"
        />
      </div>
      <div class="profile-nav-info">
        <h3 class="user-name">NEARCONN 23</h3>
        <div class="address">
          <p id="state" class="state">
            5:00
          </p>
        </div>
      </div>
      <div class="profile-option">
        <div class="notification">
          <span>Active</span>
        </div>
      </div>
    </div>

    <div class="main-bd">
      <div class="left-side">
        <div class="profile-side">
          <div class="user-bio">
            <h3>Poll Info</h3>
            <p class="bio">Contract: nearconminsta.mintbase1.near</p>
          </div>
          <div class="user-rating">
            <h3 class="rating">4.5</h3>
            <div class="rate">
              <div class="star-outer">
                <div class="star-inner">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                </div>
              </div>
              <span class="no-of-user-rate">
                <span>123</span>&nbsp;&nbsp;stars
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="right-side">
        <div class="profile-body">
          <div class="profile-posts tab d-block">
            <h1>NFTs</h1>

            <div class="container">
              <div class="row">
                {items.data.mb_views_nft_tokens.map((item) => (
                  <div class="col-4 m-1">
                    <div class="card">
                      <img
                        src={item.media ?? ""}
                        class="card-img-top"
                        alt="..."
                      />
                      <div class="card-body">
                        <h5 class="card-title">{item.title}</h5>
                        <p class="card-text">{item.description}</p>
                        <a href="#" class="btn btn-primary">
                          Vote
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Wrapper>
);
