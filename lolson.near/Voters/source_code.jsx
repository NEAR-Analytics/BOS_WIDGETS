import React, { useState } from "react";

const SecondWidget = () => {
  const [walletData, setWalletData] = useState([]);

  const openSecondWidget = (wallet) => {
    setWalletData((prevData) => [...prevData, wallet]);
  };

  return (
    <div>
      <h2>Table Widget</h2>
      <table>
        <thead>
          <tr>
            <th>Wallet</th>
          </tr>
        </thead>
        <tbody>
          {walletData.map((wallet, index) => (
            <tr key={index}>
              <td>{wallet}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SecondWidget;
