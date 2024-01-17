// Get the user's accountId
const accountId = context.accountId;

// Declaring variables
const voteId = 0;
const [passcodeEntered, setPasscodeEntered] = useState("");
const [candidate, setCandidate] = useState(0);
const [party, setparty] = useState(0);

// All the votes
const [allVotes, setAllVotes] = useState([]);
const [voteToRender, setVoteToRender] = useState([]);
const [opened, setOpened] = useState(false);

// Pages that will be displayed in the aside
const [pages, setPages] = useState([
  {
    name: "Voting Page",
    link: `https://near.org/abnakore.near/widget/App.jsx?vote=${voteToRender.id}`,
  },
  {
    name: "Result",
    link: `https://near.org/abnakore.near/widget/Result.jsx?vote=${voteToRender.id}`,
  },
  //   { name: "Log out", link: "https://near.org/signin" },
]);

// Add admin pages if the user is the creator of the vote
useEffect(() => {
  console.log(
    "Is Admin?",
    voteToRender.creator,
    accountId,
    voteToRender.creator === accountId
  );
  if (voteToRender.creator === accountId) {
    setPages([
      {
        name: "Voting Page",
        link: `https://near.org/abnakore.near/widget/App.jsx?vote=${voteToRender.id}`,
      },
      {
        name: "Result",
        link: `https://near.org/abnakore.near/widget/Result.jsx?vote=${voteToRender.id}`,
      },
      {
        name: "Admin Home",
        link: `https://near.org/abnakore.near/widget/AdminHome?vote=${voteToRender.id}`,
      },
      {
        name: "Manage Candidates",
        link: `https://near.org/abnakore.near/widget/ManageCandidates?vote=${voteToRender.id}`,
      },
      {
        name: "Mange Parties",
        link: `https://near.org/abnakore.near/widget/ManageParties?vote=${voteToRender.id}`,
      },
    ]);
  } else {
    setPages([
      {
        name: "Voting Page",
        link: `https://near.org/abnakore.near/widget/App.jsx?vote=${voteToRender.id}`,
      },
      {
        name: "Result",
        link: `https://near.org/abnakore.near/widget/Result.jsx?vote=${voteToRender.id}`,
      },
    ]);
  }
}, [voteToRender.creator === accountId]);

// Get all the votes
const votesData = Social.get(`abnakore.near/votes`);
useEffect(() => {
  if (votesData === undefined) {
    // Set the votes to an empty list if there is no votes
    setAllVotes([]);
  } else {
    setAllVotes(JSON.parse(votesData));
  }
  setVoteToRender(allVotes[voteId]);
}, [votesData === null]);

// Set the vote to be rendered
useEffect(() => {
  setVoteToRender(allVotes[voteId]);
}, [allVotes]);

// List of candidates and their curresponding number of votes
// const [candidates, setCandidates] = useState(voteToRender.candidates);

// Get the candidates data
// const cands = Social.get(`abnakore.near/candidates`);

// useEffect(() => {
//   if (cands === undefined) {
//     // Set the candidate to an empty list if there is no candidate
//     setCandidates([]);
//   } else {
//     setCandidates(JSON.parse(cands));
//   }
// }, [cands === null]);

const [state, setState] = useState({
  show_message: false,
  show_error_on_dropdown: false,
  show_error_on_passwordInput: false,
});

// Hashing function
function hash(text) {
  var hashed = "";
  for (var i = 0; i < text.length; i++) {
    // console.log(text.charAt(i), "=", text.charCodeAt(i));
    hashed += text.charCodeAt(i);
  }
  //   console.log(hashed);
  return hashed;
}

// Check the entered passcode if it is correct
function checkPasscode() {
  const hashedPasscode = hash(passcodeEntered);
  if (hashedPasscode === voteToRender.passcode) {
    console.log("true");
    setOpened(true);
    return true;
  } else {
    console.log("false");
    setState({
      ...state,
      show_error_on_passwordInput: true,
    });
    return false;
  }
}

// Users that already voted
const [voted, setVoted] = useState([1]);

