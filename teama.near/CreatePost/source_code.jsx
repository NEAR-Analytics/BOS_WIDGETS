return (
  <div>
    <ul id="navbar-example2" className="navbar bg-body-tertiary px-3 mb-3">
      <a className="navbar-brand" href="#">
        Heapheap Hooray
      </a>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <a className="nav-link" href="#scrollspyHeading1">
            Create Post
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href="https://bos.gg/theerin_petch.near/widget/Draft-1"
          >
            Search Post
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#scrollspyHeading3">
            My Post
          </a>
        </li>
      </ul>
    </ul>
    <div>
      <h2>Create Post</h2>
    </div>

    <div>
      <div style={{ marginBottom: "5%" }}>
        <label for="postTitle" style={{ fontSize: "20px" }}>
          Post Title:
        </label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="Your Title"
          required
        ></input>
      </div>

      <div>
        <label for="postContent">Post Content:</label>
      </div>
      <div>
        <textarea
          id="postContent"
          name="postContent"
          placeholder=" Your Content"
          rows="8"
          style={{ width: "100%" }}
          required
        ></textarea>
      </div>

      <div>
        <div class="text-end mt-3">
          <div class="mb-2">
            <button type="button" class="btn btn-primary">
              Submit Post
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
