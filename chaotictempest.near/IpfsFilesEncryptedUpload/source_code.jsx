const fileAccept = props.fileAccept || "*.*";
const fileIcon = props.fileIcon || "bi-file";
const buttonText = props.buttonText || "Upload a file";

const defaultPassword = "ipfs-files-encrypted-upload-supplied-password";

initState({
  uploading: false,
  files: [],
});

const str2array = (str) => {
  return new Uint8Array(Array.from(str).map((letter) => letter.charCodeAt(0)));
};

const new_sk = () => {
  const hashed_id = nacl.hash(str2array(context.accountId));
  const hashed_pw =
    props.hashedPassword ?? nacl.hash(str2array(defaultPassword));
  const sk = new Uint8Array(nacl.secretbox.keyLength);
  for (var i = 0; i < hashed_id.length; i++) {
    const sk_i = i % sk.length;
    if (i >= sk.length) {
      sk[sk_i] = sk[sk_i] + (hashed_id[i] + hashed_pw[i]);
    } else {
      sk[sk_i] = hashed_id[i] + hashed_pw[i];
    }
  }
  return sk;
};

const [storageSk, _] = useState(() => {
  if (props.encryptSk) {
    return props.encryptSk;
  }
  const localSk = Storage.privateGet("storage_secret");
  if (localSk && !props.hashedPassword) {
    return localSk;
  }
  const sk = new_sk();
  console.log("created a new secret key to be set to local storage");
  Storage.privateSet("storage_secret", sk);
  return sk;
});

const new_nonce = (message) => {
  const encoded = nacl.hash(message);
  const nonce = new Uint8Array(nacl.secretbox.nonceLength);
  for (var i = 0; i < nonce.length; i++) {
    if (i >= encoded.length) {
      nonce[i] = i & 0xff;
    } else {
      nonce[i] = i & encoded[i];
    }
  }
  return nonce;
};

const encrypt = (message) => {
  const nonce = new_nonce(message);
  const sealed = nacl.secretbox(message, nonce, storageSk);
  return [nonce, sealed];
};

const decrypt = (nonce, sealed) => {
  return nacl.secretbox.open(sealed, nonce, storageSk);
};

const filesOnChange = (files) => {
  State.update({
    uploading: true,
    files: [],
  });
  if (files?.length > 0) {
    files.map((file, index) => {
      const reader = new FileReader();
      reader.onload = (_) => {
        const buf = new Uint8Array(reader.result);
        const [nonce, ciphertext] = encrypt(buf);
        const body = JSON.stringify({
          name: file.name,
          // convert uint8array to Array since stringify does weird formatting.
          nonce: Array.from(nonce),
          ciphertext: Array.from(ciphertext),
        });

        // Upload to IPFS
        asyncFetch("https://ipfs.near.social/add", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body,
        }).then((res) => {
          const cid = res.body.cid;
          console.log("uploaded to IPFS with cid", cid);
          State.update({
            files: [...state.files, { index, name: file.name, cid, nonce }],
          });
        });

        State.update({ uploading: false });
        if (props.update) {
          props.update(state.files);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  } else {
    State.update({
      uploading: false,
      files: null,
    });
  }
};

const onClickDelete = (index) => {
  const filesUpdated = state.files.filter((file) => file.index !== index);
  State.update({ files: filesUpdated });
};

const filesUploaded = () => {
  if (state.files.length > 0) {
    return state.files.map((file) => (
      <div class="d-flex flex-row gap-2 align-items-center">
        <button
          class="btn btn-danger rounded-0"
          type="button"
          data-toggle="tooltip"
          data-placement="top"
          title="Delete"
          onClick={() => onClickDelete(file.index)}
        >
          <i class="bi bi-trash" />
        </button>
        <i class={`bi fs-3 ${fileIcon}`} />
        <p>{file.name}</p>
      </div>
    ));
  }
  return <></>;
};

return (
  <div className="d-inline-block">
    {filesUploaded()}
    <Files
      multiple={true}
      minFileSize={1}
      clickable
      className="btn btn-outline-primary"
      onChange={filesOnChange}
    >
      {state.uploading
        ? "Uploading"
        : state.files.length > 0
        ? "Replace All"
        : buttonText}
    </Files>
    {props.debug && (
      <div>
        <p>Debug Data:</p>
        <pre>{JSON.stringify(state, undefined, 2)}</pre>
      </div>
    )}

    {state.image && (
      <div>
        <img alt="hello" src={state.image} />
      </div>
    )}
  </div>
);
