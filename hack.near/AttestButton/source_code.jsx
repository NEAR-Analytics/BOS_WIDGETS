const item = props.item;

if (!item) {
  return "";
}

useEffect(() => {
  State.update({ attested: null });
}, [item]);

const attestations = Social.index("attestation", item);

const dataLoading = attestations === null;

const attestationsByUsers = {};

(attestations || []).forEach((attestation) => {
  if (attestation.value.type === "attestation") {
    attestationsByUsers[attestation.accountId] = attestation;
  } else if (attestation.value.type === "undo") {
    delete attestationsByUsers[attestation.accountId];
  }
});

if (state.attested === true) {
  attestationsByUsers[context.accountId] = {
    accountId: context.accountId,
  };
} else if (state.attested === false) {
  delete attestationsByUsers[context.accountId];
}

const accountsWithStars = Object.keys(attestationsByUsers);
const attestationCount = accountsWithStars.length;
const attested = context.accountId && !!attestationsByUsers[context.accountId];

const attestClick = () => {
  if (state.loading || dataLoading || !context.accountId) {
    return;
  }
  State.update({
    loading: true,
  });
  const data = {
    index: {
      attestation: JSON.stringify({
        key: item,
        value: {
          type: attested ? "undo" : "attest",
        },
      }),
    },
  };

  if (!hasLike && props.notifyAccountId) {
    data.index.notify = JSON.stringify({
      key: props.notifyAccountId,
      value: {
        type: "attest",
        item,
      },
    });
  }
  Social.set(data, {
    onCommit: () => State.update({ loading: false, attested: !attested }),
    onCancel: () => State.update({ loading: false }),
  });
};

const [hovered, setHovered] = useState(false);

return (
  <div className="d-inline-flex align-items-center">
    <button
      disabled={state.loading || dataLoading || !context.accountId}
      className="btn btn-outline-secondary"
      onClick={attestClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <i
        className={`bi ${
          hovered && !attested ? "bi-check-square-fill" : "bi-square"
        }`}
      />
      <span style={{ marginLeft: "0.2rem" }}>
        {attested ? "undo" : "attest"}
      </span>
    </button>
  </div>
);
