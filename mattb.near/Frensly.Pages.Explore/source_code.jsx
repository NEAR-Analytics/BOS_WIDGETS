State.init({
  posts: []
});

const $ = VM.require("sdks.near/widget/Loader");
const {
  Buttons: { ButtonPrimary },
} = $("@mattb/frensly/commons");
const { LensSDK } = $("@sdks/lens-sdk");

LensSDK = new LensSDK(State, state);

if (!state.posts.length) {
  let query = `query ExplorePublications($request: ExplorePublicationRequest!) {\n  explorePublications(request: $request) {\n    items {\n      ... on Post {\n        ...PostFields\n        __typename\n      }\n      ... on Quote {\n        ...QuoteFields\n        __typename\n      }\n      __typename\n    }\n    pageInfo {\n      next\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment PostFields on Post {\n  id\n  publishedOn {\n    id\n    __typename\n  }\n  isHidden\n  isEncrypted\n  momoka {\n    proof\n    __typename\n  }\n  txHash\n  createdAt\n  by {\n    ...PublicationProfileFields\n    __typename\n  }\n  stats {\n    ...PublicationStatsFields\n    __typename\n  }\n  operations {\n    ...PublicationOperationFields\n    __typename\n  }\n  metadata {\n    ...AnyPublicationMetadataFields\n    __typename\n  }\n  openActionModules {\n    ...OpenActionModulesFields\n    __typename\n  }\n  profilesMentioned {\n    snapshotHandleMentioned {\n      ...HandleInfoFields\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment PublicationProfileFields on Profile {\n  id\n  handle {\n    ...HandleInfoFields\n    __typename\n  }\n  ownedBy {\n    ...NetworkAddressFields\n    __typename\n  }\n  metadata {\n    ...ProfileMetadataFields\n    __typename\n  }\n  __typename\n}\n\nfragment HandleInfoFields on HandleInfo {\n  fullHandle\n  localName\n  suggestedFormatted {\n    localName\n    __typename\n  }\n  linkedTo {\n    nftTokenId\n    __typename\n  }\n  __typename\n}\n\nfragment NetworkAddressFields on NetworkAddress {\n  address\n  chainId\n  __typename\n}\n\nfragment ProfileMetadataFields on ProfileMetadata {\n  displayName\n  bio\n  rawURI\n  picture {\n    ... on ImageSet {\n      ...ImageSetFields\n      __typename\n    }\n    ... on NftImage {\n      image {\n        ...ImageSetFields\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  coverPicture {\n    ...ImageSetFields\n    __typename\n  }\n  attributes {\n    ...MetadataAttributeFields\n    __typename\n  }\n  __typename\n}\n\nfragment ImageSetFields on ImageSet {\n  optimized {\n    uri\n    __typename\n  }\n  raw {\n    uri\n    __typename\n  }\n  __typename\n}\n\nfragment MetadataAttributeFields on MetadataAttribute {\n  type\n  key\n  value\n  __typename\n}\n\nfragment PublicationStatsFields on PublicationStats {\n  id\n  comments\n  mirrors\n  quotes\n  reactions(request: {type: UPVOTE})\n  countOpenActions\n  bookmarks\n  __typename\n}\n\nfragment PublicationOperationFields on PublicationOperations {\n  isNotInterested\n  hasBookmarked\n  hasActed {\n    value\n    __typename\n  }\n  hasReacted(request: {type: UPVOTE})\n  canComment\n  canMirror\n  hasMirrored\n  hasQuoted\n  __typename\n}\n\nfragment AnyPublicationMetadataFields on PublicationMetadata {\n  ... on VideoMetadataV3 {\n    ...VideoMetadataV3Fields\n    __typename\n  }\n  ... on ArticleMetadataV3 {\n    ...ArticleMetadataV3Fields\n    __typename\n  }\n  ... on AudioMetadataV3 {\n    ...AudioMetadataV3Fields\n    __typename\n  }\n  ... on EmbedMetadataV3 {\n    ...EmbedMetadataV3Fields\n    __typename\n  }\n  ... on ImageMetadataV3 {\n    ...ImageMetadataV3Fields\n    __typename\n  }\n  ... on LinkMetadataV3 {\n    ...LinkMetadataV3Fields\n    __typename\n  }\n  ... on LiveStreamMetadataV3 {\n    ...LiveStreamMetadataV3Fields\n    __typename\n  }\n  ... on MintMetadataV3 {\n    ...MintMetadataV3Fields\n    __typename\n  }\n  ... on TextOnlyMetadataV3 {\n    ...TextOnlyMetadataV3Fields\n    __typename\n  }\n  __typename\n}\n\nfragment VideoMetadataV3Fields on VideoMetadataV3 {\n  id\n  rawURI\n  tags\n  attributes {\n    ...MetadataAttributeFields\n    __typename\n  }\n  asset {\n    ...PublicationMetadataMediaVideoFields\n    __typename\n  }\n  attachments {\n    ...PublicationMetadataMediaFields\n    __typename\n  }\n  title\n  content\n  encryptedWith {\n    ...PublicationMetadataLitEncryptionFields\n    __typename\n  }\n  __typename\n}\n\nfragment PublicationMetadataMediaVideoFields on PublicationMetadataMediaVideo {\n  video {\n    optimized {\n      uri\n      __typename\n    }\n    __typename\n  }\n  cover {\n    ...EncryptableImageSetFields\n    __typename\n  }\n  license\n  __typename\n}\n\nfragment EncryptableImageSetFields on EncryptableImageSet {\n  optimized {\n    uri\n    __typename\n  }\n  __typename\n}\n\nfragment PublicationMetadataMediaFields on PublicationMetadataMedia {\n  ... on PublicationMetadataMediaVideo {\n    ...PublicationMetadataMediaVideoFields\n    __typename\n  }\n  ... on PublicationMetadataMediaImage {\n    ...PublicationMetadataMediaImageFields\n    __typename\n  }\n  ... on PublicationMetadataMediaAudio {\n    ...PublicationMetadataMediaAudioFields\n    __typename\n  }\n  __typename\n}\n\nfragment PublicationMetadataMediaImageFields on PublicationMetadataMediaImage {\n  image {\n    ...EncryptableImageSetFields\n    __typename\n  }\n  __typename\n}\n\nfragment PublicationMetadataMediaAudioFields on PublicationMetadataMediaAudio {\n  artist\n  audio {\n    optimized {\n      uri\n      __typename\n    }\n    __typename\n  }\n  cover {\n    ...EncryptableImageSetFields\n    __typename\n  }\n  license\n  __typename\n}\n\nfragment PublicationMetadataLitEncryptionFields on PublicationMetadataLitEncryption {\n  encryptionKey\n  accessCondition {\n    criteria {\n      ... on SecondTierCondition {\n        ...SecondTierConditionFields\n        __typename\n      }\n      ... on ThirdTierCondition {\n        ...ThirdTierConditionFields\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment SecondTierConditionFields on SecondTierCondition {\n  ... on AndCondition {\n    ...AndConditionFields\n    __typename\n  }\n  ... on OrCondition {\n    ...OrConditionFields\n    __typename\n  }\n  __typename\n}\n\nfragment AndConditionFields on AndCondition {\n  criteria {\n    ... on ThirdTierCondition {\n      ...ThirdTierConditionFields\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment ThirdTierConditionFields on ThirdTierCondition {\n  ... on AdvancedContractCondition {\n    ...AdvancedContractConditionFields\n    __typename\n  }\n  ... on CollectCondition {\n    ...CollectConditionFields\n    __typename\n  }\n  ... on EoaOwnershipCondition {\n    ...EoaOwnershipConditionFields\n    __typename\n  }\n  ... on Erc20OwnershipCondition {\n    ...Erc20OwnershipConditionFields\n    __typename\n  }\n  ... on FollowCondition {\n    ...FollowConditionFields\n    __typename\n  }\n  ... on NftOwnershipCondition {\n    ...NftOwnershipConditionFields\n    __typename\n  }\n  ... on ProfileOwnershipCondition {\n    ...ProfileOwnershipConditionFields\n    __typename\n  }\n  __typename\n}\n\nfragment AdvancedContractConditionFields on AdvancedContractCondition {\n  contract {\n    ...NetworkAddressFields\n    __typename\n  }\n  __typename\n}\n\nfragment CollectConditionFields on CollectCondition {\n  publicationId\n  thisPublication\n  __typename\n}\n\nfragment EoaOwnershipConditionFields on EoaOwnershipCondition {\n  address\n  __typename\n}\n\nfragment Erc20OwnershipConditionFields on Erc20OwnershipCondition {\n  amount {\n    ...AmountFields\n    __typename\n  }\n  condition\n  __typename\n}\n\nfragment AmountFields on Amount {\n  asset {\n    ...Erc20Fields\n    __typename\n  }\n  value\n  __typename\n}\n\nfragment Erc20Fields on Asset {\n  ... on Erc20 {\n    name\n    symbol\n    decimals\n    contract {\n      ...NetworkAddressFields\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment FollowConditionFields on FollowCondition {\n  follow\n  __typename\n}\n\nfragment NftOwnershipConditionFields on NftOwnershipCondition {\n  contract {\n    ...NetworkAddressFields\n    __typename\n  }\n  contractType\n  tokenIds\n  __typename\n}\n\nfragment ProfileOwnershipConditionFields on ProfileOwnershipCondition {\n  profileId\n  __typename\n}\n\nfragment OrConditionFields on OrCondition {\n  criteria {\n    ... on ThirdTierCondition {\n      ...ThirdTierConditionFields\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment ArticleMetadataV3Fields on ArticleMetadataV3 {\n  id\n  rawURI\n  tags\n  attributes {\n    ...MetadataAttributeFields\n    __typename\n  }\n  title\n  content\n  attachments {\n    ...PublicationMetadataMediaFields\n    __typename\n  }\n  encryptedWith {\n    ...PublicationMetadataLitEncryptionFields\n    __typename\n  }\n  __typename\n}\n\nfragment AudioMetadataV3Fields on AudioMetadataV3 {\n  id\n  rawURI\n  tags\n  attributes {\n    ...MetadataAttributeFields\n    __typename\n  }\n  asset {\n    ...PublicationMetadataMediaAudioFields\n    __typename\n  }\n  attachments {\n    ...PublicationMetadataMediaFields\n    __typename\n  }\n  title\n  content\n  encryptedWith {\n    ...PublicationMetadataLitEncryptionFields\n    __typename\n  }\n  __typename\n}\n\nfragment EmbedMetadataV3Fields on EmbedMetadataV3 {\n  id\n  __typename\n}\n\nfragment ImageMetadataV3Fields on ImageMetadataV3 {\n  id\n  rawURI\n  tags\n  attributes {\n    ...MetadataAttributeFields\n    __typename\n  }\n  attachments {\n    ...PublicationMetadataMediaFields\n    __typename\n  }\n  asset {\n    ...PublicationMetadataMediaImageFields\n    __typename\n  }\n  title\n  content\n  encryptedWith {\n    ...PublicationMetadataLitEncryptionFields\n    __typename\n  }\n  __typename\n}\n\nfragment LinkMetadataV3Fields on LinkMetadataV3 {\n  id\n  rawURI\n  tags\n  attributes {\n    ...MetadataAttributeFields\n    __typename\n  }\n  attachments {\n    ...PublicationMetadataMediaFields\n    __typename\n  }\n  content\n  sharingLink\n  encryptedWith {\n    ...PublicationMetadataLitEncryptionFields\n    __typename\n  }\n  __typename\n}\n\nfragment LiveStreamMetadataV3Fields on LiveStreamMetadataV3 {\n  id\n  rawURI\n  tags\n  attributes {\n    ...MetadataAttributeFields\n    __typename\n  }\n
    playbackURL\n  liveURL\n  title\n  content\n  attachments {\n    ...PublicationMetadataMediaFields\n    __typename\n  }\n  encryptedWith {\n    ...PublicationMetadataLitEncryptionFields\n    __typename\n  }\n  __typename\n}\n\nfragment MintMetadataV3Fields on MintMetadataV3 {\n  id\n  rawURI\n  tags\n  attributes {\n    ...MetadataAttributeFields\n    __typename\n  }\n  mintLink\n  attachments {\n    ...PublicationMetadataMediaFields\n    __typename\n  }\n  content\n  encryptedWith {\n    ...PublicationMetadataLitEncryptionFields\n    __typename\n  }\n  __typename\n}\n\nfragment TextOnlyMetadataV3Fields on TextOnlyMetadataV3 {\n  id\n  rawURI\n  tags\n  attributes {\n    ...MetadataAttributeFields\n    __typename\n  }\n  content\n  encryptedWith {\n    ...PublicationMetadataLitEncryptionFields\n    __typename\n  }\n  __typename\n}\n\nfragment OpenActionModulesFields on OpenActionModule {\n  ... on SimpleCollectOpenActionSettings {\n    type\n    contract {\n      ...NetworkAddressFields\n      __typename\n    }\n    amount {\n      ...AmountFields\n      __typename\n    }\n    collectNft\n    collectLimit\n    followerOnly\n    recipient\n    referralFee\n    endsAt\n    __typename\n  }\n  ... on MultirecipientFeeCollectOpenActionSettings {\n    type\n    contract {\n      ...NetworkAddressFields\n      __typename\n    }\n    amount {\n      ...AmountFields\n      __typename\n    }\n    collectNft\n    collectLimit\n    referralFee\n    followerOnly\n    endsAt\n    recipients {\n      recipient\n      split\n      __typename\n    }\n    __typename\n  }\n  ... on LegacyFreeCollectModuleSettings {\n    type\n    contract {\n      ...NetworkAddressFields\n      __typename\n    }\n    collectNft\n    followerOnly\n    __typename\n  }\n  ... on LegacyFeeCollectModuleSettings {\n    type\n    contract {\n      ...NetworkAddressFields\n      __typename\n    }\n    amount {\n      ...AmountFields\n      __typename\n    }\n    collectNft\n    followerOnly\n    recipient\n    referralFee\n    __typename\n  }\n  ... on LegacyLimitedFeeCollectModuleSettings {\n    type\n    contract {\n      ...NetworkAddressFields\n      __typename\n    }\n    amount {\n      ...AmountFields\n      __typename\n    }\n    collectNft\n    collectLimit\n    followerOnly\n    recipient\n    referralFee\n    __typename\n  }\n  ... on LegacyLimitedTimedFeeCollectModuleSettings {\n    type\n    contract {\n      ...NetworkAddressFields\n      __typename\n    }\n    amount {\n      ...AmountFields\n      __typename\n    }\n    collectNft\n    collectLimit\n    followerOnly\n    recipient\n    referralFee\n    endTimestamp\n    __typename\n  }\n  ... on LegacyRevertCollectModuleSettings {\n    type\n    __typename\n  }\n  ... on LegacyTimedFeeCollectModuleSettings {\n    type\n    contract {\n      ...NetworkAddressFields\n      __typename\n    }\n    amount {\n      ...AmountFields\n      __typename\n    }\n    collectNft\n    followerOnly\n    recipient\n    referralFee\n    endTimestamp\n    __typename\n  }\n  ... on LegacyMultirecipientFeeCollectModuleSettings {\n    type\n    contract {\n      ...NetworkAddressFields\n      __typename\n    }\n    amount {\n      ...AmountFields\n      __typename\n    }\n    collectNft\n    collectLimit\n    referralFee\n    followerOnly\n    endsAt\n    recipients {\n      recipient\n      split\n      __typename\n    }\n    __typename\n  }\n  ... on LegacySimpleCollectModuleSettings {\n    type\n    contract {\n      ...NetworkAddressFields\n      __typename\n    }\n    amount {\n      ...AmountFields\n      __typename\n    }\n    collectNft\n    collectLimit\n    followerOnly\n    recipient\n    referralFee\n    endsAt\n    __typename\n  }\n  ... on LegacyERC4626FeeCollectModuleSettings {\n    type\n    __typename\n  }\n  ... on LegacyAaveFeeCollectModuleSettings {\n    type\n    __typename\n  }\n  ... on UnknownOpenActionModuleSettings {\n    type\n    contract {\n      ...NetworkAddressFields\n      __typename\n    }\n    initializeResultData\n    initializeCalldata\n    openActionModuleReturnData\n    __typename\n  }\n  __typename\n}\n\nfragment QuoteFields on Quote {\n  ...QuoteBaseFields\n  quoteOn {\n    ... on Post {\n      ...PostFields\n      __typename\n    }\n    ... on Comment {\n      ...CommentBaseFields\n      __typename\n    }\n    ... on Quote {\n      ...QuoteBaseFields\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment QuoteBaseFields on Quote {\n  id\n  publishedOn {\n    id\n    __typename\n  }\n  isHidden\n  isEncrypted\n  momoka {\n    proof\n    __typename\n  }\n  txHash\n  createdAt\n  by {\n    ...PublicationProfileFields\n    __typename\n  }\n  stats {\n    ...PublicationStatsFields\n    __typename\n  }\n  operations {\n    ...PublicationOperationFields\n    __typename\n  }\n  metadata {\n    ...AnyPublicationMetadataFields\n    __typename\n  }\n  openActionModules {\n    ...OpenActionModulesFields\n    __typename\n  }\n  profilesMentioned {\n    snapshotHandleMentioned {\n      ...HandleInfoFields\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment CommentBaseFields on Comment {\n  id\n  publishedOn {\n    id\n    __typename\n  }\n  isHidden\n  isEncrypted\n  momoka {\n    proof\n    __typename\n  }\n  txHash\n  createdAt\n  by {\n    ...PublicationProfileFields\n    __typename\n  }\n  stats {\n    ...PublicationStatsFields\n    __typename\n  }\n  operations {\n    ...PublicationOperationFields\n    __typename\n  }\n  metadata {\n    ...AnyPublicationMetadataFields\n    __typename\n  }\n  openActionModules {\n    ...OpenActionModulesFields\n    __typename\n  }\n  root {\n    ... on Post {\n      ...PostFields\n      __typename\n    }\n    ... on Quote {\n      ...QuoteBaseFields\n      __typename\n    }\n    __typename\n  }\n  profilesMentioned {\n    snapshotHandleMentioned {\n      ...HandleInfoFields\n      __typename\n    }\n    __typename\n  }\n  __typename\n}`;
  let request = {
    request: {
      limit: "TwentyFive",
      orderBy: "LENS_CURATED",
      where: {
        customFilters: ["GARDENERS"],
        metadata: {}
      }
    }
  }
  LensSDK.customRequest(
    query,
    request
  ).then((payload) => {
    State.update({ 
        posts: payload.data.explorePublications.items
    });
  });
}

