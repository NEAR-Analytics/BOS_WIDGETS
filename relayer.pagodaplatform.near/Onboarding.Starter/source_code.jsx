return (
  <>
    <div className="App">
      <header className="App-header">
        <h1 className="app-title">KnocKnoc</h1>
        <div className="input-wrapper">
          <label className="publish-label" htmlFor="file-input">
            Publish Music
          </label>
          <input
            id="file-input"
            onChange={(e) => uploadFile(e.target.files)}
            type="file"
            acccept="audio/mp3"
            className="file-input"
          />
        </div>
        <div className="file-list">
          {files.map((file, index) => (
            <div className="file-info" key={index}>
              <p>
                <strong>File name:</strong> {file.Name}
              </p>
              <p>
                <strong>File Hash :</strong> {file.Hash}
              </p>

              <div className="link">
                <p>
                  <a
                    href={
                      "https://gateway.lighthouse.storage/ipfs/" + file.Hash
                    }
                  >
                    Download File
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="file-list">
          <div className="file-info">
            <p>
              <strong>File name:</strong> drop sound.mp3
            </p>
            <p>
              <strong>File Hash :</strong>{" "}
              QmY4V8kcST7qjBfAMso1RvezpRqcvzBptnR4Di1JvaB5ac
            </p>

            <div className="link">
              <p>
                <a
                  href={
                    "https://gateway.lighthouse.storage/ipfs/QmY4V8kcST7qjBfAMso1RvezpRqcvzBptnR4Di1JvaB5ac"
                  }
                >
                  Download File
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="file-list">
          <div className="file-info">
            <p>
              <strong>File name:</strong> Sneaky-Snitch.mp3
            </p>
            <p>
              <strong>File Hash :</strong>{" "}
              QmbbTiR6QB13GMUALpXp6RTsTtJUSCFdRsKhhobz81jb5N
            </p>

            <div className="link">
              <p>
                <a
                  href={
                    "https://gateway.lighthouse.storage/ipfs/QmbbTiR6QB13GMUALpXp6RTsTtJUSCFdRsKhhobz81jb5N"
                  }
                >
                  Download File
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
    </div>
  </>
);
