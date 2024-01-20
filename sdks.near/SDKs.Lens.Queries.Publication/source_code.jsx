const PUBLICATION_QUERY = `
    query Publication($publicationRequest: PublicationRequest!) {
      result: publication(request: $publicationRequest) {
        ... on Post {
          ...Post
        }
        ... on Mirror {
          ...Mirror
        }
        ... on Comment {
          ...Comment
        }
        ... on Quote {
          ...Quote
        }
      }
    }
`;

return {
  PUBLICATION_QUERY,
};