// Functions
function vote() {
  if (candidate > 0) {
    // console.log(context.accountId);
    // console.log(voted);
    // setCandidates([...candidates]);
    setState({
      ...state,
      show_message: true,
    });
    setVoted((prev) => prev.concat([context.accountId]));
  } else {
    // Set an error on the dropdown
    setState({
      ...state,
      show_error_on_dropdown: true,
    });
  }
}

// Update the value of the dropdowns when changed
function updateDropdown(e) {
  setCandidate(e.target.value);
  setparty(e.target.value);
  // Remove the error on the dropdown
  setState({
    ...state,
    show_error_on_dropdown: false,
  });
}

// Get the current date and time
function getDateTime() {
  var now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
}

//  Format the date and time (January 7, 2024 at 5:57 PM)
function formatDateTime(dateTimeString) {
  // Assuming you have a date-time input with the format "YYYY-MM-DDTHH:mm" as a string
  const dateTime = new Date(dateTimeString);

  // Formatting the date and time in 12-hour format
  const formattedDateTime = dateTime.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true, // Set to true for 12-hour format
  });

  return formattedDateTime;
}

// check if the vote is ongoing
function isOngoing() {
  return voteToRender.closeTime !== ""
    ? Date.parse(voteToRender.openTime) <= Date.parse(getDateTime()) &&
        Date.parse(voteToRender.closeTime) > Date.parse(getDateTime())
    : Date.parse(voteToRender.openTime) <= Date.parse(getDateTime());
}
const [ongoing, setOngoing] = useState(isOngoing());

// // Re check if it is ongoing every 1 sec
useEffect(() => {
  const interval = setInterval(() => {
    setOngoing(isOngoing());
  }, 1000);
  return () => clearInterval(interval);
}, [voteToRender]);