const Container = styled.div`
   padding: 1.8rem;
`;

const WritePost = styled.div`
  display:flex;
  align-items:flex-start;
  width:100%;
  max-width:700px;
  margin:25px 0;
  border-radius:20px;
  background-color:#FAFAFA;
  border: 1px solid rgba(0,0,0,.05);
  box-sizing:border-box;
  padding:1.5rem;

  .textarea-container {
    position:relative;
    width:100%;
    box-sizing:border-box;
    margin-left:1rem;

    a {
        position:absolute;
        right:0px;
        bottom:13px;
    }
  }
`;

const Avatar = styled.div`
  display:flex;
  flex-grow:1;
  width:100%;
  max-width:60px;
  height:60px;
  border-radius:100%;
  background-color:rgba(0,0,0,.05);
  overflow:hidden;
  flex-shrink:0;
  border:1px solid rgba(0,0,0,.05);

  img {
    max-width:100%;
  }
`;

const TextArea = styled.textarea`
 width:100%;
 height:120px;
 border:0;
 background-color:#fff;
 border-radius:10px;
 padding:1rem;
 resize:none;
 outline-style:none;
`;

const Posts = styled.div`
  margin-top:2.5rem;
`;

const Box = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    max-width:700px;
    background-color:#FAFAFA;
    border: 1px solid rgba(0,0,0,.05);
    box-sizing:border-box;
    padding:1.5rem;

    :not(:last-of-type) {
      border-bottom:0;
    }

    :first-of-type {
      border-top-left-radius:20px;
      border-top-right-radius:20px;
    }

    :last-of-type {
      border-bottom-left-radius:20px;
      border-bottom-right-radius:20px;
    }

    * {
        padding:0;
        margin:0;
    }
