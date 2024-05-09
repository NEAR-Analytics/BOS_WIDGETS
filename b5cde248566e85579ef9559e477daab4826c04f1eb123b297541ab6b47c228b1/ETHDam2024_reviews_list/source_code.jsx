// Props:
// - recipient: string (the address of a wallet to show the reviews for, can be omited to show all reviews)

// TODO use state to handle pagination

const STYLES = {
  reviewEntry: {
    listStyleType: "none",
    margin: "1rem 1rem",
  },
  reviewEntryContainer: {
    backgroundColor: "#D7E1E9",
    borderRadius: "10px",
    padding: "1rem 2rem 1rem 2rem",
  },
  reviewEntryHeader: {
    justifyContent: "space-between",
  },
  reviewEntryTitle: {
    fontWeight: "bold",
  },
  reviewEntryContent: {},
  reviewEntryAddressDetails: {
    display: "flex",
    alignItems: "center",
  },
  reviewEntryAddress: {
    borderRadius: "5px",
    backgroundColor: "red",
    paddingLeft: "5px",
    paddingRight: "5px",
    marginRight: "3px",
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
  },
};

const [viewMode, setViewMode] = useState("list"); // 'list' or 'graph'
const [graphData, setGraphData] = useState(null);
const graphContainer = useState(null);

const transformDataToGraph = (attestations) => {
  const nodes = {}; // Object to store unique nodes (addresses)
  const edges = []; // Array to store edges (connections)

  // Assuming attestations is either an array or an object:
  if (Array.isArray(attestations)) {
    // Handle 'attestations' as an array
    attestations.forEach((review) => {
      const reviewer = review.data.from; // Assuming 'from' field holds reviewer address
      const reviewed = review.data.to; // Assuming 'to' field holds reviewed address

      // Add nodes if they don't exist yet
      if (!nodes[reviewer]) {
        nodes[reviewer] = {
          id: reviewer,
          x: Math.random() * 600,
          y: Math.random() * 400,
        }; // Random position for now
      }
      if (!nodes[reviewed]) {
        nodes[reviewed] = {
          id: reviewed,
          x: Math.random() * 600,
          y: Math.random() * 400,
        }; // Random position for now
      }

      // Add edge for the review connection
      edges.push({ source: reviewer, target: reviewed });
    });
  } else if (typeof attestations === "object") {
    // Handle 'attestations' as an object
    for (const reviewId in attestations) {
      const review = attestations[reviewId];
      const reviewer = review.data.from; // Assuming 'from' field holds reviewer address
      const reviewed = review.data.to; // Assuming 'to' field holds reviewed address

      // Add nodes if they don't exist yet
      if (!nodes[reviewer]) {
        nodes[reviewer] = {
          id: reviewer,
          x: Math.random() * 600,
          y: Math.random() * 400,
        }; // Random position for now
      }
      if (!nodes[reviewed]) {
        nodes[reviewed] = {
          id: reviewed,
          x: Math.random() * 600,
          y: Math.random() * 400,
        }; // Random position for now
      }

      // Add edge for the review connection
      edges.push({ source: reviewer, target: reviewed });
    }
  } else {
    // Handle an unexpected data type
    console.error("Unexpected data type for attestations!");

    console.log(typeof attestations);
  }

  return { nodes: Object.values(nodes), edges }; // Convert object to array for nodes
};

const data = {
  nodes: [
    { id: "Address1", reviewCount: 5 }, // Reviewer
    { id: "Address2", reviewCount: 10 }, // Reviewed
    { id: "Address3", reviewCount: 3 }, // Reviewer, connected to others
  ],
  links: [
    { source: "Address3", target: "Address1" },
    { source: "Address3", target: "Address2" },
  ],
};

// Get user and signer
const user = Ethers.send("eth_requestAccounts", [])[0];
if (!user) return <></>;

const GQL_ENDPOINT = "https://sepolia.easscan.org/graphql";
const SCHEMA_ID =
  "0x6fe41fc5a5c39368d2aa147368558ffa101c023136e60a84ef05281823ea1d4d";

