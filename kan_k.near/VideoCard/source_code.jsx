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
const ownerProfile = Social.getr(`${video.owner}/profile`);
console.log(ownerProfile);
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
    <div className="HStack Lable gap-4 mb-4">
      <img src={video.thumbnail} className="video object-fill h-48" />
      <div className="VStack justify-between">
        <div className="">
          <p className="Label font-medium text-lg">{video.title}</p>
          <p className="Grey">4 days ago</p>
          <div className="HStack items-center gap-2 mt-4">
            <Widget
              src="mob.near/widget/Image"
              props={{
                image: ownerProfile.image,
                className: '"h-10 w-10 rounded-full',
                alt: ownerProfile.name,
                fallbackUrl:
                  "https://ipfs.near.social/ipfs/bafkreibiyqabm3kl24gcb2oegb7pmwdi6wwrpui62iwb44l7uomnn3lhbi",
              }}
            />
            <p> {video.owner} </p>
          </div>
        </div>
      </div>
    </div>
  </Link>
);
