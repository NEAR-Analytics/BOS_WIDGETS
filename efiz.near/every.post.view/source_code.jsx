function Post({ path, blockHeight }) {
  const thing = JSON.parse(Social.get(path, blockHeight) || "null");

  if (!thing) {
    return <p>Loading...</p>;
  }

  return <p>{JSON.parse(thing)}</p>;
}

return { Post };
