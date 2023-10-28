const data = fetch("https://data.cityofnewyork.us/resource/knr6-vurn.json");

if (!data) {
  return <p>Loading...</p>;
}

const [latestAccident, setLatestAccident] = useState({});

useEffect(() => {
  if (data && data.length) {
    let latest = data[0];
    for (let i = 1; i < data.length; i++) {
      if (data[i].date > latest.date) {
        latest = data[i];
      }
    }
    setLatestAccident(latest);
  }
}, [data]);

const Container = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  height: 220px; /* 예시로 400px을 사용했으나 원하는 높이로 조절 가능합니다. */
  overflow: hidden;
`;

const OrganizationName = styled.h2`
  font-size: 1.5rem;
`;

const Mission = styled.div`
  margin-top: 10px;
`;

const VolunteerProgramDescription = styled.p`
  margin-top: 10px;
`;

const Address = styled.p`
  margin-top: 10px;
`;

const Website = styled.a`
  margin-top: 10px;
  display: block;
`;

const boroughFrequency = {};

Object.entries(data).forEach(([key, org]) => {
  if (boroughFrequency[org.borough]) {
    boroughFrequency[org.borough]++;
  } else {
    boroughFrequency[org.borough] = 1;
  }
});

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
};

const OrganizationCard = ({ organization, index }) => {
  return (
    <>
      <Container>
        <div key={index}>
          Area
          <OrganizationName>{organization.borough}</OrganizationName>
          <Mission
            dangerouslySetInnerHTML={{ __html: formatDate(organization.date) }}
          />
          <VolunteerProgramDescription>
            {formatDate(organization.date)}
          </VolunteerProgramDescription>
          <h6>Reason</h6>
          <Address>{organization.contributing_factors}</Address>
          <Website
            href={organization.website.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {organization.website.url}
          </Website>
        </div>
      </Container>
    </>
  );
};

const renderItem = (a, index) => {
  return (
    <div key={JSON.stringify(a)}>
      <OrganizationCard organization={a} index={index} />
    </div>
  );
};

return (
  <div>
    <img
      src="https://www.empirecenter.org/wp-content/uploads/2023/03/Lower-Manhattan-skyline.jpg"
      alt="Description"
      style={{ width: "100%", display: "block" }}
    />

    {/* 상단바 */}
    <div
      style={{
        backgroundColor: "black",
        height: "50px",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      The Number of Car Accidents in New York City
    </div>

    {/* 통계 정보 */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
      }}
    >
      <div
        style={{ width: "45%", border: "1px solid #e0e0e0", padding: "10px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <span>Top Accidents Area</span>
          <span style={{ color: "green" }}>New York City</span>
        </div>
        <div style={{ fontSize: "24px", marginBottom: "10px" }}>Manhattan</div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "blue" }}>Counts</span>
          <span style={{ color: "red" }}>Latest</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>103</span>
          <span>2022-12-02</span>
        </div>
      </div>

      {/* Total Savings */}
      <div
        style={{ width: "45%", border: "1px solid #e0e0e0", padding: "20px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <span>Latest Accident</span>
          <span style={{ color: "green" }}>2022-12-02</span>
        </div>
        <div style={{ fontSize: "24px", marginBottom: "10px" }}>Manhattan</div>
        <h6>Reason</h6>
        vehicle 2 not paying attention
        {/* Bar chart representation (simplified) */}
      </div>
    </div>

    <div
      style={{
        backgroundColor: "black",
        height: "50px",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Car Accident History
    </div>

    <Widget
      src="efiz.near/widget/ItemFeed"
      props={{ items: data.body || [], renderItem }}
    />
  </div>
);
