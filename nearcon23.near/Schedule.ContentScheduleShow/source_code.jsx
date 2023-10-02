const accountId = "nearcon23.near";

const BorderDiv = styled.div`
  border:10px solid black;
  border-top-width:5px
  width: 100%;
  position:relative;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 15% 20% 60%;
  @media only screen and (max-width: 768px) {
  grid-template-columns: 20% 5% 65%;
  }
  gap: 1rem;
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
  width: 20px;
  height:100%;
`;

const Dot = styled.div`
  background-color: black;
  border: 5px solid white;
  width: 25px;
  height: 25px;
  margin-top: -20px;
  transform: translate(-2.8px,20px);
  border-radius: 100px;
`;

const PeopleGrid = styled.div`
  @media only screen and (max-width: 768px) {
  grid-template-columns: repeat(1,1fr) !important;
  }
`;

return (
  <BorderDiv>
    {(props?.dateData ?? [])?.map((item, idx) => (
      <>
        {idx === 0 && (
          <>
            <ShowInMobile>
              <h3
                style={{
                  fontWeight: "600",
                  width: "100vw",
                  textAlign: "center",
                  left: 0,
                  position: "absolute",
                  marginTop: 30,
                }}
              >
                {item.date}
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
              <HideInMobile>
                <h3 style={{ fontWeight: "600", textAlign: "center" }}>
                  {item.date}
                </h3>
              </HideInMobile>
              <ShowInMobile>
                <h6
                  style={{
                    fontWeight: "400",
                    fontSize: 10,
                    padding: 4,
                    textAlign: "center",
                  }}
                >
                  {item.time}
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
                <h6 style={{ marginTop: 8, fontWeight: "400" }}>{item.time}</h6>
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
                  style={item?.active ? { backgroundColor: "#00EC97" } : {}}
                />
                <Brick
                  style={item?.active ? { backgroundColor: "#00EC97" } : {}}
                />
              </div>
            </div>
            <div
              style={{
                padding: 10,
                paddingTop: idx === 0 ? 25 : 0,
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ width: "100%" }}>
                <h5 style={{ fontWeight: "600" }}>{item.title}</h5>
                <p style={{ paddingRight: 15 }}>{item.description}</p>
                {item.location && (
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
                {item.people.length !== 0 && (
                  <PeopleGrid
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3,1fr)",
                      gap: "13px",
                      marginBottom: 30,
                    }}
                  >
                    {(item?.people ?? [])?.map((_) => (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <img
                          style={{
                            height: 40,
                            width: 40,
                            borderRadius: 100,
                            objectFit: "cover",
                          }}
                          src={_.image}
                        />
                        <div>
                          <p
                            style={{
                              fontWeight: "600",
                              marginBottom: 0,
                              fontSize: 14,
                            }}
                          >
                            {_.name}
                          </p>
                          <p style={{ marginBottom: 0, fontSize: 10 }}>
                            {_.org}
                          </p>
                        </div>
                      </div>
                    ))}
                  </PeopleGrid>
                )}
              </div>
              <Widget src={`${accountId}/widget/Icons.Reminder`} />
            </div>
          </Grid>
        </div>
      </>
    ))}
  </BorderDiv>
);
