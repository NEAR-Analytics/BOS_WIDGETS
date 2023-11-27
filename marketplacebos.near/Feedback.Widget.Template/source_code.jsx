State.init({
  feedback: "",
  widget_id: props.widget_id,
  widget_link: props.widget_link,
  get_feedbacksList: [],
  accountId: props.accountId ?? context.accountId,
  selectedStars,
  star,
  account_id_star,
  average_star,
  get_starList: [],
});
const acc = "marketplacebos.near";
const contract = "marketplacebos.near";

const IMG = styled.img`
  width: 280px;
  height: 80px;
  object-fit: cover; /* Maintain aspect ratio and cover the container */
  margin: 0 auto; /* Center the image horizontally */
  display: block; /* Remove default inline display */
`;
//sss

const fetchData = () => {
  const result = Near.view(contract, "get_feedbacks", {
    widget_id: state.widget_id,
  });
  State.update({ get_feedbacksList: result });
};

fetchData();

const fetchData2 = () => {
  const result = Near.view(contract, "get_star", {
    widget_id: state.widget_id,
  });
  State.update({ get_starList: result });
};

fetchData2();

const onInputStar = ({ target }) => {
  State.update({ star: target.value });
};

const onInputFeedback = ({ target }) => {
  State.update({ feedback: target.value });
};

const onInputWidgetID = ({ target }) => {
  State.update({ widget_id: target.value || "magicbuild" });
};

const onInputWidgetLink = ({ target }) => {
  State.update({ widget_link: target.value || "app" });
};

const onInputaccountID = ({ target }) => {
  const accountId = props.accountId ?? context.accountId;
  State.update({ account_id_givefeedback: target.value || accountId });
};

// if (!messList || context.loading) {
//   return "Loading...";
// }

const addFeedback = () => {
  if (state.selectedStars > 5) {
    // Handle the error, you can show a message to the user
    console.error("You cannot give more than 5 stars.");
    return; // Stop further execution
  }
  const feedback = state.feedback;
  const widget_id = state.widget_id;
  const widget_link = state.widget_link;
  const account_id_givefeedback = state.accountId;
  const star = state.selectedStars; // Use the selectedStars value

  const message = {
    feedback: feedback,
    widget_id: widget_id,
    widget_link: widget_link,
    account_id_givefeedback: account_id_givefeedback,
    star: star,
  };

  Near.call("marketplacebos.near", "add_feedback", message);
};

const social = "https://near.social/";
const widget_name = props.widget_name || "Magicbuild";
const widget_link = props.widget_link || "magicbuild.near/widget/app";

const StyledButton = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.25);
  }
  &:active {
    transform: scale(1);
  }
`;

const StyledSVG = styled.svg`
  width: 50px;
  height: 50px;
  fill: none; /* You can use fill instead of stroke in styled-components */
  stroke: #4299e1; /* Replace with your desired color */
`;

const RatingContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 0.3rem;
  --stroke: #666;
  --fill: #ffc73a;
  }`;

const handleStarClick = (star) => {
  // Update the selectedStars state when a star is clicked
  State.update({ selectedStars: star });
};

const addStar = () => {
  // Use the selectedStars value as needed (e.g., send it to your addStar function)
  console.log("Selected Stars:", selectedStars);
};

