import React, { useState, useEffect } from "react";
import * as nearAPI from "near-api-js";

const CONTRACT_NAME = "your-contract-name.testnet"; // Replace with your actual contract name

function App() {
  const [nearConnection, setNearConnection] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [guestList, setGuestList] = useState([]);

  useEffect(() => {
    initNear();
  }, []);

  async function initNear() {
    const near = await nearAPI.connect({
      networkId: "testnet",
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
    });

    const wallet = new nearAPI.WalletConnection(near);

    if (wallet.isSignedIn()) {
      const user = wallet.getAccountId();
      setCurrentUser(user);
    }

    setNearConnection({ near, wallet });
    fetchGuestList();
  }

  async function fetchGuestList() {
    if (!nearConnection) return;

    const contract = new nearAPI.Contract(
      await nearConnection.near.account(CONTRACT_NAME),
      CONTRACT_NAME,
      {
        viewMethods: ["get_guest_list", "get_total_entries"],
        changeMethods: ["sign_guest_list"],
      }
    );

    const totalEntries = await contract.get_total_entries();
    const entries = await contract.get_guest_list({
      from_index: 0,
      limit: totalEntries,
    });
    setGuestList(entries);
  }

  async function signGuestList() {
    if (!nearConnection || !currentUser) return;

    const contract = new nearAPI.Contract(
      await nearConnection.near.account(currentUser),
      CONTRACT_NAME,
      {
        viewMethods: ["get_guest_list", "get_total_entries"],
        changeMethods: ["sign_guest_list"],
      }
    );

    await contract.sign_guest_list(
      {},
      "300000000000000",
      nearAPI.utils.format.parseNearAmount("0.05")
    );
    fetchGuestList();
  }

  function handleSignIn() {
    nearConnection.wallet.requestSignIn(CONTRACT_NAME, "NEAR Guest List");
  }

  function handleSignOut() {
    nearConnection.wallet.signOut();
    setCurrentUser(null);
  }

  return (
    <div className="App">
      <h1>NEAR Guest List</h1>
      {currentUser ? (
        <>
          <p>Welcome, {currentUser}!</p>
          <button onClick={signGuestList}>Sign Guest List</button>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
      <h2>Guest List</h2>
      <ul>
        {guestList.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
