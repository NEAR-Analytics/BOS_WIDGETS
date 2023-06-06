const getRecommendationsFor = (_accountId) => {
  const bucketName = "near-public-lakehouse";
  const url = `https://${bucketName}.s3.amazonaws.com/silver/near-social/${_accountId}.json`;

  return asyncFetch(url)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

const accountId = "00711.near"; // swap with context.userId
getRecommendationsFor(accountId);