`;

const Profile = styled.div`
    display:flex;
`;

const PostAvatar = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:60px;
    height:60px;
    border-radius:100%;
    background-position:center;
    background-size:cover;
    background-repeat:no-repeat;
    background-color:rgba(0,0,0,.05);
    box-shadow: 0 0 0 3px rgba(0,0,0,.05);
`;

const Details = styled.div`
    display:flex;
    justify-content:center;
    flex-direction:column;
    flex-grow:1;
    box-sizing:border-box;
    padding: 0 .7rem;
    color;#000;
    opacity:.7;
    line-height:1.4rem;
    transition: all .2s;

    &:hover {
        transition: all .2s;
        opacity:.9;
    }

    p.name {
        font-size:1.3rem;
        font-weight:bold;
        letter-spacing:-.5px;
    }

    p.handle {
        font-size:.8rem;
        font-weight:bold;
        opacity:.7;
    }

    p.time {
        font-size:.8rem;
    }
`;

const Post = styled.div`
    width:100%;
    height:100%;
    flex-grow:1;
    background-color:#fff;
    border-radius:20px;
    margin:1.3rem 0;
    box-sizing:border-box;
    padding:1rem;
    color:rgba(0,0,0,.8);
    word-break:break-words;

    img {
      margin-top:20px;
      border-radius:20px;
      max-height:400px;
    }
`;

