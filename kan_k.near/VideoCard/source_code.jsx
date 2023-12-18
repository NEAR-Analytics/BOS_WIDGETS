const video = props.video || {
  id: "1",
  timestamp: 1702882062,
  title: "Test 20 yr",
  description: "test123",
  owner: "kan_k.near",
  src: "https://youtu.be/pC3dIPpC7JI?si=ERfG4HufLQkyY_j_",
  thumbnail:
    "https://ipfs.near.social/ipfs/bafkreielwwffvkzqquv4gt7n35m47dht53v4sowvy3hyukj4arv4oaymni",
};
const onwerProfile = Social.getr(`${video.owner}/profile`);

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}

return (
  <Link className="button button--primary" href={`/play/${video.id}`}>
    <div className=" rounded-lg overflow-hidden w-full h-54 flex flex-col object-contain bg-gray-200 hover:bg-gray-500">
      <img src={video.thumbnail} className="video object-fill w-full h-48" />
      <p className="text-black w-full pl-2 whitespace-nowrap mt-2">
        {video.title}
      </p>
      <div className="pl-2"> {timeConverter(video.timestamp)}</div>
    </div>
  </Link>
);
