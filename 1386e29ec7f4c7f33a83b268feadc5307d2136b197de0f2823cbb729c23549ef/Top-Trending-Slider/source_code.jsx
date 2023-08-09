State.init({
  slide: [],
  wichSlide: 0,
});

const data = fetch(
  `https://flipsidecrypto.xyz/api/discover/get?d_sort=terend&d_project=${props.project}&d_page=1`
);

let tableRows = [];

for (let i = 0; i < 4; i++) {
  const frank = data.body.dashboards[i];
  //some avatarUrl are Null , so replace Nulls with the avatar below
  let avatarUrl;

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
  console.log(frank);

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
    wichSlide: val,
  });
let tbl = [...tableRows];

let showSlide = {
  ...tableRows[0],
};

showSlide.showSlide = true;

tbl[0] = showSlide;
updateSlide(tbl);

const parentStyle = {
  background: props.background,
  borderRadius: "25px",
  color: "white",
  maxWidth: "400px",
  minHeight: "300px",
  position: "relative",
  top: "0",
  textDecoration: "none",
  border: "black",
  "box-shadow": "-4px 4px 10px 1px rgba(0,0,0,0.75)",
  "-webkit-box-shadow": "-4px 4px 10px 1px rgba(0,0,0,0.75)",
  "-moz-box-shadow": "-4px 4px 10px 1px rgba(0,0,0,0.75)",
};

const imageSectionStyle = {
  width: "100%",
  maxHeight: "200px",
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
};

const avatarImage = {
  maxWidth: "100px",
  maxHeight: "100px",
  borderRadius: "20px",
  marginTop: "-30px",
  padding: 10,
  background: "rgb(55,58,83)",
};

const changeSlide = (type) => {
  let wichSlide = state.wichSlide;

  if (type == "right") {
    if (wichSlide <= 2) {
      console.log(wichSlide);
      wichSlide = state.wichSlide + 1;
    } else {
      wichSlide = 0;
    }
  } else {
    if (wichSlide == 0) {
      wichSlide = 3;
    } else {
      console.log(wichSlide);
      wichSlide = state.wichSlide - 1;
    }
  }

  updateWhichSlide(wichSlide);

  showSlide = {
    ...tableRows[wichSlide],
  };
  showSlide.showSlide = true;
  tbl[wichSlide] = showSlide;

  updateSlide(tbl[wichSlide]);

  State.update({
    slide: tbl,
  });
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
  color: "black",
  border: "black 1px solid",
  cursor: "pointer",
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
  color: "black",
  border: "black 1px solid",
  cursor: "pointer",
};

const description = {
  display: "flex",
  textAlign: "left",
};

return (
  <div>
    <div>
      {state.slide.map((frank, index) => {
        return (
          <>
            {index == state.wichSlide ? (
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
                  <a
                    style={linkStyle}
                    href={`https: //flipsidecrypto.xyz/${frank.username}`}
                    target="_blank"
                  >
                    <img style={imageSectionStyle} src={frank.screenshotUrl} />
                  </a>
                </div>
                <div style={contentSection}>
                  <div style={avatarSection}>
                    <span style={avatarSpan}>
                      <img style={avatarImage} src={frank.avatarUrl} />
                    </span>
                    <span style={avatarSpan}>
                      <h5> {frank.title}</h5>
                      <a style={linkStyle} href={frank.url} target="_blank">
                        Analysis by {frank.username}
                      </a>
                    </span>
                  </div>
                  <div style={description}>
                    <p> {frank.description}</p>
                    <span
                      style={{
                        color: "red",
                        fontSize: "25px",
                        cursor: "pointer",
                        fill: "#ff0000",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                      </svg>
                      {frank.totalLikes}
                    </span>
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
