function Post({ path, blockHeight }) {
  const thing = JSON.parse(Social.get(path, blockHeight) || "null");

  if (!thing) {
    return <p>Loading...</p>;
  }

  return <p>Hello world</p>;
}

return { Post };
