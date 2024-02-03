const { videoId, cdnAccount } = props;
const {
  body: { token },
} = fetch(`https://charleslavon.xyz/api/video?videoId=${videoId}`);

return (
  <iframe
    src={`https://customer-${cdnAccount}.cloudflarestream.com/${token}/iframe`}
    height="720"
    width="1280"
    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
    allowfullscreen="true"
  ></iframe>
);
