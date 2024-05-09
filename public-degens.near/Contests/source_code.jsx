const tasks = [
  {
    category: "twitter",
    header: "Create Twitter Thread",
    created: "15.01.2024",
    budget: 700,
    text: "Spread the word about NEAR on Twitter! Please make sure that you have read the rules. Only unique Twitter threads created on a specific topic are allowed to be evaluated. If you have created multiple threads, fill out the form for each individual post. Max 3 threads from one member. Thank you and good luck ❤️",
    url: "https://public-degens-home.super.site/twitter",
  },
  {
    category: "reddit",
    header: "Create Reddit Post",
    created: "15.01.2024",
    budget: 400,
    text: "Create a post about Near Protocol on the specified subreddits. Avoid simple references to Near (example: Why Near the best?). Create engaging development content that will attract new members to the ecosystem. 3 posts from one member. Good luck ❤️",
    url: "https://public-degens-home.super.site/reddit",
  },
  {
    category: "articles",
    header: "Create Article",
    created: "15.01.2024",
    budget: 800,
    text: "Show your creative skills in creating articles! Please make sure that you have read the rules. Only unique articles created on a specific topic are allowed to be evaluated. Max one from one member. Thank you and good luck ❤️",
    url: "https://public-degens-home.super.site/articles",
  },
  {
    category: "video",
    header: "Create Video Content",
    created: "15.01.2024",
    budget: 800,
    text: "Create a video about Near Protocol. We welcome content about technology! Please make sure that you have read the rules. Only unique video created on a specific topic are allowed to be evaluated. Max one video from one member. Thank you and good luck ❤️",
    url: "https://public-degens-home.super.site/video",
  },
  {
    category: "memes",
    header: "Create Meme",
    created: "15.01.2024",
    budget: 300,
    text: "Create a meme about Near Protocol/NDC. A meme shouldn't be offensive, just a fan. Max 3 memes from one member. Thank you and good luck ❤️",
    url: "https://public-degens-home.super.site/memes",
  },
];

//******************************************************************************* */

const contractId = "public-degens.near";
const { accountId } = context;
State.init({ was: false });
const Welcome = styled.div`
  margin-top:50px;  
`;
const Button = styled.button`
  margin-top:30px;  
  width:150px;
  display: "flex";
  gap: 0.5rem;
  border-radius: 4px;
  border: 1px solid rgb(68, 152, 224);
  font-size: ${fontSize ? fontSize : "1.1rem"};
  background-color: ${secondary ? "#ddd" : "rgb(68, 152, 224)"};
  color: ${secondary ? "#000" : "#fff"};
  padding: 0.3rem 0.8rem;
  font-weight: ${fontWeight ? fontWeight : "400"};
  &:hover {opacity: 0.85;}
`;
Near.asyncView(contractId, "was", { account_id: accountId })
  .then((was) => {
    State.update({ was });
  })
  .catch((err) => {
    console.log(err);
    State.update({ error: err });
  });
const register = () => {
  return Near.call(contractId, "start", {});
};

if (!state.was) {
  if (state.error) return <Welcome>state.error</Welcome>;
  return (
    <Welcome>
      <h2>Welcome to Public Degens!</h2>
      <br />
      <div>
        <p>
          You can get involved in the Near Ecosystem development initiative
          right now.
        </p>
        <p>
          Click the button and choose a task that suits you. Make sure to read
          the rules, good luck ❤️
        </p>
      </div>
      <Button onClick={register} className={""}>
        Start
      </Button>
    </Welcome>
  );
}

const Card = styled.div`
  display:flex; flex-direction:column; align-items:stretch; font-size: 1.1rem;  border-radius: 1rem; 
  background-color: "lightblue !important"; &:hover {background-color: #d3ecf4;}
`;
const CardHeader = styled.div`
  display:flex; align-items:center;
  img {border-radius:0.3rem; width:4rem; height:4rem; margin:0.6rem;}
  h3 {flex: 1 1 auto;}
  svg {width:3rem; height:3rem; cursor:pointer; margin-right:1rem; &:hover {color: blue;}}
  &:last-child {flex: 1 1 auto;}
`;
const CardContent = styled.div`
  display:flex; flex-direction:column; flex: 1 1 auto;
  padding:0.6rem; align-items:stretch; flex-wrap: wrap; gap: 0.4rem;
  h3 {width:100%; font-size:1.4rem; font-weight:600; text-align:center;}
`;
const List = styled.div`
  display: flex; flex-direction: column; align-items: stretch; padding: 0.4rem 2rem; gap: 0.4rem;
`;
const Row = styled.div`
  display: flex; align-items: center;
  &:not(:last-child) {border-bottom: 1px dashed darkgrey;}
  > *:not(img) { flex: 1 1 12rem; padding: 0.2rem 0.4rem; }
  img {width: 2rem; height: 2rem;}
  svg {width: 1.4rem;height: 1.4rem;}
  .balance {text-align: right;}
  .symbol {min-width: 5rem;max-width: 5rem;text-overflow: ellipsis;overflow: hidden;}
`;
const Page = styled.div`
  display: flex; flex-direction: column; gap: 1rem; align-items: stretch; max-width: 50rem; margin: 0 auto 2rem;
  &::before {    
    background-image: url("https://arweave.net/qOfmpZZNqQ0bHBJ4UTgPC_pjvs1oYOjTAVwfxD8fd2o");
    content: ""; background-attachment: fixed; background-size: contain;
    position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; opacity: 0.6; z-index: -1;
  }
`;
const Category = styled.div`
  font-style: italic; font-size: 1.1rem; margin: 0 1rem; display: flex;
  flex-direction: column; align-items: center;
`;
const Header = styled.h1`
  margin-bottom: 0.5rem; text-align: center; padding: 1rem; font-weight: 600;
`;
const Content = styled.div`
  display: flex; flex-direction: column; gap: 1.5rem; align-items: stretch;
`;
const showTasks = () => (
  <Content>
    <List>
      {tasks
        .filter((e) => e.category === state.selected)
        .map((task, index) => {
          return (
            <Row key={task}>
              <div>
                <CardHeader>
                  <a href={task.url} target="_blank" rel="noreferrer noopener">
                    {task.header}
                    <svg viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                      ></path>
                    </svg>
                  </a>
                </CardHeader>
                <p>Created: {task.created}</p>
                <CardContent>{task.text}</CardContent>
                <p>Budget: {task.budget || 0}$</p>
              </div>
            </Row>
          );
        })}
    </List>
  </Content>
);
const selectCategory = (event) => {
  State.update({ selected: event.target.value });
};
State.init({ selected: state.selected ?? "articles" });
return (
  <Page>
    <Header>Public Degens</Header>
    <h4>✅Stage 1 is completed. The results will be published on March 18</h4>
    <Category>
      <span>Select category</span>
    </Category>
    <select onChange={selectCategory}>
      <option
        value="Select a task"
        selected={state.selected === "Select a task"}
      >
        Select a task
      </option>
      <option value="twitter" selected={state.selected === "twitter"}>
        Twitter
      </option>
      <option value="reddit" selected={state.selected === "reddit"}>
        Reddit
      </option>
      <option value="articles" selected={state.selected === "articles"}>
        Articles
      </option>
      <option value="video" selected={state.selected === "video"}>
        Video
      </option>
      <option value="memes" selected={state.selected === "memes"}>
        Memes
      </option>
    </select>
    {showTasks()}
  </Page>
);
