const IPFS_URL =
  "https://ipfs.near.social/ipfs/bafkreig5myhzwzekq46mqmbyvcibgxfxcvt5p65x55ls6vn2vq66mqtl2e";

State.init({
  blogPost: null,
});

function unescapeMarkdown(escapedString) {
  return escapedString
    .replace(/\\n/g, "\n")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, "\\");
}

const fetchBlogPost = () => {
  asyncFetch(IPFS_URL)
    .then((response) => response.body)
    .then((data) => {
      if (data && data.markdownContent) {
        const unescapedContent = unescapeMarkdown(data.markdownContent);
        State.update({ blogPost: { content: unescapedContent } });
      }
    })
    .catch((error) => {
      console.log("Error fetching blog post:", error);
    });
};

if (!state.blogPost) {
  fetchBlogPost();
  return <div>Loading...</div>;
}

const { content } = state.blogPost;

return (
  <div className="bg-gray-800 text-white p-4">
    <div className="container border border-info pt-3 min-vw-100 text-left">
      <Markdown text={content} /> {/* Ensure Markdown is rendered correctly */}
    </div>
  </div>
);
