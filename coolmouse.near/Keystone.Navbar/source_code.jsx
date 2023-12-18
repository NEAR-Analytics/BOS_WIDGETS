// constants
const menuItems = [
  {
    name: "Proposals",
    url: "/coolmouse.near/widget/Keystone.Proposals.Index",
  },
  {
    name: "Signers",
    url: "/coolmouse.near/widget/Keystone.Signers.Index",
  },
  {
    name: "Tokens",
    url: "/coolmouse.near/widget/Keystone.Tokens.Index",
  },
];

const blockExplorerUrl = "https://bkcscan.com"; // Bitkub Chain Mainnet
const chainName = "Bitkub Chain Mainnet";
const rpcUrl = "https://rpc.bitkubchain.io"; // Bitkub Chain Mainnet
const operationChainId = 96; // Bitkub Chain Mainnet

// states
if (state.sender == undefined && Ethers.provider()) {
  Ethers.provider()
    .send("eth_requestAccounts", [])
    .then((accounts) => {
      if (accounts.length) {
        State.update({ sender: accounts[0] });
      }
    });
}

if (state.sender != undefined && Ethers.provider()) {
  try {
    Ethers.provider()
      .getNetwork()
      .then((chainIdData) => {
        const chainId = chainIdData.chainId;
        if (chainId !== operationChainId) {
          const res = Ethers.send("wallet_switchEthereumChain", [
            { chainId: `0x${Number(operationChainId).toString(16)}` },
          ]);
          if (res === null) {
            Ethers.send("wallet_addEthereumChain", [
              {
                chainId: `0x${Number(operationChainId).toString(16)}`,
                chainName,
                nativeCurrency: {
                  name: "KUB",
                  symbol: "KUB",
                  decimals: 18,
                },
                rpcUrls: [rpcUrl],
                blockExplorerUrls: [blockExplorerUrl],
              },
            ]);
            Ethers.send("wallet_switchEthereumChain", [
              { chainId: `0x${Number(operationChainId).toString(16)}` },
            ]);
          }
        } else {
          console.log("OK on chain");
        }
      });
  } catch (e) {
    console.error("No wallet provider");
  }
}

// funcs
const Container = styled.div`
  border-width: 0;
  border-style: solid;
  border-color: #e5e7eb;
  box-sizing: border-box;
  color: white;
  font-family: ui-sans-serif, system-ui, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
  margin-left: auto;
  margin-right: auto;
  max-width: 80rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  tab-size: 4;
`;

const Navbar = styled.div`
  align-items: center;
  border-bottom-width: 2px;
  border-color: rgb(243 244 246);
  color: white;
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  display: flex;
  font-family: ui-sans-serif, system-ui, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
  min-height: 4rem;
  padding: 0.5rem;
  tab-size: 4;
  width: 100%;
`;

const NavbarStart = styled.div`
  align-items: center;
  border-width: 0;
  border-style: solid;
  border-color: #e5e7eb;
  box-sizing: border-box;
  color: white;
  display: inline-flex;
  font-family: ui-sans-serif, system-ui, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
  justify-content: flex-start;
  tab-size: 4;
  width: 50%;
`;

const NavbarCenter = styled.div`
  align-items: center;
  border-color: #e5e7eb;
  border-style: solid;
  border-width: 0;
  box-sizing: border-box;
  color: white;
  display: flex;
  flex-shrink: 0;
  font-family: ui-sans-serif, system-ui, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
  tab-size: 4;
`;

const NavbarEnd = styled.div`
  align-items: center;
  border-width: 0;
  border-style: solid;
  border-color: #e5e7eb;
  box-sizing: border-box;
  color: white;
  display: inline-flex;
  justify-content: flex-end;
  width: 50%;
`;

const MenuHorizontal = styled.ul`
  color: white;
  display: inline-flex;
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: #e5e7eb;
  flex-direction: row;
  flex-wrap: wrap;
  font-family: ui-sans-serif, system-ui, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
  font-size: 0.875rem;
  line-height: 1.25rem;
  list-style: none;
  margin: 0;
  padding: 0px;
  tab-size: 4;

  li {
    a {
      align-content: flex-start;
      align-items: center;
      display: grid;
      grid-auto-flow: column;
      padding-left: 1rem;
      padding-right: 1rem;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }
  }
`;

const MenuLink = styled.a`
  border-radius: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  text-align: start;
  user-select: none;
`;

return (
  <Container style={{ backgroundColor: "black" }}>
    <Navbar>
      <NavbarStart>
        <Link to={"/coolmouse.near/widget/Keystone.Index"}>
          <svg
            height="40"
            preserveAspectRatio="xMidYMid meet"
            version="1.0"
            viewBox="0 0 810 810"
            width="40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fillRule="evenodd">
              <path
                d="
                  M 269.5625 252.027344
                  L 287.582031 225.710938
                  L 522.425781 225.710938
                  L 540.421875 252.027344
                  L 464.804688 531.953125
                  L 444.667969 547.203125
                  L 365.332031 547.203125
                  L 345.179688 531.953125
                "
                fill="#FFD700"
              />
              <path
                d="
                  M 53.46875 424.742188
                  L 55.175781 400.109375
                  L 204.621094 313.285156
                  L 226.9375 323.816406
                  L 286.039062 540.285156
                  L 278.566406 558.347656
                  L 232.953125 584.308594
                  L 213.527344 582.015625
                "
                fill="#FFD700"
              />
              <path
                d="
                  M 756.523438 424.742188
                  L 754.8125 400.109375
                  L 605.371094 313.285156
                  L 583.046875 323.816406
                  L 523.945312 540.285156
                  L 531.425781 558.347656
                  L 577.039062 584.308594
                  L 596.46875 582.015625
                "
                fill="#FFD700"
              />
            </g>
            <g fillRule="nonzero">
              <path
                d="
                  M 390.597656 380.773438
                  C 365.246094 387.207031 346.46875 410.105469 346.46875 437.453125
                  C 346.46875 469.78125 372.679688 495.992188 405.011719 495.992188
                  C 437.34375 495.992188 463.550781 469.78125 463.550781 437.453125
                  C 463.550781 410.105469 444.773438 387.203125 419.421875 380.773438
                  L 419.421875 282.652344
                  L 405.011719 260.699219
                  L 391.28125 281.613281
                  L 360.09375 281.613281
                  L 360.09375 321.847656
                  L 390.597656 321.847656 Z
                  M 434.910156 437.453125
                  C 434.910156 453.96875 421.523438 467.355469 405.007812 467.355469
                  C 388.496094 467.355469 375.105469 453.96875 375.105469 437.453125
                  C 375.105469 420.941406 388.496094 407.550781 405.007812 407.550781
                  C 421.523438 407.550781 434.910156 420.941406 434.910156 437.453125 Z
                  M 434.910156 437.453125
                "
                fill="#7c52cf"
              />
            </g>
          </svg>
        </Link>
        <Link
          className="btn btn-ghost normal-case text-xl"
          style={{ color: "white" }}
          to={"/coolmouse.near/widget/Keystone.Index"}
        >
          Keystone Index
        </Link>
      </NavbarStart>
      <NavbarCenter>
        <MenuHorizontal>
          {menuItems.map((menuItem) => (
            <li key={menuItem.name}>
              <MenuLink href={menuItem.url}>{menuItem.name}</MenuLink>
            </li>
          ))}
        </MenuHorizontal>
      </NavbarCenter>
      <NavbarEnd>
        <Web3Connect
          connectLabel={"Link wallet"}
          disconnectLabel={"Disconnect"}
        />
      </NavbarEnd>
    </Navbar>
  </Container>
);