const logo_links = prop.logo_links || "notfound";
function MyComponent() {
  return (
    <>
      <a href="https://near.social/fastui.near/widget/FastUI">
        <StyledButton title="Go Back">
          <StyledSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="1.5"
              d="M11 6L5 12M5 12L11 18M5 12H19"
            />
          </StyledSVG>
        </StyledButton>
      </a>
      <Div>
        <Div2>
        
          <Div3 href={`${social}${widget_link}`}>
            {" "}
            {widget_name}
          </Div3>
            <IMG src={logo_links} />

          <Div4>
            Get
            {state.get_starList &&
              state.get_starList.map((item, index) => (
                <Div17 key={index}>{item}/5★</Div17>
              ))}{" "}
          </Div4>
        </Div2>
        <Div8 />
        <div>
          <Div14>
            <Div15>
              {state.get_feedbacksList &&
                state.get_feedbacksList.map((item) => (
                  <>
                    <Div16
                      href={`https://near.org/near/widget/ProfilePage?accountId=${
                        item.split(" said ")[0]
                      }`}
                    >
                      {item.split(" said ")[0]}
                    </Div16>
                    <Div17>{item.split(" said ")[1]}</Div17>
                  </>
                ))}
            </Div15>
          </Div14>
          <RatingContainer>
            <div>
              <div>
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    onClick={() => handleStarClick(index + 1)}
                    style={{
                      cursor: "pointer",
                      fontSize: "24px",
                      color: index < state.selectedStars ? "gold" : "gray",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <div></div>
            </div>
          </RatingContainer>
        </div>
        <Div9>
          <Div10
            placeholder="Add feedback..."
            onChange={onInputFeedback}
          ></Div10>
        </Div9>
        <Div11>
          <Div13 onClick={addFeedback}>Post</Div13>
        </Div11>

        <Div24></Div24>
      </Div>
    </>
  );
}

const Div = styled.div`
  border: 1px solid rgba(45, 57, 76, 0.1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 40px;
  @media (max-width: 991px) {
    padding:20px;
  }
`;

const Div2 = styled.div`
  align-self: stretch;
  display: flex;
  margin-top: 37px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
  }
`;

const Div3 = styled.a`
  color: #000;
  margin: auto 0;
  font: 700 14px/16px Helvetica, sans-serif;
`;

const Div4 = styled.div`
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const Div6 = styled.div`
  border-radius: 2px;
  border: 1px solid #cdd0d5;
  background-color: #f5f6f7;
  align-self: stretch;
  display: flex;
  justify-content: space-between;
  gap: 6px;
  padding: 8px 9px 8px 8px;
`;

const Div8 = styled.div`
  background-color: rgba(45, 57, 76, 0.1);
  align-self: stretch;
  margin-top: 35px;
  height: 1px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div9 = styled.div`
  align-self: stretch;
  display: flex;
  margin-top: 19px;
  align-items: start;
  justify-content: space-between;
  gap: 10px;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
  }
`;

const Div10 = styled.textarea`
    width:100%
  color: black;
  white-space: nowrap;
  align-self: stretch;
  flex-grow: 1;
  align-items: start;
  padding: 18px 13px 41px;
  font: 400 16px/18px Helvetica, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
    max-width: 100%;
  }
`;

const Div11 = styled.div`
  width: 100%;
  border: 1px solid rgba(45, 57, 76, 0.1);
  background-color: #fff4b0ff;
  align-self: center;
  display: flex;
  max-width: 497px;
  flex-direction: column;
  align-items: end;
  padding: 12px 10px 12px 80px;
  @media (max-width: 991px) {
    max-width: 100%;
    padding-left: 20px;
  }
`;

const Div12 = styled.div`
  display: flex;
  margin-right: 14px;
  width: 25px;
  max-width: 100%;
  gap: 5px;
  @media (max-width: 991px) {
    margin-right: 10px;
  }
`;

const Div13 = styled.button`
  border-radius: 4px;
    display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: 600;
  font-size: 23px;
  position: relative;
  color: white;
  background-image: linear-gradient(90deg, rgba(251,136,255,1) 0%, rgba(252,176,69,1) 100%);
  border: #ffac32ff;
  outline: none;
  text-align: center;
  text-decoration: none !important;

  &:hover {
    background: #ffd83e;
    cursor: pointer;
    color:white;

  }

  &::after {
    content: "";
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 6px;
    background: #ffd83e;
   
}
`;

const Div14 = styled.div`
  align-self: stretch;
  display: flex;
  margin-top: 20px;
  align-items: start;
  justify-content: space-between;
  gap: 10px;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
  }
`;

const Img5 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 48px;
  overflow: hidden;
  max-width: 100%;
`;

const Div15 = styled.div`
  display: flex;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
  align-items: start;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div16 = styled.a`
  color: #385898;
  align-self: stretch;
  white-space: nowrap;
  font: 700 12px/14px Helvetica, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
    white-space: initial;
  }
`;

const Div17 = styled.div`
  color: #000;
  align-self: stretch;
  margin-top: 8px;
  font: 400 12px/16px Helvetica, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div18 = styled.button`
  display: flex;
  margin-top: 9px;
  width: 75px;
  max-width: 100%;
  gap: 3px;
  @media (max-width: 991px) {
    justify-content: center;
  }
`;

const Div20 = styled.div`
  color: #000;
  font: 400 12px/14px Helvetica, sans-serif;
`;

const Div21 = styled.div`
  color: #4267b2;
  font: 400 12px/14px Helvetica, sans-serif;
`;

const Div22 = styled.div`
  color: #000;
  font: 400 12px/14px Helvetica, sans-serif;
`;

const Div23 = styled.div`
  color: #90949c;
  white-space: nowrap;
  font: 400 12px/14px Helvetica, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div24 = styled.div`
  align-self: start;
  display: flex;
  width: 350px;
  max-width: 100%;
  align-items: start;
  gap: 6px;
  margin: 10px 0 0 59px;
  @media (max-width: 991px) {
    margin-left: 10px;
    justify-content: center;
  }
`;

const Div25 = styled.div`
  background-color: rgba(144, 148, 156, 0.3);
  width: 1px;
  height: 61px;
`;

const Img6 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 36px;
  overflow: hidden;
  max-width: 100%;
`;

const Div26 = styled.div`
  display: flex;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
  align-items: start;
`;

const Div27 = styled.div`
  color: #385898;
  align-self: stretch;
  white-space: nowrap;
  font: 700 12px/14px Helvetica, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div28 = styled.div`
  color: #000;
  align-self: stretch;
  margin-top: 11px;
  font: 400 12px/16px Helvetica, sans-serif;
`;

const Div29 = styled.div`
  display: flex;
  margin-top: 12px;
  width: 88px;
  max-width: 100%;
  gap: 3px;
  @media (max-width: 991px) {
    justify-content: center;
  }
`;

const Div30 = styled.div`
  color: #4267b2;
  font: 400 12px/14px Helvetica, sans-serif;
`;

const Div31 = styled.div`
  color: #000;
  font: 400 12px/14px Helvetica, sans-serif;
`;

const Div32 = styled.div`
  color: #4267b2;
  font: 400 12px/14px Helvetica, sans-serif;
`;

const Div33 = styled.div`
  color: #000;
  font: 400 12px/14px Helvetica, sans-serif;
`;

const Div34 = styled.div`
  color: #90949c;
  white-space: nowrap;
  font: 400 12px/14px Helvetica, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div35 = styled.div`
  align-self: stretch;
  display: flex;
  margin-top: 15px;
  align-items: start;
  justify-content: space-between;
  gap: 10px;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
  }
`;

const Img7 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 48px;
  overflow: hidden;
  max-width: 100%;
`;

const Div36 = styled.div`
  display: flex;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
  align-items: start;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div37 = styled.div`
  color: #385898;
  align-self: stretch;
  white-space: nowrap;
  font: 700 12px/14px Helvetica, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
    white-space: initial;
  }
