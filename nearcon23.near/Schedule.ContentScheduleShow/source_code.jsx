const accountId = "nearcon23.near";

// border:10px solid black;
const BorderDiv = styled.div`
  background-color: #000000;
  padding:10px;
  border-top-width:5px
  width: 100%;
  z-index:0;
  position:relative;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 15% 20% 60%;
  @media only screen and (max-width: 768px) {
    grid-template-columns: 20% 5% 65%;
  }
  gap: 16px;
  width: 100%;
`;

const HideInMobile = styled.div`
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const ShowInMobile = styled.div`
  display: none;
  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

const Brick = styled.div`
  background-color: black;
  width: 12px;
  height:100%;
`;

const Dot = styled.div`
  background-color: black;
  border: 5px solid white;
  width: 22px;
  height: 22px;
  margin-top: -20px;
  transform: translate(-5px,20px);
  border-radius: 100px;
`;

const PeopleGrid = styled.div`
  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(1,1fr) !important;
  }
`;

function formatDate(inputDate) {
  // Parse the input date string to create a Date object
  const date = new Date(inputDate);

  // Define an array of month abbreviations
  const months = [
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

  // Extract the month and day from the date
  const month = months[date.getMonth()];
  const day = date.getDate();

  // Return the formatted string
  return `${month} ${day}`;
}

const colorMapping = {
  developer: "#7269E1",
  entrepreneur: "#0DAEBB",
  creative: "#04A46E",
  regulator: "#F44738",
};

const filteredData = (props?.dateData ?? [])?.filter((item) => {
  const { dates, track, venue: venues, search } = props.filter;
  let allConditions = [];
  let isDateIncluded = false;
  let isVenue = false;
  let isTrackIncluded = false;

  if (search) {
    const searchExists = item.title
      ?.toLowerCase()
      .search(search?.toLowerCase());
    allConditions.push(searchExists !== -1);
  } else {
    allConditions.push(true);
  }
  if (venues) {
    venues.map((venue) => {
      if (venue?.toLowerCase?.() === item?.location?.toLowerCase?.()) {
        isVenue = true;
      }
    });

    allConditions.push(isVenue);
  } else {
    allConditions.push(true);
  }
  if (track) {
    if (item?.track) {
      const tracklowerCase = track.map((item) => item?.toLowerCase());
      item?.track?.map((item) => {
        if (tracklowerCase.includes(item)) {
          isTrackIncluded = true;
        }
      });
      allConditions.push(isTrackIncluded);
    } else {
      allConditions.push(isTrackIncluded);
    }
  } else {
    allConditions.push(true);
  }
  if (dates) {
    const date = formatDate(item.startTime);

    dates.map((item) => {
      if (item === date) {
        isDateIncluded = true;
      }
    });
    allConditions.push(isDateIncluded);
  } else {
    allConditions.push(true);
  }

  return [...allConditions.filter((item) => item === false)].length === 0;
});

return filteredData.length !== 0 ? (
  <>
    <BorderDiv>
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 8,
          // borderTopWidth: 5,
          width: "100%",
          zIndex: 0,
          position: "relative",
        }}
      >
        {filteredData?.map((item, idx) => (
          <>
            {idx === 0 && (
              <>
                <ShowInMobile>
                  <h3
                    style={{
                      fontWeight: "600",
                      width: "100%",
                      textAlign: "center",
                      left: 0,
                      position: "absolute",
                      marginTop: 30,
                    }}
                  >
                    {formatDate(item.startTime)}
                  </h3>
                </ShowInMobile>
                {props.index !== 0 ? (
                  <ShowInMobile>
                    <Grid>
                      <div></div>
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <Brick style={{ height: 70 }} />
                      </div>
                      <div></div>
                    </Grid>
                  </ShowInMobile>
                ) : (
                  <ShowInMobile style={{ marginTop: 80 }} />
                )}
              </>
            )}
            <div style={{ position: "relative" }}>
              <Grid>
                <div style={{ paddingTop: idx === 0 ? 25 : 0 }}>
                  {idx === 0 && (
                    <HideInMobile>
                      <h3 style={{ fontWeight: "600", textAlign: "center" }}>
                        {formatDate(item.startTime)}
                      </h3>
                    </HideInMobile>
                  )}
                  <ShowInMobile>
                    <h6
                      style={{
                        fontWeight: "400",
                        fontSize: 10,
                        padding: 4,
                        textAlign: "center",
                      }}
                    >
                      {item.startTimeFormatted} - {item.endTimeFormatted}
                    </h6>
                  </ShowInMobile>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: idx === 0 ? 25 : 0,
                  }}
                >
                  <HideInMobile>
                    <h6 style={{ marginTop: 8, fontWeight: "400" }}>
                      {item.startTimeFormatted} - {item.endTimeFormatted}
                    </h6>
                  </HideInMobile>
                  <div>
                    {props.index !== 0 && idx === 0 && (
                      <Brick
                        style={{
                          position: "absolute",
                          top: 0,
                          height: 30,
                        }}
                      />
                    )}
                    <Dot
                      style={
                        item?.track
                          ? { backgroundColor: colorMapping[item.track[0]] }
                          : {}
                      }
                    />
                    <Brick
                      style={
                        item?.track
                          ? { backgroundColor: colorMapping[item.track[0]] }
                          : {}
                      }
                    />
                  </div>
                </div>
                <div
                  style={{
                    padding: 10,
                    paddingLeft: 0,
                    paddingTop: idx === 0 ? 25 : 0,
                    display: "flex",
                  }}
                >
                  <div style={{ width: "100%" }}>
                    <h5 style={{ fontWeight: "700" }}>{item.title}</h5>
                    <p
                      style={{
                        paddingRight: 15,
                        paddingTop: 10,
                        paddingBottom: 10,
                      }}
                    >
                      {item.description === "📝" ? "" : item.description}
                    </p>
                    {!!item.location && (
                      <div
                        style={{
                          display: "flex",
                          gap: "6px",
                          marginBottom: 10,
                        }}
                      >
                        <Widget src={`${accountId}/widget/Icons.Location`} />
                        <p style={{ color: "#90908C", marginBottom: 0 }}>
                          {item.location}
                        </p>
                      </div>
                    )}
                    {item?.confirmedSpeakers &&
                      item?.confirmedSpeakers?.length !== 0 && (
                        <PeopleGrid
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3,1fr)",
                            gap: "13px",
                            marginBottom: 30,
                          }}
                        >
                          {(item?.confirmedSpeakers ?? [])?.map((_, idx) => (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                              key={_}
                            >
                              <div>
                                <img
                                  style={{
                                    width: 40,
                                    height: 40,
                                    objectFit: "cover",
                                    borderRadius: 100,
                                  }}
                                  src={item.imageIds[idx]}
                                />
                                <p
                                  style={{
                                    fontWeight: "600",
                                    marginBottom: 0,
                                    fontSize: 14,
                                  }}
                                >
                                  {_.split("-")[0]}
                                </p>
                                <p
                                  style={{
                                    marginBottom: 0,
                                    fontSize: 14,
                                  }}
                                >
                                  {_.split("-")[1]}
                                </p>
                              </div>
                            </div>
                          ))}
                        </PeopleGrid>
                      )}
                  </div>
                  <a
                    href={`http://www.google.com/calendar/event?action=TEMPLATE&text=${
                      item.title
                    }%20Event&details=${item.description}&location=${
                      item.location
                    }&dates=${new Date(item.startTime)
                      .toISOString()
                      .replace(/[-:]/g, "")}/${new Date(item.endTime)
                      .toISOString()
                      .replace(/[-:]/g, "")}`}
                  >
                    <Widget src={`${accountId}/widget/Icons.Reminder`} />
                  </a>
                </div>
              </Grid>
            </div>
          </>
        ))}
      </div>
    </BorderDiv>
  </>
) : (
  <></>
);
