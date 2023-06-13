return (
  <div className="bg-black text-white p-4 rounded-lg text-center">
    Hello World
  </div>
);
return (
  <>
    <Hero className="w-100">
      <PageTitle>
        Find, Buy and Sell NEAR NFTs on <br />
        💧GenaDrop
      </PageTitle>
      <InputContainer>
        <input
          type="search"
          value={state.searchTerm}
          placeholder="Search NFTs"
          onChange={seachInputHandler}
        />
      </InputContainer>
    </Hero>
    {state.nftData.length > 0 ? (
      <NFTCards>
        {state.searchTerm === "" ? (
          state.nftData.map((nft) => (
            <a
              // href={`https://www.tradeport.xyz/near/collection/${state.collectionData.slug}/${nft.token_id}`}
              // target="_blank"
              href={`#/mob.near/widget/MyPage?accountId=${nft.nft_state.owner}`}
              // rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <NFTCard classNmae="card">
                <ImageCard>
                  <img
                    src={nft.media_url}
                    alt={nft.name}
                    width="100%"
                    height="100%"
                    className="rounded-3"
                  />
                </ImageCard>
                <NFTCardText>
                  <hr />
                  <div className="d-flex my-4 justify-content-between w-100 px-2">
                    <RankCard>Rank: {Math.round(nft.ranking)}</RankCard>
                    <div>{nft.nft_state_lists[0].list_contract.name}</div>
                  </div>
                  <div className="px-2">
                    <div style={{ color: "#a4a9b6" }}>Name</div>
                    <h3
                      style={{
                        fontSize: "16px",
                        margin: "0 0 10px",
                        wordBreak: "break-all",
                      }}
                    >
                      {nft.name}
                    </h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                    className="px-2"
                  >
                    <div>
                      <div style={{ color: "#a4a9b6" }}>Token ID</div>
                      <p
                        style={{
                          fontSize: "14px",
                          marginBottom: "5px",
                          color: "#0d99ff",
                        }}
                      >
                        {nft.token_id.length > 30
                          ? `${nft.token_id.slice(0, 30)}...`
                          : nft.token_id}
                      </p>
                    </div>
                    {nft.nft_state && (
                      <div>
                        <div style={{ color: "#a4a9b6" }}>Owner</div>
                        <p style={{ fontSize: "14px" }}>
                          {nft.nft_state.owner.length > 12
                            ? nft.nft_state.owner.slice(0, 12) + "..."
                            : nft.nft_state.owner}
                        </p>
                      </div>
                    )}
                  </div>
                  {/*<p style={{ fontSize: "14px" }} className="px-2">
                    Collection: {nft.collection.slug}
                  </p>*/}
                  <hr />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                    className="px-2"
                  >
                    <div className="px-2">
                      <div style={{ color: "#a4a9b6", fontSize: "1.1rem" }}>
                        Price
                      </div>
                      {nft.listings &&
                      nft.listings[0] &&
                      typeof nft.listings[0].price === "number" ? (
                        <PriceArea>
                          <h6>{`${
                            nft.listings[0].price.toFixed(2) / 100000000
                          }APT`}</h6>
                          <span>{` ($${(
                            (nft.listings[0].price / 100000000) *
                            state.aptosRate
                          ).toFixed(2)})`}</span>
                        </PriceArea>
                      ) : (
                        <div>Not for Sale</div>
                      )}
                    </div>
                    <button>Buy Now </button>
                  </div>
                </NFTCardText>
              </NFTCard>
            </a>
          ))
        ) : state.filteredNFTData.length > 0 ? (
          state.filteredNFTData.map((nft) => (
            <a
              // href={`https://www.tradeport.xyz/near/collection/${state.collectionData.slug}/${nft.token_id}`}
              // target="_blank"
              href={`#/mob.near/widget/MyPage?accountId=${nft.nft_state.owner}`}
              // rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <NFTCard classNmae="card">
                <ImageCard>
                  <img
                    src={nft.media_url}
                    alt={nft.name}
                    width="100%"
                    height="100%"
                    className="rounded-3"
                  />
                </ImageCard>
                <NFTCardText>
                  <hr />
                  <div className="d-flex my-4 justify-content-between w-100 px-2">
                    <RankCard>Rank: {Math.round(nft.ranking)}</RankCard>
                    <div>{nft.nft_state_lists[0].list_contract.name}</div>
                  </div>
                  <div className="px-2">
                    <div style={{ color: "#a4a9b6" }}>Name</div>
                    <h3
                      style={{
                        fontSize: "16px",
                        margin: "0 0 10px",
                        wordBreak: "break-all",
                      }}
                    >
                      {nft.name}
                    </h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                    className="px-2"
                  >
                    <div>
                      <div style={{ color: "#a4a9b6" }}>Token ID</div>
                      <p
                        style={{
                          fontSize: "14px",
                          marginBottom: "5px",
                          color: "#0d99ff",
                        }}
                      >
                        {nft.token_id.length > 30
                          ? `${nft.token_id.slice(0, 30)}...`
                          : nft.token_id}
                      </p>
                    </div>
                    {nft.nft_state && (
                      <div>
                        <div style={{ color: "#a4a9b6" }}>Owner</div>
                        <p style={{ fontSize: "14px" }}>
                          {nft.nft_state.owner.length > 12
                            ? nft.nft_state.owner.slice(0, 12) + "..."
                            : nft.nft_state.owner}
                        </p>
                      </div>
                    )}
                  </div>
                  {/*<p style={{ fontSize: "14px" }} className="px-2">
                    Collection: {nft.collection.slug}
                  </p>*/}
                  <hr />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                    className="px-2"
                  >
                    <div className="px-2">
                      <div style={{ color: "#a4a9b6", fontSize: "1.1rem" }}>
                        Price
                      </div>
                      {nft.listings &&
                      nft.listings[0] &&
                      typeof nft.listings[0].price === "number" ? (
                        <PriceArea>
                          <h6>{`${nft.listings[0].price.toFixed(2)}APT`}</h6>
                          <span>{` ($${(nft.listings[0].price * 1.56).toFixed(
                            2
                          )})`}</span>
                        </PriceArea>
                      ) : (
                        <div>Not for Sale</div>
                      )}
                    </div>
                    <button
                      className={isPriceValid ? "" : "grayed-out"}
                      disabled={!isPriceValid}
                    >
                      Buy Now{" "}
                    </button>
                  </div>
                </NFTCardText>
              </NFTCard>
            </a>
          ))
        ) : (
          <div>No results found for "{state.searchTerm}".</div>
        )}
      </NFTCards>
    ) : (
      <div>No NFTs available.</div>
    )}
    <Widget src="jgodwill.near/widget/GenaDrop.Footer" />
  </>
);