const Actions = styled.div`
    display:flex;
    justify-content:space-between;
    padding:1.6rem 0 0;
    text-align:center;
    border-top: 2px solid rgba(0,0,0,.05);

    p {
        position:relative;
        display:flex;
        align-items:center;
        justify-content:center;
        width:calc(30px + 1rem);
        height:calc(30px + 1rem);
        font-size:1.2rem;
        font-weight:bold;
        padding:1rem;
        border-radius:100%;
        background-color:#F2F2F2;
        color:red;
        cursor:pointer;
        border: 2px solid rgba(0,0,0,.05);

        &:hover {
            img {
                opacity:.9;
                transition: all .2s;
            }

            .tip {
                opacity:1;
                transition: all .2s;
            }
        }

        .badge {
            position:absolute;
            top:0;
            transform:translateX(calc(50% + 8px));
            font-size:.7rem;
            color:#fff;
            padding: 2px 4px;
            background-color:#35393C;
            border-radius:10px;
            border: 1px solid rgba(0,0,0,.05);
        }

        .tip {
            opacity:0;
            pointer-events:none;
            display:block;
            position:absolute;
            bottom:-85%;
            font-size:.8rem;
            color: #fff;
            background-color:#35393C;
            padding: 2px 8px;
            border-radius:5px;
            font-weight:normal;
            transition: all .2s;
        }
        
        img {
            max-height:24px;
            opacity:.6;
            transition: all .2s;
        }
    }
`;

