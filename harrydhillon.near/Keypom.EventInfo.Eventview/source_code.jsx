const TicketDropBackground = styled.div`
background: lightgray;
background: rgb(220,244,251);
background: linear-gradient(0deg, rgba(220,244,251,1) 0%, rgba(251,254,255,1) 95%, rgba(255,255,255,1) 100%);
`;

const ContentDiv = styled.div`
    padding:10px;
    max-width: 1200px;
    margin:auto;
`;

const Heading = styled.div`
font-size: 30px;
font-style: normal;
font-weight: 500;
margin-top:-10px;
line-height: normal;
letter-spacing: -0.72px;
`;

const EventView = styled.div`
`;

const SkeletonWrapper = styled.div`
  width:90%;
  align-items: center;
`;

const SkeletonElement = styled.div`
  background-color: #e0e0e0; 
`;

const ProfileNameSkeleton = styled.div`
  width: 100%;
  margin-bottom:4px;
  border-radius:3px;
  background-color: #e0e0e099; 
  height: 10px;
`;

function extractDateComponents(dateStr) {
  const dateObj = new Date(dateStr);

  const month = dateObj.toLocaleString("default", { month: "long" }); // e.g., "August"
  const date = dateObj.getDate(); // e.g., 3
  const year = dateObj.getFullYear(); // e.g., 2023

  return `${month} ${date}, ${year}`;
}

return (
  <EventView>
    <TicketDropBackground>
      <ContentDiv>
        <div style={{ pointerEvents: "none" }}>
          <Widget
            src="harrydhillon.near/widget/Keypom.Header"
            props={{
              scaleDown: true,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "15vh",
          }}
        >
          <p style={{ fontSize: 22, fontWeight: "600" }}>
            {props?.eventName !== undefined && props?.eventName !== ""
              ? props?.eventName
              : "My Event"}
          </p>
        </div>
      </ContentDiv>
    </TicketDropBackground>
    <div
      style={{
        maxWidth: 500,
        margin: "auto",
        marginTop: 20,
        display: "flex",
        padding: 10,
      }}
    >
      <div style={{ width: "70%" }}>
        <p style={{ fontWeight: "600", fontSize: 12 }}>Event Description</p>
        {props?.description !== undefined && props?.description !== "" ? (
          <p style={{ fontSize: 10, marginTop: -15 }}>{props?.description}</p>
        ) : (
          <SkeletonWrapper style={{ marginTop: -10 }}>
            <ProfileNameSkeleton />
            <ProfileNameSkeleton />
            <ProfileNameSkeleton />
            <ProfileNameSkeleton />
          </SkeletonWrapper>
        )}
        <div>
          <div>
            <p
              style={{
                fontSize: 12,
                fontWeight: "600",
                marginTop: 10,
                marginBottom: 0,
              }}
            >
              Ticket
            </p>
            <div
              style={{
                marginTop: 5,
                border: "1px solid lightgray",
                paddingLeft: 5,
                width: "40%",
                minWidth: 120,
                paddingRight: 5,
                borderRadius: 5,
              }}
            >
              <img
                style={{
                  width: "100%",
                  borderRadius: 5,
                  margin: 10,
                  marginBottom: 5,
                  marginLeft: 0,
                }}
                src={
                  state?.image
                    ? `https://ipfs.near.social/ipfs/${state.img.cid}`
                    : "https://i.ibb.co/kx9Y61n/Screenshot-2023-08-15-at-23-44-38.png"
                }
              />
              {props?.eventName !== undefined && props?.eventName !== "" ? (
                <p style={{ fontSize: 10, marginBottom: 4 }}>
                  {props?.eventName}
                </p>
              ) : (
                <ProfileNameSkeleton style={{ width: "50%" }} />
              )}

              {props?.description !== undefined && props?.description !== "" ? (
                <p style={{ fontSize: 10, marginTop: 0, lineHeight: "12px" }}>
                  {props?.description}
                </p>
              ) : (
                <>
                  <ProfileNameSkeleton />
                  <ProfileNameSkeleton />
                  <ProfileNameSkeleton />
                </>
              )}
              <ProfileNameSkeleton style={{ backgroundColor: "#000000" }} />
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: "30%" }}>
        <p style={{ fontWeight: "600", fontSize: 12 }}>Location</p>
        {props?.location !== undefined && props?.location !== "" ? (
          <p style={{ fontSize: 10, marginTop: -15 }}>{props?.location}</p>
        ) : (
          <SkeletonWrapper style={{ marginTop: -15 }}>
            <ProfileNameSkeleton />
          </SkeletonWrapper>
        )}
        <p style={{ fontWeight: "600", fontSize: 12, marginTop: 5 }}>Date</p>
        {props?.date !== undefined && props?.date !== "" ? (
          <p style={{ fontSize: 10, marginTop: -15 }}>
            {extractDateComponents(props?.date)}
          </p>
        ) : (
          <SkeletonWrapper style={{ marginTop: -15 }}>
            <ProfileNameSkeleton />
          </SkeletonWrapper>
        )}
      </div>
    </div>
  </EventView>
);
