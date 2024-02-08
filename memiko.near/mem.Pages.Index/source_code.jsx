const { content, contractName } = props;

const symbols = {
  "memiko.near": "MEM",
  "ftv2.nekotoken.near": "NEKO",
  "token.lonkingnearbackto2024.near": "LONK",
  "blackdragon.tkn.near": "BLACKDRAGON",
  "memelol.near": "LOL",
  "token.0xshitzu.near": "SHITZU",
};
const symbolIndex = ["MEM", "NEKO", "LONK", "BLACKDRAGON", "LOL", "SHITZU"];

const Container = styled.div`
  width: 100%;
  height: max-content;
  overflow: hidden;
`;

const Section = styled.div`
  padding: 2rem 3rem;

  .text-sm {
    font-size: 0.9rem;
  }
`;

const GrayBlock = styled.div`
  background-color: #f5f5f5;
  border-radius: 12px;
`;

const [stats, setStats] = useState({
  remains: [],
  totalPackOpened: 0,
  totalParticipants: 0,
  startDate: 9999999999999,
});

const [history, setHistory] = useState([]);
const [total, setTotal] = useState({});
const [isWhitelisted, setIsWhitelisted] = useState(false);

const fetchStats = () => {
  const stats = Near.view(contractName, "get_total_info");
  setStats({
    remains: stats[0],
    totalPackOpened: stats[1],
    totalParticipants: stats[2],
    startDate: stats[3]
      ? new Big(stats[3] || 0).div(1000 * 1000).toNumber()
      : 0,
  });
};
const fetchWhitelist = () => {
  const whitelisted = Near.view(contractName, "is_whitelisted", {
    account_id: context.accountId,
  });
  setIsWhitelisted(whitelisted);
};

const fetchHistory = () => {
  const history = Near.view(contractName, "account_rewards", {
    account_id: context.accountId,
  });
  if (!history) return;

  const historyTransformed = history[0]
    .map((i, index) => {
      i["num"] = index + 1;
      return i;
    })
    .reverse();

  let total = {};
  historyTransformed.forEach((item) => {
    if (!total["memiko.near"]) {
      total["memiko.near"] = 0;
    }
    total["memiko.near"] += item.total_mem;

    if (item.token) {
      if (!total[item.token]) {
        total[item.token] = 0;
      }
      total[item.token] += item.total_token;
    }
  });

  setHistory(historyTransformed);
  setTotal(total);
};

fetchStats();

if (context.accountId) {
  fetchWhitelist();
  fetchHistory();
}

const getShareText = () => {
  let totalInfo = "";
  if (Object.keys(total).length > 0) {
    totalInfo = Object.keys(total)
      .map((key) => `${total[key]} ${symbols[key]}`)
      .join(", ");
  }

  return "https://twitter.com/intent/tweet?text=I%20just%20received%20____%20Memecoins%20on%20%40NEARProtocol%20from%20an%20pack%20open%21%20%F0%9F%9A%80%20%0Ahttps%3A%2F%2Fnear.org%2Fmemiko.near%2Fwidget%2Fmem.App%0A%0AJoining%20to%20share%20the%20MEM%20%23airdrop%20and%20excited%20to%20earn%20more%20with%20%40MemikoNEAR%21%20%F0%9F%8C%9F%0A%23memecoins%20%23memAirdropJoin".replace(
    "____",
    encodeURI(totalInfo),
  );
};