// TODO: Remove default recipient
const recipient =
  props.recipient ?? "0x58C8E31bE33DB76B60156276e4abAC096B803a0A";
const attestationsResponse = fetch(GQL_ENDPOINT, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    query:
      "query($where: AttestationWhereInput) { attestations(where: $where) { id, timeCreated, attester, recipient, decodedDataJson }}",
    variables: {
      where: {
        schemaId: {
          equals: SCHEMA_ID,
        },
        recipient: recipient ? { equals: recipient } : undefined,
      },
    },
  }),
});

if (!attestationsResponse.ok) {
  return <div>No attestations</div>;
}

const shortenAddress = (address) => {
  return `0x${address.slice(2, 7)}...${address.slice(-5)}`;
};

const ethAddressToColor = (address) => {
  return `#${address.slice(2, 8)}`;
};

const reactToReview = (attestationId, like) => {
  // TODO: Create an attestation for upvoting
};

const attestations = attestationsResponse.body.data.attestations.map((a) => {
  const prettifiedData = JSON.parse(a.decodedDataJson).reduce((data, field) => {
    data[field.name] = field.value.value;
    return data;
  }, {});
  return {
    ...a,
    attesterShortAddress: shortenAddress(a.attester),
    recipientShortAddress: shortenAddress(a.recipient),
    decodedDataJson: undefined,
    data: prettifiedData,
    // TODO: Get upvotes and downvotes attestations separately
    upvotes: 10,
    downvotes: 4,
  };
});

const toggleView = () => {
  if (viewMode === "list") {
    setViewMode("graph");
  } else {
    setViewMode("list");
  }
};

useEffect(() => {
  const preparedGraphData = transformDataToGraph(attestations);
  setGraphData(preparedGraphData);
  console.log(preparedGraphData);
}, [attestations]);

useEffect(() => {
  if (viewMode === "graph" && svgRef.current) {
    const svg = svgRef.current;

    // Data transformation logic (get nodes and edges) ...

    // Simplified layout calculations
    for (let i = 0; i < nodes.length; i++) {
      // ... (basic force-like calculation for position)
      const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circle.setAttribute("cx", nodes[i].x);
      circle.setAttribute("cy", nodes[i].y);
      // ... set radius, style
      svg.appendChild(circle);
    }

    // Similar logic to draw the edges (<line> elements)
  }
}, [viewMode, svgRef]);

return (
  <div>
    <button onClick={toggleView}>Toggle View</button>
    {viewMode === "list" ? (
      <ul>
        {attestations.map((a, i) => {
          return (
            <li style={STYLES["reviewEntry"]}>
              <div style={STYLES["reviewEntryContainer"]}>
                <div style={STYLES["reviewEntryHeader"]}>
                  <div style={STYLES["reviewEntryAddressDetails"]}>
                    <div
                      title={a.attester}
                      style={{
                        ...STYLES["reviewEntryAddress"],
                        backgroundColor: ethAddressToColor(a.attester),
                      }}
                    >
                      By: {a.attesterShortAddress}
                    </div>
                    <div
                      title={a.recipient}
                      style={{
                        ...STYLES["reviewEntryAddress"],
                        backgroundColor: ethAddressToColor(a.recipient),
                      }}
                    >
                      For: {a.recipientShortAddress}
                    </div>
                  </div>
                  <div style={STYLES["reviewEntryTitle"]}>{a.data.title}</div>
                </div>
                <div>
                  <p style={STYLES["reviewEntryContent"]}>{a.data.content}</p>
                </div>

                <button onClick={() => reactToReview(a.id, true)}>
                  👍 {a.upvotes || ""}
                </button>
                <button onClick={() => reactToReview(a.id, false)}>
                  👎 {a.downvotes || ""}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    ) : (
      <svg ref={svgRef} width="600" height="400"></svg>
    )}
  </div>
);