`;

const Div38 = styled.div`
  color: #000;
  align-self: stretch;
  margin-top: 11px;
  font: 400 12px/16px Helvetica, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div39 = styled.div`
  display: flex;
  margin-top: 9px;
  width: 120px;
  max-width: 100%;
  gap: 6px;
  @media (max-width: 991px) {
    justify-content: center;
  }
`;

const Div40 = styled.div`
  color: #4267b2;
  font: 400 12px/14px Helvetica, sans-serif;
`;

const Div41 = styled.div`
  color: #000;
  font: 400 12px/14px Helvetica, sans-serif;
`;

const Div42 = styled.div`
  color: #4267b2;
  font: 400 12px/14px Helvetica, sans-serif;
`;

const Div43 = styled.div`
  color: #000;
  font: 400 12px/14px Helvetica, sans-serif;
`;

const Div44 = styled.div`
  color: rgba(144, 148, 156, 0.6);
  white-space: nowrap;
  font: 400 12px/14px Helvetica, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div45 = styled.div`
  color: #fff;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #4777de;
  align-self: stretch;
  margin-top: 20px;
  align-items: center;
  padding: 18px 20px;
  font: 700 14px/16px Helvetica, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
    max-width: 100%;
  }
`;

const Div46 = styled.div`
  background-color: rgba(45, 57, 76, 0.1);
  align-self: stretch;
  margin-top: 14px;
  height: 1px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div47 = styled.div`
  align-self: start;
  display: flex;
  width: 153px;
  max-width: 100%;
  gap: 4px;
  margin: 10px 0 26px;
`;

const Img8 = styled.img`
  aspect-ratio: 0.92;
  object-fit: contain;
  object-position: center;
  width: 12px;
  overflow: hidden;
  max-width: 100%;
`;

const Div48 = styled.div`
  color: #385898;
  align-self: start;
  flex-grow: 1;
  white-space: nowrap;
  font: 400 11px/13px Helvetica, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

return <MyComponent />;
