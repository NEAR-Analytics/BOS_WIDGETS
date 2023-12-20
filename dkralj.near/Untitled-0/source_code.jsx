const Wrapper = styled.div`
    .card {
        background: var(--web-gradient, linear-gradient(180deg, #0386BC 0%, #503285 31.35%, #0B1543 60.52%));
        border-radius: 20px;
        padding: 20px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        color: white;
        text-align: center;
    }

    .header {
        position: relative;
        margin-bottom: 20px;
    }

    .profile-image {
        width: 300px;
        height: 300px;
        border-radius: 50%;
        border: 5px solid white;
        background-color: #ddd; /* Placeholder for the actual image */
    }

    .content h1 {
        margin: 0;
        font-size: 1.5em;
    }

    .wallet {
        font-size: 1em;
        color: #c0b6f2;
        color: #FFF;
    }

    .description {
        font-size: 0.9em;
        margin-bottom: 20px;
    }

    .save-button {
        background-color: #ffffff;
        color: #6e57e0;
        border: none;
        border-radius: 20px;
        padding: 10px 20px;
        font-size: 1em;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .save-button:hover {
        background-color: #f0f0f0;
    }

    .social-links {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 20px;
    }

    .social-link {
        text-decoration: none;
        color: white;
        padding: 5px 10px;
        border-radius: 10px;
        background: rgba(0,0,0,0.2);
    }
`;

return (
  <Wrapper>
    <div class="card">
      <div class="header">
        <img
          src="https://ipfs.near.social/ipfs/bafybeicovmsutlxxsjqf6uuglw3dyv4bwxnipmobuhiuhws3vc7lfqus2e"
          alt="Profile Image"
          class="profile-image"
        />
      </div>
      <div class="content">
        <h1>David Kraljic</h1>
        <p class="wallet">{context.accountId}</p>
        <p class="description">
          Researching blockchain for application development
        </p>
        <a href="mailto:[shmungula@gmail.com]" class="save-button">
          Contact me
        </a>
      </div>
    </div>
  </Wrapper>
);
