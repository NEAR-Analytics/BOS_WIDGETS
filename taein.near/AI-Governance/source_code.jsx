const data2 = fetch("https://data.cityofnewyork.us/resource/knr6-vurn.json");

if (!data2) {
  return <p>Loading...</p>;
}

const StatisticsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding-top: 20px;
  // padding-bottom: 20px;
`;

const StatBox1 = styled.div`
  border: 1px solid #e0e0e0;
  padding: 10px;
  background-color: #E0F2F7;
    display: flex;  // Use flexbox for layout
  align-items: center;  // Vertically align content in the middle
`;

const StatBox2 = styled.div`
  border: 1px solid #e0e0e0;
  padding: 10px;
  background-color: #F6CEEC;
    display: flex;  // Use flexbox for layout
  align-items: center;  // Vertically align content in the middle
`;

const StatBox3 = styled.div`
  border: 1px solid #e0e0e0;
  padding: 10px;
  background-color: #0080FF;
  display: flex;  // Use flexbox for layout
  align-items: center;  // Vertically align content in the middle
`;

const StatBox4 = styled.div`
  border: 1px solid #e0e0e0;
  padding: 10px;
  background-color: #FA5882;
  display: flex;  // Use flexbox for layout
  align-items: center;  // Vertically align content in the middle
`;

const ImageContainer = styled.div`
  width: 40%; // Adjust according to your requirements
  padding-right: 20px; // Some spacing between image and text
`;

const ContentContainer = styled.div`
  width: 60%; // Adjust according to your requirements
`;

const DashboardContainer = styled.div`
  display: grid;
  padding-top: 10px;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const Box = styled.div`
  padding: 10px;
  border: 1px solid #e0e0e0;
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <Box>Medical</Box>
      <Box>Financial</Box>
      <Box>Climate</Box>
      <Box>Technology</Box>
      <Box>Academic</Box>
      <Box>AAAA</Box>
    </DashboardContainer>
  );
};

const Container2 = styled.div`
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

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
};

const renderItem = (a, index) => {
  return (
    <div key={JSON.stringify(a)}>
      <OrganizationCard organization={a} index={index} />
    </div>
  );
};

const PostContainer = styled.div`
  margin-top: 20px;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  border: solid;
  marginBottom: 10px;
`;

const PostImage = styled.img`
  width: 100%;
  display: block;
`;

const PostTitle = styled.h2`
  font-size: 2rem;
  padding: 20px;
  text-align: center;
`;

const PostContent = styled.p`
  padding: 0 20px 20px 20px;
`;

const Post = () => {
  return (
    <PostContainer>
      <PostImage
        src="data:image/jpeg;base64,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"
        alt="Man with a backpack in mountains"
      />
      <PostTitle>Inspect AI</PostTitle>
      <PostContent>
        If AI has bias about specific fields like medical, political, the
        crucial social problems can occur, so supervising whether AI has bias or
        not is very important nowdays
      </PostContent>
    </PostContainer>
  );
};

return (
  <div>
    <div
      style={{
        backgroundColor: "black",
        height: "50px",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "left",
      }}
    ></div>
    <img
      src="https://png.pngtree.com/thumb_back/fh260/back_pic/03/60/45/0457a5d63980334.jpg"
      alt="Description"
      style={{ width: "100%", display: "block", height: "30%" }}
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
      New York AI Governance Project
    </div>

    <div
      style={{
        backgroundColor: "white",
        height: "50px",
        color: "black",
        display: "flex",
        alignItems: "center",
        padding: "5px",
        marginTop: "10px",
        justifyContent: "center",
        border: "solid",
      }}
    >
      Governance Project Participants
    </div>

    {/* 통계 정보 */}
    <StatisticsContainer>
      <StatBox1>
        <ImageContainer>
          <img
            src="https://cdn.pixabay.com/photo/2019/10/09/07/28/development-4536630_960_720.png"
            alt="Descriptive alt text"
            style={{ width: "100%", height: "auto" }}
          />
        </ImageContainer>
        <ContentContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <span>Artificial Intelligence</span>
          </div>
          <div style={{ fontSize: "24px", marginBottom: "10px" }}>
            Developers
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "blue" }}>Participants:</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>931</span>
          </div>
        </ContentContainer>
      </StatBox1>

      {/* Total Savings */}
      <StatBox2>
        <ImageContainer>
          <img
            src="https://assets-global.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298d0cfb93c98_Banner-0014.png"
            alt="Descriptive alt text"
            style={{ width: "100%", height: "auto" }}
          />
        </ImageContainer>
        <ContentContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <span>Artificial Intelligence</span>
          </div>
          <div style={{ fontSize: "24px", marginBottom: "10px" }}>
            Companies
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "blue" }}>Participants:</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>127</span>
          </div>
        </ContentContainer>
      </StatBox2>
    </StatisticsContainer>

    <StatisticsContainer>
      <StatBox3>
        <ImageContainer>
          <img
            src="https://cdn.pixabay.com/photo/2020/12/18/00/43/business-5840871_1280.png"
            alt="Descriptive alt text"
            style={{ width: "100%", height: "auto" }}
          />
        </ImageContainer>
        <ContentContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <span>Directors</span>
          </div>
          <div style={{ fontSize: "24px", marginBottom: "10px" }}>Public</div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "blue" }}>Participants:</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>1030</span>
          </div>
        </ContentContainer>
      </StatBox3>

      {/* Total Savings */}
      <StatBox4>
        <ImageContainer>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/political-candidate-doing-debate-6003099-4972929.png?f=webp"
            alt="Descriptive alt text"
            style={{ width: "100%", height: "auto" }}
          />
        </ImageContainer>
        <ContentContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <span>Politician</span>
          </div>
          <div style={{ fontSize: "24px", marginBottom: "10px" }}>
            Politician
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "blue" }}>Participants</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>121</span>
          </div>
        </ContentContainer>
      </StatBox4>
    </StatisticsContainer>

    <div
      style={{
        backgroundColor: "white",
        height: "50px",
        color: "black",
        display: "flex",
        alignItems: "center",
        padding: "5px",
        marginTop: "10px",
        justifyContent: "center",
        border: "solid",
      }}
    >
      AI Fields
    </div>

    <Dashboard />

    <div
      style={{
        backgroundColor: "white",
        height: "50px",
        color: "black",
        display: "flex",
        alignItems: "center",
        padding: "5px",
        marginTop: "10px",
        justifyContent: "center",
        border: "solid",
      }}
    >
      Recent Open AI Supervising Projects
    </div>

    <Post />

    <Post />
  </div>
);
