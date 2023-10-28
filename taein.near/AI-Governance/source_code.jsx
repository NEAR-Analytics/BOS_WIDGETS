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
        src="https://www.theregreview.org/wp-content/uploads/2021/10/1315130080.jpg"
        alt="Man with a backpack in mountains"
      />
      <PostTitle>Inspect Medicial AI Project</PostTitle>
      <PostContent>
        The transformative potential of Artificial Intelligence (AI) in the
        medical realm is undeniable. From predictive analytics in patient care
        to assisting in complex surgeries, AI is reshaping healthcare. However,
        as we dive deeper into the intricacies of the LLM AI Project's role in
        medicine, there's an aspect that requires vigilant attention: ensuring
        the AI remains unbiased. Medicine, by its very nature, is deeply
        personal and touches upon the core of human life. Any biases within
        medical AI can result in misdiagnoses, treatment disparities, and skewed
        research findings. Consider a scenario where an AI system, due to
        underlying biases, consistently overlooks or misinterprets symptoms in a
        particular gender or ethnic group. The ramifications are not only
        ethically concerning but can also lead to life-threatening oversights.
        As we further integrate the LLM AI Project into the healthcare
        ecosystem, rigorous inspections and audits become indispensable. It's
        not merely about enhancing the system's diagnostic precision; it's about
        guaranteeing that the AI respects and understands the diversity of the
        human population it serves. In the world of medical AI, building an
        intelligent system is just one side of the coin. The other, equally
        significant side, is ensuring that the intelligence is used justly,
        devoid of biases. Join our endeavor to ensure that the LLM AI Project
        stands as a model of unbiased, ethical, and patient-centric AI in the
        medical arena.
      </PostContent>
    </PostContainer>
  );
};

const Post2 = () => {
  return (
    <PostContainer>
      <PostImage
        src="https://media.licdn.com/dms/image/D4D12AQGkHY89zhGDZA/article-cover_image-shrink_720_1280/0/1691431976579?e=2147483647&v=beta&t=lgk0jF-6kju4RyG68tF_4cxZklJqF3rtXrbQEcEYX7c"
        alt="Man with a backpack in mountains"
      />
      <PostTitle>Inspect LLM AI Project</PostTitle>
      <PostContent>
        Inspect LLM AI Project: The Imperative of Unbiased AI In today's rapidly
        advancing digital era, the role of Artificial Intelligence (AI) is
        expanding across various sectors, from healthcare to politics. The LLM
        AI Project, like many others, seeks to harness the vast capabilities of
        AI. However, as we integrate these powerful tools into our daily lives
        and decision-making processes, it's essential to ensure they don't
        inadvertently perpetuate or introduce biases. Biases in AI, especially
        in crucial fields like medicine and politics, can lead to profound
        social challenges. Imagine a scenario where an AI system in healthcare
        misdiagnoses a particular demographic due to inherent biases, or where
        an AI in politics promotes one viewpoint over another. The consequences
        are not just unfair but can be dangerous. As the LLM AI Project
        continues its journey in the AI landscape, a rigorous inspection is
        paramount. It's not just about ensuring the model's accuracy but also
        its fairness and neutrality. In today's world, merely developing AI is
        not enough. We must also commit to supervising and regularly auditing
        these systems. Monitoring AI for biases has become as crucial as
        improving its capabilities. Only then can we hope to leverage AI for the
        greater good, free from prejudices and biases. Join us in our mission to
        ensure the LLM AI Project stands as a beacon of unbiased and equitable
        AI in this evolving landscape.
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

    <Post2 />
  </div>
);
