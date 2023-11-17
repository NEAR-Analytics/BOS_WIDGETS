const ppdContract = "0x6962FC3a4Bc379107d4a512e91DC227Fe04889Ad";

const ppdAbi = fetch(
  "https://raw.githubusercontent.com/gonzalobarria/testpub/master/abis/abitest.json"
);

const [userName, setUserName] = useState("");

const addUser = () => {
  const ppd = new ethers.Contract(
    ppdContract,
    ppdAbi.body,
    Ethers.provider().getSigner()
  );

  ppd.addUser(userName, 0);
};

return (
  <>
    <div>
      <input
        className="form-control m-2 p-2"
        type="text"
        id="userName"
        name="userName"
        required
        placeholder="Full Name"
        onChange={(event) => {
          setUserName(event.target.value);
        }}
      />
      <button onClick={addUser}>Register</button>
    </div>
  </>
);
