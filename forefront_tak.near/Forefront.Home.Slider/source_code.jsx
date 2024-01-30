State.init({
  slide: [],
  whichSlide: 0,
});

const data = fetch(
  `https://api.flipsidecrypto.com/api/v2/queries/42e5121a-c5e6-48ec-91fb-1492e31d095c/data/latest`
);

let tableRows = [];
for (let i = 0; i < 4; i++) {
  const frank = data.body[i];
  //some avatarUrl are Null , so replace Nulls with the avatar below
  let avatarUrl;
  console.log(data.body);
  if (frank.avatarUrl) {
    avatarUrl = frank.avatarUrl;
  } else {
    avatarUrl = "https://s2.coinmarketcap.com/static/img/coins/64x64/6535.png";
  }

  // shorten the title that are more than 28 char
  let title;

  if (frank.title.length > 28) {
    title = frank.title.substring(0, 28) + "...";
  } else {
    title = frank.title;
  }

  // shorten the descriptions that are more than 70 char
  let description;

  if (frank.description.length > 70) {
    description = frank.description.substring(0, 70) + "...";
  } else if (frank.description.length < 1) {
    description =
      "No description found, please open the dashboard to see more information.";
  } else {
    description = frank.description;
  }

  // some screenshotUrl are Null, so replace the image below with Null
  let screenshotUrl;

  if (frank.screenshotUrl) {
    screenshotUrl = frank.screenshotUrl;
  } else {
    screenshotUrl = "https://i.postimg.cc/GtQ9pFK3/sdsdad.png";
  }

  //some usernames are long, use this part to substring the first part and last part of usernames (4 first char+...+last 4 char)
  let username;

  if (frank.username.length > 15) {
    username =
      frank.username.substring(0, 4) + "..." + frank.username.substring(38, 42);
  } else if (frank.username.length < 1) {
    username =
      "No description found, please open the dashboard to see more information.";
  } else {
    username = frank.username;
  }

  //make the Single digit to double digit (just for number < 10 )
  let number;

  if (i + pageto + 1 <= 9) {
    number = "0" + (pageto + i + 1);
  } else {
    number = pageto + i + 1;
  }

  // turn data into (month + year) format
  let date = new Date(frank.createdAt);
  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = monthNames[date.getMonth()];
  let year = date.getFullYear();
  let createdAt;
  createdAt = month + " " + year;

  tableRows.push({
    ...frank,

    number: number,
    username: username,
    screenshotUrl: screenshotUrl,
    description: description,
    title: title,
    avatarUrl: avatarUrl,
  });
}

const updateSlide = (table) =>
  State.update({
    slide: table,
  });

const updateWhichSlide = (val) =>
  State.update({
    whichSlide: val,
  });

updateSlide(tableRows);

const changeSlide = (type) => {
  let whichSlide = state.whichSlide;

  if (type == "right") {
    if (whichSlide <= 2) {
      whichSlide = whichSlide + 1;
    } else {
      whichSlide = 0;
    }
  } else {
    if (whichSlide == 0) {
      whichSlide = 3;
    } else {
      whichSlide = state.whichSlide - 1;
    }
  }
  updateWhichSlide(whichSlide);
};

const parentStyle = {
  background: props.backgroundColor,
  borderRadius: "25px",
  color: "white",
  maxWidth: "400px",
  minHeight: "300px",
  position: "relative",
  top: "0",
  color: props.textColor,
  textDecoration: "none",
  border: "black",
  "box-shadow": "0px 0px 10px -1px  #806ce1",
};

const linkStyle = {
  color: props.linkColor,
  textDecoration: "none",
};
const imageSectionStyle = {
  width: "100%",
  height: "200px",
  borderRadius: "25px 25px 0 0",
};

const contentSection = {
  padding: "0 25px 0 25px",
};

const avatarSection = {
  display: "flex",
};

const avatarSpan = {
  margin: "10px",
  textDecoration: "none",
  textColor: `${props.textColor}!important`,
};

const avatarImage = {
  maxWidth: "100px",
  maxHeight: "100px",
  borderRadius: "20px",
  marginTop: "-30px",
  padding: 10,
  "background-color": "#8EC5FC",
  "background-image": "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
};

const arrowRight = {
  position: "absolute",
  top: "50%",
  right: "-13px",
  background: "white",
  textAlign: "center",
  minWidth: "30px",
  minHeight: "30px",
  borderRadius: "25px",
  border: "#806ce1 1px solid",
  cursor: "pointer",
  "box-shadow": "0px 0px 10px -1px #806ce1",
};

const arrowLeft = {
  position: "absolute",
  top: "50%",
  left: "-13px",
  background: "white",
  textAlign: "center",
  minWidth: "30px",
  minHeight: "30px",
  borderRadius: "25px",
  border: "#806ce1 1px solid",
  cursor: "pointer",
  "box-shadow": "0px 0px 10px -1px #806ce1",
};
const titleStyle = {
  textDecoration: "none",
  color: `${props.titleColor}`,
};
const description = {
  display: "flex",
  textAlign: "left",
};

const descriptionParaghraph = {
  width: "90%",
  height: "80px",
};
return (
  <div>
    <div>
      {state.slide.map((frank, index) => {
        return (
          <>
            {index == state.whichSlide ? (
              <div style={parentStyle}>
                <div style={arrowRight} onClick={() => changeSlide("right")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                  >
                    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                  </svg>
                </div>
                <div style={arrowLeft} onClick={changeSlide}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                  >
                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                  </svg>
                </div>

                <div style={imageSectionStyle}>
                  <a style={linkStyle} href={frank.url} target="_blank">
                    <img style={imageSectionStyle} src={frank.screenshotUrl} />
                  </a>
                </div>
                <div style={contentSection}>
                  <div style={avatarSection}>
                    <span style={avatarSpan}>
                      <a href={`https://flipsidecrypto.xyz/${frank.username}`}>
                        <img style={avatarImage} src={frank.avatarUrl} />
                      </a>
                    </span>
                    <span style={avatarSpan}>
                      <a href={frank.url} style={titleStyle}>
                        <h5> {frank.title}</h5>
                      </a>
                      <a
                        style={linkStyle}
                        href={`https://flipsidecrypto.xyz/${frank.username}`}
                        target="_blank"
                      >
                        {frank.createdAt}
                      </a>
                    </span>
                  </div>
                  <div style={description}>
                    <p style={descriptionParaghraph}> {frank.description}</p>
                  </div>
                </div>
              </div>
            ) : null}
          </>
        );
      })}
    </div>
  </div>
);
