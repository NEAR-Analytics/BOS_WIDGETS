  <div>
      <h2>Create a Crowdfunding Campaign</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">Select a category</option>
            <option value="DeFi">DeFi</option>
            <option value="NFT">NFT</option>
          </select>
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="deadline">Deadline:</label>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={(event) => setDeadline(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <div className="image-upload">
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                  const base64String = reader.result
                    .replace("data:", "")
                    .replace(/^.+,/, "");
                  setImage(base64String);
                  setFileName(file.name);
                };
              }}
            />
            <label htmlFor="image" className="custom-file-upload">
              Upload Image
            </label>
            {fileName && <span>{fileName}</span>}
          </div>
        </div>
        <button
          type="submit"
          className="new-campaign-btn"
          disabled={isSubmitDisabled}
        >
          Create
        </button>
      </form>
    </div>
  );