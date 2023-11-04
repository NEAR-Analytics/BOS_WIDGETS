const Root = styled.div`
    padding: 40px;
    .top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 20px;
        h1 {
            color: var(--nearcon-app-black, #000);
            font-family: Inter;
            font-size: 32px;
            font-style: normal;
            font-weight: 500;
            line-height: 38.4px; /* 120% */
        }
        button {
            color: var(--near-org-black, #000);
            text-align: center;
            font-family: Inter;
            font-size: 15.2px;
            font-style: normal;
            font-weight: 600;
            line-height: 15.2px; /* 100% */
            display: flex;
            height: 52px;
            min-width: 161.5px;
            padding: 10.5px 24.89px 9.69px 25.09px;
            justify-content: center;
            align-items: center;
            transition: 0.3s ease-in-out;
            background: white;
            border-color: black;
            border-radius: 0;
        }
        button:hover {
            background: black;
            color: white;
        }
    }
    .images {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
        img {
            cursor: pointer;
            transition: 0.5s ease-in-out;
        }
        img:hover {
            opacity: 0.4
        }
    }
    @media (max-width: 500px){
        .top, .images {
            justify-content: center;
            margin-bottom: 40px;
        }
    }
`;

return (
  <Root>
    <div className="top">
      <h1>Sponsor/Partners</h1>
      <button>Become a 2023 Sponsor/Partner</button>
    </div>
    <div className="images">
      <img src="https://ipfs.near.social/ipfs/bafkreicss3ajslchhvnwmm232xalxxzcpbqficfqmewb6wkh36klfhpj4u" />
      <img src="https://ipfs.near.social/ipfs/bafkreihy52w3qldkzzb4tlmlr2hijn6lgof4xqmcav444lf4zgqn43ghdi" />
      <img src="https://ipfs.near.social/ipfs/bafkreidbmunwjyz2cuvt75uqn7numxyuudpr74uecitx4h77f7x3fojpgy" />
      <img src="https://ipfs.near.social/ipfs/bafkreibplakyzszxaiijqoo4ns4jkaokdvndyrpinkkg7qiawcu5j4loi4" />
      <img src="https://ipfs.near.social/ipfs/bafkreidui7kvc5kmxgf5bhbtwcr6mcc2v3kqms2xd7pyozijp5dc2rcjoq" />
      <img src="https://ipfs.near.social/ipfs/bafkreihneahtfo7dbfc3zdf63m7ztmnxqyzdwnwezctk2na6xr6szqwfoq" />
    </div>
  </Root>
);