return (
  <Container className="d-flex flex-column gap-4">
    <Section className="p-0">
      <div
        className={"position-relative overflow-hidden"}
        style={{
          width: "100%",
          height: "186px",
          background: `no-repeat center url("https://bafybeihgspjbexzcuubc7w23dehnv4tm32ydgv6hbu4rqob2gfwmeazvjy.ipfs.nftstorage.link/1500x500-min.jpg")`,
          backgroundSize: "100%",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        }}
      >
        <div
          className="text-center title-font pt-5 position-relative"
          style={{ zIndex: 2 }}
        >
          <h1>Memiko</h1>
          <p>
            #1 NEAR Memecoin Community
            <span className={"px-1 opacity-50"}>|</span>
            <a href="https://twitter.com/MemikoNEAR" target={"_blank"}>
              Memiko Twitter
            </a>
          </p>
        </div>
        <div
          style={{
            backgroundColor: `rgba(255, 255, 255, 0.9)`,
            left: 0,
            right: 0,
            zIndex: 0,
          }}
          className={"position-absolute left-0 top-0 right-0 bottom-0"}
        ></div>
      </div>

      <div
        style={{
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          backgroundColor: `rgba(200, 200, 200, 0.2)`,
        }}
      >
        <div className="text-center title-font mb-6 py-3 px-6 text-sm">
          <p className={"mt-1 pt-1"}>
            Passionate about memecoins and staying up-to-date on the latest
            trends? Welcome to the NEAR Memecoin Community, your hub for all
            things memecoin!
          </p>
        </div>
      </div>
    </Section>

    <Section className="pt-10">
      <Widget
        src="memiko.near/widget/mem.Components.OpenPack"
        props={{
          contractName,
          isWhitelisted,
          startDate: stats.startDate,
        }}
      />
    </Section>

    <Section className="p-0">
      <GrayBlock>
        <div className="text-center mb-6 py-4 px-4">
          <h2 className={"mb-3"}>My Pack History</h2>
          {Object.keys(total).length > 0 && (
            <p className={"text-center mb-2 mt-0 pt-0"}>
              <small className={"text-sm"} style={{ opacity: "0.7" }}>
                TOTAL:
              </small>{" "}
              {Object.keys(total).map((key) => (
                <span key={key} className={"mx-2"}>
                  {total[key]}{" "}
                  <small className={"text-sm"} style={{ opacity: "0.7" }}>
                    {symbols[key]}
                  </small>
                </span>
              ))}
            </p>
          )}

          <div className={"mb-3"}>
            {history.length > 0 ? (
              <>
                <p className={"mb-4 pb-2"}>
                  <a
                    href={getShareText()}
                    target={"_blank"}
                    style={{
                      borderRadius: "10px",
                      padding: "10px 20px",
                      backgroundColor: "#66a0ff",
                      fontWeight: "bold",
                      color: "#FFFFFF",
                      display: "inline-block",
                      fontSize: "1rem",
                    }}
                  >
                    Share to join MEM Airdrop
                  </a>
                </p>
                <div
                  className={
                    "d-flex flex-row flex-wrap text-center gap-4 mx-auto"
                  }
                  style={{ justifyContent: "center" }}
                >
                  {history.map((item) => (
                    <div
                      className={"bg-white p-3"}
                      style={{
                        width: "250px",
                        borderRadius: "8px",
                        border: "1px solid #DDD",
                      }}
                    >
                      <small style={{ color: "#279b30" }}>
                        My Pack #{item.num}
                      </small>
                      <hr
                        className={"p-0 mt-2 mb-3"}
                        style={{ opacity: "0.1" }}
                      />
                      <p className={"p-0 m-0"}>
                        {parseInt(item.total_mem)}{" "}
                        <small className={"text-sm"} style={{ opacity: "0.7" }}>
                          MEM
                        </small>
                      </p>
                      {item.token && (
                        <p className={"p-0 m-0"}>
                          {item.total_token}{" "}
                          <small
                            className={"text-sm"}
                            style={{ opacity: "0.7" }}
                          >
                            {symbols[item.token]}
                          </small>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className={"opacity-50 text-sm"}>*No pack open history</p>
            )}
          </div>
        </div>
      </GrayBlock>
    </Section>

    {stats && stats.remains.length > 0 && (
      <Section className="pt-10">
        <div className={"text-center"}>
          <h2>Statistics</h2>
          <p className={"mt-4"}>
            <span className={"mx-2"}>
              Opened Packs: {stats.totalPackOpened}
            </span>
            <span className={"mx-2"}>
              Participants: {stats.totalParticipants}
            </span>
          </p>

          <p>Tokens Left:</p>
          <p className={"text-sm mt-0 pt-0"}>
            {stats.remains.map((item, index) => (
              <span className={"mx-2"}>
                {item} {symbolIndex[index]}
              </span>
            ))}
          </p>
        </div>
        <hr className={"mt-4"} />
      </Section>
    )}

    <Section className={"text-center"}>
      <h2>MEM Token Info</h2>
      <p className={"mt-3"}>
        Total Supply: <b>1,000,000,000 MEM</b>{" "}
        <span className={"px-1 opacity-50"}>|</span> 100% decentralised
      </p>

      <img
        src="https://bafybeicuxy342lm5f3vv3zuki7relrgecuaxhcicv4rh5rqeuvfxh7f3ga.ipfs.nftstorage.link/tokenomics.jpg"
        style={{ width: "60%", margin: "auto", opacity: "0.9" }}
        alt={"tokenomic"}
      />
      <p className={"text-sm opacity-50"}>
        *Memes Support - send 2% MEM tokens to existing NEAR memecoins and
        communities.
      </p>
    </Section>

    <Section
      className="d-flex flex-column align-items-center justify-content-center pb-0 mb-0"
      color="#efefef"
    >
      <GrayBlock>
        <div style={{ width: "70%", margin: "auto" }} className={"py-4"}>
          <div className="text-center font mt-2">
            <h2>About Memiko</h2>
          </div>
          <div className="d-flex my-4 flex-column w-100 gap-2 text-sm">
            <p>
              Memiko is Memecoin Community, your prime hub for everything
              related to memecoins on the NEAR blockchain. We're a community of
              memecoin enthusiasts who are passionate about staying up-to-date
              on the latest trends and opportunities in the memecoin universe.
            </p>
            <p className={"m-0 p-0"}>
              💰 <b>Stay Turned and Earn on Memecoins:</b> Join our vibrant
              community to keep a close eye on the ever-evolving world of
              memecoins. Get real-time updates on new launches, market trends,
              and exciting opportunities to earn while having a blast with
              fellow memecoin enthusiasts.
            </p>
            <p className={"m-0 p-0"}>
              🚀 <b>Supporting New Projects:</b> At NEAR Memecoin Community, we
              believe in fostering innovation. We're committed to supporting and
              promoting new memecoin projects that bring something unique to the
              table. Be the first to discover hidden gems and revolutionary
              memecoin ideas!
            </p>
            <p className={"m-0 p-0"}>
              📢 <b>Latest Updates Straight to Your Feed:</b> Don't miss a beat!
              We curate and deliver the freshest memecoin updates directly to
              your twitter feed. From meme-worthy moments to groundbreaking
              announcements, be in the loop and share the excitement with your
              fellow community members.
            </p>
            <p className={"m-0 p-0"}>
              🎉 <b>Special Events and Giveaways:</b> Get ready for exclusive
              events and airdrops that are bound to elevate your memecoin
              journey. Participate in fun challenges, win amazing prizes, and
              connect with a community that shares your passion for all things
              memecoin!
            </p>
            <hr style={{ opacity: "0.1" }} />
            <p className={"mt-2 p-0"}>
              🎁 <b>MEM Packs:</b> our community mint 58% MEM tokens from packs,
              priced at 0.25 NEAR/pack on first-come, first-served basis. There
              is no team allocation, ensuring that MEM tokens will be fully
              decentralized!
            </p>
            <p>
              <b>
                Received NEAR tokens will be allocated for the creation of
                MEM/NEAR Liquidity Pool, which is planned to be established a
                few days after the last pack open.
              </b>
            </p>
            <p>
              Addresses on the whitelist can receive between 12,000 and 16,000
              MEM tokens from each pack, while those not on the whitelist get
              between 6,000 and 8,000 MEM tokens. Additionally, the first packs
              offer a chance to obtain a random amount of one of the existing
              NEAR memecoins: NEKO, LONK, BLACKDRAGON, LOL, or Shitzu. These
              memecoins are distributed across 1,000 packs each, with a total of
              5,000 packs containing memecoin bonus.
            </p>
          </div>
        </div>
      </GrayBlock>
    </Section>
  </Container>
);
