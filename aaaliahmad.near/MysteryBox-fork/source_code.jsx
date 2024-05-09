import React, { useState } from "react";

// Assuming you have a function to generate a random reward based on rarity
const getRandomReward = (rarityRewards) => {
  const randomIndex = Math.floor(Math.random() * rarityRewards.length);
  return rarityRewards[randomIndex];
};

const GiftWidget = ({ onClaim, boxes, totalSupply }) => {
  const [claimedReward, setClaimedReward] = useState(null);

  const handleClaim = (boxId) => {
    // Assuming you have a function to claim the reward from the server
    const claimedReward = onClaim(boxId);

    // Set the claimed reward in the state
    setClaimedReward(claimedReward);
  };

  // Assuming you have a function to render each box with the "Gift" icon
  const renderBox = (box) => (
    <div key={box.id}>
      <span>Box {box.id}</span>
      <span> Rarity: {box.rarity}</span>
      <button onClick={() => handleClaim(box.id)}>Gift</button>
    </div>
  );

  return (
    <div>
      <h1>Gift Boxes</h1>
      {boxes.map(renderBox)}
      <p>Total Supply: {totalSupply}</p>
      {claimedReward && (
        <div>
          <h2>Claimed Reward</h2>
          <p>{claimedReward}</p>
        </div>
      )}
    </div>
  );
};

export default GiftWidget;