const Time = styled.div`
    margin-top:1rem;
    padding: .8rem 0 0;
    font-size:.8rem;
    border-top:1px solid rgba(0,0,0,.1);
`;

return (
  <Container>
    <ButtonPrimary>See Lens posts</ButtonPrimary>
    <ButtonPrimary>See Frensly posts</ButtonPrimary>
    <Posts>
    {state.posts.length === 0 && <Widget src="mattb.near/widget/Frensly.Skeletons.Posts" />}
    {state.posts.map((post) => {
          return <>
            <Box>
          <Profile>
            <PostAvatar
              style={{
                backgroundImage: `url("${post.by.metadata.picture.optimized.uri}")`,
              }}
            ></PostAvatar>
            <Details>
              <p class="name">{post.by.metadata.displayName}</p>
              <p class="handle">{post.by.handle.suggestedFormatted.localName}.lens</p>
            </Details>
          </Profile>
          <Post>
            <Markdown
              text={post.metadata.content}
            />
            {post.metadata.asset?.image.optimized.uri && <Markdown
              text={`![Image](${post.metadata.asset.image.optimized.uri})`}
            />}
            <Time>
              <p>
                {post.createdAt} ·{" "}
                {post.publishedOn.id && `Posted via ${post.publishedOn.id}`}
              </p>
            </Time>
          </Post>
          <Actions>
            <p>
              <img src="https://ipfs.near.social/ipfs/bafkreihzp4er5k54cqym5tzj6yqo5oftnpfillxshuou6qyjbbap677lyu" />
              <span class="badge">{post.stats.comments}</span>
              <span class="tip">Comment</span>
            </p>
            <p>
              <img src="https://ipfs.near.social/ipfs/bafkreihzytwkhu3u6jc7yapsbuwsff33wlltrlcyv2s7h6jqld7qdmfxqm" />
              <span class="badge">{post.stats.mirrors}</span>
              <span class="tip">Mirror</span>
            </p>
            <p>
              <img src="https://ipfs.near.social/ipfs/bafkreiag6hlzwic63nonmqon5cdfs6hbw3qzpdvz3nhckfvezcthc3otrq" />
              <span class="badge">{post.stats.collects}</span>
              <span class="tip">Collect</span>
            </p>
            <p>
              <img src="https://ipfs.near.social/ipfs/bafkreieqyco26dt23l4v66ppp3sdh6pei72h4pdirhl7ety6rxpmxdtra4" />
              <span class="badge">{post.stats.reactions}</span>
              <span class="tip">Like</span>
            </p>
          </Actions>
        </Box>
          </>
        })}
    </Posts>
  </Container>
);
