const ownerId = "refoundonbos.near";
// ToDo create deploy donate (campaign) contract - modify code accordantly
const donationContractId = "donate.refoundjournalism.near";
const registryContractId = "refoundjournalism.near";

const Card = styled.a`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 30%;
  min-width: 320px;
  border-radius: 7px;
  background: white;
  box-shadow: 0px -2px 0px #dbdbdb inset;
  border: 1px solid #dbdbdb;
  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 110px;
  padding: 16px 24px;
  gap: 16px;
  flex: 1;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #2e2e2e;
`;

const SubTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #2e2e2e;
  word-wrap: break-word;
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
`;

const Tag = styled.span`
  box-shadow: 0px -0.699999988079071px 0px rgba(123, 123, 123, 0.36) inset;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid rgba(123, 123, 123, 0.36);
  color: #2e2e2e;
`;

const DonationsInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  width: 100%;
  border-top: 1px #f0f0f0 solid;
`;

const DonationsInfoItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

const MAX_DESCRIPTION_LENGTH = 120;

const series = props.post;

// const series = Near.view(registryId, "get_series_details", { id: 0 });

// if (!series) {
//   return "Loading";
// }

//console.log("series", series)

const title = (series && series.title) || "Untitled";
const description = (series && series.description) || "";
let image =
  series.media ||
  "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm";

const tags = series && Object.keys(series.tags ?? {});
const dateTaken = series.dateTaken;
const location = series.location;
const verified = series.verified;
const seriesId = series.seriesId;
console.log("media", image);
const donationsForProject = Near.view(
  donationContractId,
  "get_total_donations",
  {
    recipient_id: id,
  }
);

const [totalAmount, totalDonors] = useMemo(() => {
  if (!donationsForProject) return [null, null];
  const donors = [];
  let totalDonationAmount = new Big(0);
  for (const donation of donationsForProject) {
    if (!donors.includes(donation.donor_id)) {
      donors.push(donation.donor_id);
    }
    totalDonationAmount = totalDonationAmount.plus(
      new Big(donation.total_amount)
    );
  }
  return [
    props.nearToUsd
      ? (props.nearToUsd * totalDonationAmount.div(1e24).toNumber()).toFixed(2)
      : totalDonationAmount.div(1e24).toNumber().toFixed(2),
    donors.length,
  ];
}, [donationsForProject]);

// const PROJECT_STATUSES = [
//   "Submitted",
//   "InReview",
//   "Approved",
//   "Rejected",
//   "Graylisted",
//   "Blacklisted",
// ];

// const getLinks = async (str) => {
// 	try {
// 		//const url = createGatewayUrl(cid, filePath);
// 		console.log('get image and audio', str);
// 		const ipfsPath = str.replace(".ipfs.w3s.link", "").replace("https://", "").split("/")[0];
// 		console.log(ipfsPath);

// 		const data = asyncFetch("https://dweb.link/api/v0/ls?arg=" + ipfsPath)
// 			.then((response) => {
//         console.log('ipfs links');
//         console.log(response.body)
// 		    console.log(response.body.Objects[0].Links);

//       Object.values(response.body.Objects[0].Links).forEach((item) => {
//         console.log('item', item);
//           if(item.Name.includes('.jpg') || item.Name.includes('.jpeg') || item.Name.includes('.png')){
//              console.log("https://" + item.Hash + ".ipfs.w3s.link/" + item.Name);
//             State.update({ipfsLink: "https://" + item.Hash + ".ipfs.w3s.link/" + item.Name})
//           }
//         });

//       })
// 			.catch((err) => {
// 				throw err;
// 			});

// 	} catch (err) {
// 		return null;
// 	}
// };

// if(state.ipfsLink == undefined || state.ipfsLink == null){
//   getLinks(image);
// }

return (
  <>
    <Card href={`?tab=post&seriesId=${seriesId}`} key={id}>
      <Info>
        <img
          className={className}
          style={style}
          src={image}
          alt={"post image"}
        />
        <Title>{title}</Title>
        <SubTitle>
          {description.length > MAX_DESCRIPTION_LENGTH
            ? description.slice(0, MAX_DESCRIPTION_LENGTH) + "..."
            : description}
        </SubTitle>
        <Widget
          src={`${ownerId}/widget/tags`}
          props={{
            ...props,
            tags,
          }}
        />
        <DonationsInfoItem>
          <Title>Date Taken</Title>
          <SubTitle>{dateTaken}</SubTitle>
        </DonationsInfoItem>
        <DonationsInfoItem>
          <Title>Location</Title>
          <SubTitle>{location}</SubTitle>
        </DonationsInfoItem>
      </Info>

      <DonationsInfoContainer>
        <DonationsInfoItem>
          <Title>{totalDonors || totalDonors === 0 ? totalDonors : "-"}</Title>
          <SubTitle>{totalDonors === 1 ? "Donor" : "Donors"}</SubTitle>
        </DonationsInfoItem>
        <DonationsInfoItem>
          <Title>
            {props.nearToUsd ? `$${totalAmount}` : `${totalAmount} N`}
          </Title>
          <SubTitle>Raised</SubTitle>
        </DonationsInfoItem>
      </DonationsInfoContainer>
    </Card>
  </>
);
