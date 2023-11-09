const CommunityPage = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const response = await axios.get(
        "https://near.social/api/community/@nearhausa.near"
      );
      setMembers(response.data);
    };

    fetchMembers();
  }, []);

  return (
    <div>
      <h1>@nearhausa.near Community</h1>
      {members.map((member) => (
        <div key={member.id}>
          <h2>{member.name}</h2>
          <p>Interactions on NEAR Social: {member.interactions}</p>
        </div>
      ))}
    </div>
  );
};