const secText = styled.h3`
    text-align: center;
`;
return (
  <>
    {accountId ? (
      <Widget
        src="abnakore.near/widget/Wrapper"
        props={{
          body: (
            <div className="main-body">
              {/* Check if the vote exists(i.e allVotes[voteId] exists) */}
              {voteToRender ? (
                <div className="two-sides">
                  {/* The Aside bar that helps in quick navigation btw pages */}
                  <Widget
                    src="abnakore.near/widget/Aside"
                    props={{ objs: pages, active: "/" }}
                  />

                  {/* Check if the vote is ongoing */}
                  {!ongoing === true ? (
                    // Check if the vote has password
                    voteToRender.passcode === "" || opened ? (
                      <div className="body-contents">
                        <i>
                          <svg
                            width="64px"
                            height="64px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              <path
                                d="M4 6H20M4 12H20M4 18H20"
                                stroke="#fefefe"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                            </g>
                          </svg>
                        </i>
                        <h1>{voteToRender.name}</h1>
                        <p>
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Accusamus, et, enim doloribus ea iure nisi
                          nostrum voluptatem quasi unde debitis, dolorem quidem
                          dolore sunt soluta exercitationem placeat incidunt
                          earum. Rem et nam, maxime ratione eveniet error
                          blanditiis eius non dolor itaque officia sint
                          veritatis sunt animi iusto voluptatibus numquam. Nihil
                          magnam repellat deleniti laboriosam quaerat rerum
                          incidunt est aperiam, enim exercitationem asperiores,
                          quia impedit nobis quasi neque? Veritatis, fuga et
                          doloremque, aspernatur enim reiciendis fugit obcaecati
                          facilis ratione voluptas perferendis expedita dolor.
                          Iusto nisi quod culpa tempora nostrum eum laudantium
                          magni, voluptas delectus pariatur distinctio magnam,
                          vel saepe dolor molestiae amet nesciunt. Cumque, quod?
                          Consequuntur quaerat laudantium adipisci. Veritatis,
                          dolor veniam impedit fugiat inventore tenetur officiis
                          tempore architecto voluptate aspernatur debitis
                          molestias obcaecati explicabo nemo deleniti ducimus,
                          sed incidunt, sint eum eaque hic. Ipsum dignissimos
                          explicabo totam sapiente tempora excepturi ea quo nemo
                          cum placeat sequi voluptas et ipsam minus possimus
                          ullam, est, aliquam rem officia quisquam unde nam
                          quam? Animi optio dolore quasi voluptate eum cumque
                          enim sint placeat beatae, omnis ex magnam consequatur
                          libero deleniti ipsum nihil labore sed accusamus est
                          atque illum sunt mollitia. Sapiente, iusto! Dolores
                          laborum impedit aut! Ut, repudiandae magni voluptatem
                          ratione ipsum soluta. Voluptas, aliquam! Commodi, quo
                          iusto repellat assumenda illum ut! Nesciunt tenetur
                          accusantium nisi facilis quam, accusamus, nemo officia
                          cumque odio dolorum, voluptatum aperiam numquam! Ex
                          similique facilis corporis temporibus repudiandae quos
                          quibusdam in labore cupiditate inventore, nihil
                          asperiores doloribus, tempora dolore fuga autem saepe
                          porro quod. Temporibus, cum, ea aut asperiores tempore
                          sit, alias enim praesentium minima doloremque
                          excepturi? Recusandae, sapiente cumque. Nihil ut,
                          reprehenderit dolores non minima quas nobis velit odit
                          est deserunt nulla incidunt dolor dicta beatae. Culpa
                          cumque quaerat, veritatis expedita nobis perferendis?
                          Explicabo laudantium repellat, sint voluptatibus nulla
                          cum tempore ipsum eaque autem itaque natus quod!
                          Deleniti neque officia inventore facere necessitatibus
                          eveniet, quisquam quidem consectetur, cum consequuntur
                          quibusdam quis dolorum facilis in vitae? Ratione
                          explicabo, at corporis hic sequi, doloremque facere
                          quia dolorem, quae tempora inventore soluta! Quisquam
                          voluptas voluptatibus non delectus iusto facere
                          mollitia voluptates ullam, quo aliquid soluta omnis
                          optio tempore eum, accusamus necessitatibus possimus
                          animi laboriosam eaque! Similique fugit tempora
                          voluptatum eligendi unde vitae perferendis rerum
                          velit? Aliquid nesciunt similique corrupti numquam
                          molestias, dolores commodi molestiae aut enim vel
                          eaque doloremque voluptate eveniet voluptatem ab sint
                          tempore nostrum officia soluta velit neque quis quae.
                          Odio nemo voluptatem exercitationem ducimus omnis
                          maiores animi illum. Assumenda et iure iusto sed
                          alias, eum aliquid quod ex ea iste, provident
                          perspiciatis? Facilis facere autem deleniti accusamus,
                          doloremque sequi iure mollitia? Architecto doloremque
                          veniam, eveniet optio officiis expedita officia
                          nesciunt velit! Facere quibusdam ratione neque, omnis
                          tempore fuga reprehenderit quae autem veniam quidem!
                          Incidunt illo officiis tenetur dolorum itaque
                          repudiandae, illum labore sapiente minima, ea
                          voluptate accusantium reprehenderit esse molestiae,
                          deserunt reiciendis unde aut nobis perspiciatis
                          temporibus. Quisquam, blanditiis consectetur ipsum
                          quasi eius ad id fugit cupiditate culpa reprehenderit
                          cumque, laudantium delectus magnam consequuntur
                          sapiente! Officia laudantium adipisci inventore
                          molestias alias itaque beatae dolores corporis
                          quibusdam. Mollitia consectetur nulla laboriosam
                          laborum a id possimus iusto asperiores earum itaque
                          suscipit aliquid, excepturi, quam labore quia corporis
                          quos iure alias cumque et soluta quo. Alias earum
                          labore eligendi maiores est ad totam modi aliquid rem,
                          odit tempore nisi sapiente, suscipit, voluptas
                          similique animi consequatur ipsum recusandae eum
                          incidunt qui blanditiis doloribus assumenda repellat.
                          Odio voluptatum provident explicabo commodi velit
                          suscipit aut temporibus cupiditate! Incidunt saepe
                          ratione sunt distinctio dolor, quas quis optio quam
                          harum. Architecto eos ea ipsum unde nostrum eligendi
                          sit eveniet, nobis dolor minima delectus reiciendis
                          dolorem vero pariatur obcaecati minus accusantium
                          totam, voluptas, debitis nulla suscipit? Incidunt
                          illum sunt eum officiis beatae dignissimos distinctio
                          ex voluptatum qui porro velit aliquam hic quam,
                          asperiores maiores iure sint vel debitis adipisci et
                          quibusdam fugiat, aperiam, a cupiditate? Quibusdam,
                          totam expedita. Consectetur unde placeat, sed quaerat
                          repudiandae a consequatur minus fugiat tempore iste
                          dolore accusamus earum cum, reiciendis explicabo nulla
                          adipisci animi vitae nihil fugit distinctio,
                          temporibus maxime. Nesciunt sapiente porro a repellat
                          minima, fugit beatae corrupti quibusdam distinctio
                          nisi fuga at placeat atque, magnam alias temporibus
                          nobis odio tempore? Libero non magnam rem impedit
                          eaque officia incidunt excepturi mollitia harum
                          corrupti. Officiis neque vitae, autem facere quaerat
                          rerum dolores? Facere culpa aliquid ut, harum tenetur
                          ullam reprehenderit ratione consectetur quis enim
                          blanditiis labore facilis temporibus adipisci atque
                          recusandae maiores qui optio, sit et est minima
                          corrupti nam. Voluptas optio neque totam dolorem eaque
                          repellendus placeat quas dignissimos aliquid
                          voluptates nihil commodi cum tempora, maxime porro
                          numquam dolores ut, a minus ipsum sit suscipit. Sequi
                          voluptatem, aperiam molestiae praesentium illum iusto
                          quos earum fuga odio ab recusandae tempora? Magnam
                          consequatur nostrum maiores eligendi error vitae odio
                          expedita, suscipit dolore. Dolorum, omnis esse quam
                          quisquam repellat sint quae dignissimos quo. Illo,
                          repellat placeat. Doloribus, unde, beatae repellat
                          animi corrupti dolore autem nostrum illo tempora
                          accusamus suscipit soluta a. Repellat temporibus
                          repellendus blanditiis mollitia ratione, dolore,
                          quibusdam explicabo ea maxime totam facere molestias
                          corrupti nemo, voluptatem quasi cupiditate omnis in
                          sit perspiciatis. Porro, odit eos et iure, quae
                          pariatur aut nisi ratione quam harum iste! Saepe,
                          inventore adipisci. Sapiente voluptatum minus tempora
                          itaque voluptates eveniet dolores praesentium porro,
                          placeat autem illo, excepturi rem explicabo aliquid
                          odit dolorem maiores hic dignissimos ipsa vitae
                          obcaecati? Assumenda nihil rerum beatae enim qui
                          cumque esse ipsum architecto, suscipit modi fugiat ut
                          eveniet similique facere, veritatis delectus id
                          blanditiis illo ducimus dolor necessitatibus sapiente?
                          Ipsa magni ut eaque minus, aliquid cumque magnam nam
                          perspiciatis autem modi repellat repellendus
                          reprehenderit inventore eligendi officiis dolore
                          provident omnis mollitia facere tempore maxime
                          sapiente! Possimus quaerat nemo est adipisci?
                          Voluptatum et quasi alias aut ullam voluptate.
                          Doloremque possimus rerum quidem repudiandae sint
                          laborum, dolores vel a odit quae quam harum. Eaque
                          ipsa fuga enim aperiam nemo sint dolorum, ad
                          consequatur nisi? Ea deserunt earum debitis laudantium
                          dolores deleniti molestias ducimus vero ratione
                          dolorem distinctio iusto, officiis suscipit enim
                          voluptas fugiat nulla perferendis illum architecto
                          beatae quam odit unde. Rem laborum culpa quasi, ex
                          sequi dolorem illo sint reprehenderit possimus
                          adipisci.
                        </p>
                        <p
                          style={{
                            color: "green",
                            display: voteToRender.voters.includes(
                              context.accountId
                            )
                              ? "block"
                              : "none",
                          }}
                        >
                          You Have Succesfully Voted
                        </p>
                        <div className="card">
                          <div className="flex">
                            <select
                              disabled={
                                voteToRender.voters.includes(context.accountId)
                                  ? true
                                  : false
                              }
                              className={`drop-down ${
                                state.show_error_on_dropdown ? "error" : ""
                              }`}
                              value={candidate}
                              onChange={updateDropdown}
                              name="candidate"
                              required
                            >
                              <option className="option" value={0}>
                                Select by Candidate
                              </option>
                              {voteToRender.candidates.map((candidate, i) => (
                                <option
                                  className="option"
                                  key={candidate.id}
                                  value={i + 1}
                                >
                                  {candidate.name}
                                </option>
                              ))}
                            </select>
                            OR
                            <select
                              disabled={
                                voteToRender.voters.includes(context.accountId)
                                  ? true
                                  : false
                              }
                              className={`drop-down ${
                                state.show_error_on_dropdown ? "error" : ""
                              }`}
                              value={party}
                              onChange={updateDropdown}
                              name="party"
                              required
                            >
                              <option className="option" value={0}>
                                Select by Party
                              </option>
                              {voteToRender.parties
                                .filter((party) =>
                                  voteToRender.candidates
                                    .map((c) => c.party)
                                    .includes(party.acronym)
                                )
                                .map((party, i) => (
                                  <option
                                    className="option"
                                    key={party.acronym}
                                    value={i + 1}
                                  >
                                    {party.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <button
                            disabled={
                              voteToRender.voters.includes(context.accountId)
                                ? true
                                : false
                            }
                            onClick={vote}
                          >
                            Vote
                          </button>

                          <p
                            id="thanks"
                            className={`read-the-docs ${
                              state.show_message ? "" : "hide"
                            }`}
                          >
                            Thank you for voting
                            {voteToRender.candidates[candidate - 1].name}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="body-contents">
                        <div className="form">
                          <secText>Please Enter Passcode</secText>
                          <p
                            className="error"
                            style={{
                              color: "red",
                              display: state.show_error_on_passwordInput
                                ? "block"
                                : "none",
                              textAlign: "center",
                            }}
                          >
                            The Password you entered is incorrect
                          </p>
                          <Widget
                            src="abnakore.near/widget/Input.jsx"
                            props={{
                              type: "password",
                              placeholder: "Enter Passcode",
                              required: true,
                              otherAttributes: {
                                value: passcodeEntered,
                                autoFocus: true,
                                onChange: (e) => {
                                  setPasscodeEntered(e.target.value);
                                },
                              },
                            }}
                          />
                          <button onClick={checkPasscode}>Submit</button>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="body-contents">
                      {voteToRender.closeTime !== ""
                        ? Date.parse(voteToRender.openTime) <=
                            Date.parse(getDateTime()) &&
                          Date.parse(voteToRender.closeTime) >
                            Date.parse(getDateTime())
                        : Date.parse(voteToRender.openTime) <=
                          Date.parse(getDateTime())}
                      {/* If the vote has not been started */}
                      {Date.parse(voteToRender.openTime) >
                      Date.parse(getDateTime()) ? (
                        <>
                          <h1>
                            This vote will start on: <br />
                          </h1>
                          <h3>{formatDateTime(voteToRender.openTime)}</h3>
                        </>
                      ) : (
                        <>
                          <h1>
                            The vote has been ended on: <br />
                          </h1>
                          <h3>{formatDateTime(voteToRender.closeTime)}</h3>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="body-contents">
                  <h1>Vote Doesn't exist</h1>
                </div>
              )}
            </div>
          ),
        }}
      />
    ) : (
      <Widget src="abnakore.near/widget/SignIn.jsx" props={props} />
    )}
  </>
);
