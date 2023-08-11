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
  border-radius:2px;
  background-color: #e0e0e099; 
  height: 10px;
`;

return (
  <EventView>
    <TicketDropBackground>
      <ContentDiv>
        <Widget
          src="harrydhillon.near/widget/Keypom.Header"
          props={{
            scaleDown: true,
          }}
        />
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
          <p style={{ fontSize: 10, marginTop: -15 }}>{props?.date}</p>
        ) : (
          <SkeletonWrapper style={{ marginTop: -15 }}>
            <ProfileNameSkeleton />
          </SkeletonWrapper>
        )}
      </div>
    </div>
  </EventView>
);
