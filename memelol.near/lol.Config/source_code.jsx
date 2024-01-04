return {
  contractName: "v0.memelol.near",
  assets: {
    banner:
      "https://ipfs.near.social/ipfs/bafkreicbrcwkkgpjpxf2xfs6toohwaj3d3rdbxbvswo2gcqyojtdvzeot4",
    bannerPrize:
      "https://ipfs.near.social/ipfs/bafkreiebsn7txjokoiy3iow6yucddk4magpl2u3eb7zwieprvpnrmb5dcy",
    logoNear:
      "https://ipfs.near.social/ipfs/bafkreia4zgx4r2msygesk4rfspz6zezy5cqhf6bij7mef7ca2xruh5xpqe",
    logoLol:
      "https://ipfs.near.social/ipfs/bafkreigpnfvioxwqaa6p5la7uc3xbkzt75veujo2se4ggpt7n56xrlgkdi",
    notbad:
      "https://ipfs.near.social/ipfs/bafkreigdtkkdgbutt4chd76g7d47v554mrgl3cjfmvc4xol6hvsun2oypi",
  },
  content: {
    shareLink:
      "https://twitter.com/intent/tweet?text=%F0%9F%9A%80%20First%20meme%20coin%20on%20%23BOS%20%23NEAR.%0A%F0%9F%8E%81%20Check%20out%20https%3A//near.org/memelol.near/widget/lol.App%0A%0Ahttps%3A//pbs.twimg.com/profile_banners/1641003428540186624/1704147817/1500x500%0A%0A%E2%86%97%EF%B8%8F%20%40LOLMemecoin%0A%40near_protocol%20%23memecoin%20%23lolmemecoin",
    prizes: [
      {
        amountLoL: "1,000 - 10,000",
        src: "https://ipfs.near.social/ipfs/bafkreidnkvrqwuamuln3j4utthvfc6xueqlim6ru5b2ytjlelnlbosqdqa",
        color: "#efefef",
      },
      {
        amountNear: 0.1,
        amountLoL: "100 - 1,000",
        src: "https://ipfs.near.social/ipfs/bafkreifnn6sr5mnyno4ves6eipwze2s3kzvjxrthb3gc4aokiw53vwrq4a",
        color: "rgb(255 214 255)",
      },
      {
        amountNear: 1,
        amountLoL: "100 - 1,000",
        src: "https://ipfs.near.social/ipfs/bafkreif6lnje5dn7iftutyidgyyn3fuxuga6dkrq27tz54tmi2mmhkafzq",
        color: "rgb(255 250 214)",
      },
      {
        amountNear: 10,
        amountLoL: "100 - 1,000",
        src: "https://ipfs.near.social/ipfs/bafkreig7vyzkeiayj23vf2ndgng4fdbrxsbn2egw3i64mnqrw6qkrskvqu",
        color: "rgb(112 238 255)",
      },
      {
        amountNear: 1000,
        amountLoL: "100 - 1,000",
        src: "https://ipfs.near.social/ipfs/bafkreiaf4ztsvri5e5slfbzmjpu5mccgjy555m6liuq3updthosjdade54",
        color: "#ff6565",
      },
    ],
    FAQ: [
      {
        question: "What is LOL Meme token?",
        answer: (
          <div className={"mt-3 mb-4"}>
            <p>
              LOL Memecoin aims to make the NEAR blockchain more fun by adding raffles where you can win prizes randomly. Our goal is to
              create an engaging ecosystem by integrating gamified elements for our community.
            </p>
            <p>
              We start our mission from unique token distribution: users can participate by opening boxes for 0.05 NEAR each, receiving
              random amounts of LOL tokens, and having the chance to win from a pool of 5551 premium boxes. These premium boxes contain
              different amounts of NEAR tokens, ranging from 0.1 NEAR to a jackpot of 1000 NEAR. This means that for just 0.05 NEAR, you
              have the chance to immediately receive 1000 NEAR!
            </p>
          </div>
        ),
      },
      {
        question: "How it works?",
        answer: (
          <div className={"mt-3 mb-4"}>
            <p>
              People participating in token distribution openning a boxes. Each box give you random amount of LOL tokens, and a chance to
              win NEAR tokens
              from premium boxes. There are five distinct box types, each offering varied rewards randomly drawn upon box opening:
            </p>

            <ul>
              <li>
                <b>Regular Box:</b> Contains 1000 - 10000 LOL tokens. Quantity: <b>44,449</b> boxes;
              </li>
              <li>
                <b>Premium Box #1:</b> Contains 100 - 1000 LOL tokens + <b>0.1 NEAR</b>. Quantity: <b>5000</b> boxes;
              </li>
              <li>
                <b>Premium Box #2:</b> Contains 100 - 1000 LOL tokens + <b>1 NEAR</b>. Quantity: <b>500</b> boxes;
              </li>
              <li>
                <b>Premium Box #3:</b> Contains 100 - 1000 LOL tokens + <b>10 NEAR</b>. Quantity: <b>50</b> boxes;
              </li>
              <li>
                <b>Premium Box #4:</b> Contains 100 - 1000 LOL tokens + <b>1000 NEAR</b>. Quantity: <b>1 box</b>;
              </li>
            </ul>

            <p>
              Upon opening a box, users instantly receive rewards in LOL and/or NEAR tokens, credited to their account.
            </p>
          </div>
        ),
      },
      {
        question: "How many Premium Boxes can users find?",
        answer: (
          <div className={"mt-3 mb-4"}>
            <p>
              There is <b>5551 premium boxes</b> in total and all premium boxes will be opened through the box opening phase.
              This process is designed to increase the chances of obtaining premium boxes compared to regular boxes until all premium boxes
              have been opened. This process ensures that all participants have an equal opportunity to receive premium rewards before the
              conclusion of the box opening phase.
            </p>
            <p>
              Each user can obtain up to 100 Premium Boxes. Additionally, you can earn more Premium Boxes through
              participation in our events. Further details on earning additional Premium Boxes can be found on our
              <a href="https://twitter.com/LOLMemecoin" target={"_blank"}>Twitter</a>.
            </p>
          </div>
        ),
      },
      {
        question: "What is the tokenomics and liquidity pool strategy?",
        answer: (
          <div>
            <p className={"font-semibold mt-3 mb-1"}><b>TOKENOMICS</b></p>
            <p>
              Total token supply of <b>777,777,777 LOL</b>, with <b>57.86%</b> allocated for boxes and <b>42.14%</b> for liquidity pool.
            </p>
            <p className={"mt-4 font-semibold mb-1"}><b>LIQUIDITY POOL</b></p>
            <p>
              After the box opening phase, a liquidity pool for the LOL/NEAR pair will be established on ref.finance. Initially, 50% of
              NEAR tokens received from boxes will be added to the LP, increasing by 10% weekly until it reaches 100%.
            </p>
            <p className={"mt-4 font-semibold mb-1"}><b>LOL TOKENS BURNING</b></p>
            <p>
              Any unclaimed LOL tokens from the box allocation (57.86%), after the last box is opened, will be burned.
            </p>
          </div>
        ),
      },
    ],
  },
};
