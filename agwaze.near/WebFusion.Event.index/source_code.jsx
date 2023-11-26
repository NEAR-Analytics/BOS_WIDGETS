const Root = styled.div`
    .cover {
        width: 100%;
    }
    .calander {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 50px;
        margin-bottom: 40px;
    }
    .event {
        img {
            width: 100%;
        }
    }
`;

const Day = styled.div`
            display: flex;
            width: 230px;
            padding: 17px 46.4px 17px 46.6px;
            flex-direction: column;
            justify-content: center;
            cursor: pointer;
            align-items: center;
            background: ${(p) => (p.selected ? "#00EC97" : "#fff")};
            flex-shrink: 0;
            border: 1px solid var(--near-org-black, #000);
            P {
                color: var(--near-org-black, #000);
                text-align: center;
                font-family: Inter;
                font-size: 17.859px;
                font-style: normal;
                margin: 0;
                font-weight: 700;
                line-height: 20.7px;
                text-transform: uppercase;
            }
            @media (max-width: 800px) {
                width: 80px;
                p {
                    font-size: 12px;
                }
            }
`;

initState({
  selectedTab: "one",
});

const events = {
  one: "bafkreief7wxgmfgsg4qm7gaomdzd33x24p5bjq6u3kiziy53mt7vg3clrq",
  two: "bafkreierc4mb65axg5autyk4dlerj3syx43eg7nv42joedh6lqlgqik6ry",
  three: "bafkreic3xtoi3yzx4xsl6jdgz4atj5njzs6pbk7h6phem5536zbqx4b4iu",
  four: "bafkreigtds7ezzqnfjfajerwvyuqvbmcwss2m7gukdop64ndagom5idf3i",
};

return (
  <Root>
    <img
      className="cover"
      src="https://ipfs.near.social/ipfs/bafkreibl5jhwvyjxst5yb5vln6frl6mqb7mkiaocxlaiks5gq64yi7xh64"
    />
    <div className="calander">
      <Day
        onClick={() => State.update({ selectedTab: "one" })}
        selected={state.selectedTab === "one"}
        className="date"
      >
        <p>November 27</p>
      </Day>
      <Day
        onClick={() => State.update({ selectedTab: "two" })}
        selected={state.selectedTab === "two"}
        className="date"
      >
        <p>November 28</p>
      </Day>
      <Day
        onClick={() => State.update({ selectedTab: "three" })}
        selected={state.selectedTab === "three"}
        className="date"
      >
        <p>November 29</p>
      </Day>
      <Day
        onClick={() => State.update({ selectedTab: "four" })}
        selected={state.selectedTab === "four"}
        className="date"
      >
        <p>November 30</p>
      </Day>
    </div>
    <div className="event">
      <img src={`https://ipfs.near.social/ipfs/${events[state.selectedTab]}`} />
    </div>
  </Root>
);
