const Container = styled.div`
   background-color:#000;
   .warningTip{
    display:flex;
    align-items:start;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    color: #00FFD1;
    .icon{
      position:relative;
      top:-1px;
      margin-right:5px;
    }
    a{
      color: #00FFD1;
      text-decoration:underline;
    }
   }
   .title{
     font-weight: 500;
     font-size: 16px;
     color: #FFFFFF;
     margin-bottom:10px;
   }
   .form-input{
     display:block;
     background: rgba(26, 46, 51, 0.25);
     border: 0.5px solid rgba(255, 255, 255, 0.3);
     border-radius: 10px;
     height: 47px;
     width:100%;
     color:rgba(255, 255, 255, 0.3);
     padding:0 10px
   }
   .form-input:focus-visible{
     outline:none;
   }
   .form-textarea{
     display:block;
     background: rgba(26, 46, 51, 0.25);
     border: 0.5px solid rgba(255, 255, 255, 0.3);
     border-radius: 10px;
     width:100%;
     color:rgba(255, 255, 255, 0.3);
     padding:10px;
   }
   .form-textarea:focus-visible{
     outline:none;
   }
   .websit .input-group{
     display:flex;
     align-items:stretch;
     flex-wrap:nowrap;
     overflow:hidden;
   }
   
   .websit .input-group-text{
     background-color:#304352;
     color:#fff;
     border:none;
   }
   .websit .input-group{
     border: 1px solid rgba(255, 255, 255, 0.3);
     border-radius: 10px;
   }
   .uploadButtonBanner{
    margin-bottom:60px;
   }
   .uploadButtonBanner .btn{
    background: #304352;
    border-radius: 10px;
    font-weight: 500;
    font-size: 14px;
    color:#fff;
    border:none;
  }
  .select-area{
    position:relative;
    .selected{
      position:relative;
      display:flex;
      align-items:center;
      background: rgba(26, 46, 51, 0.25);
      border: 0.5px solid rgba(255, 255, 255, 0.3);
      border-radius: 10px;
      height:47px;
      padding:0 15px;
      color:#fff;
      font-size:16px;
      font-weight:bold;
      cursor:pointer;
      i{
        position:absolute;
        right:15px;
        &:before{
          font-weight: bold!important;
        }
      }
    }
    .select-list{
      position:absolute;
      left:0;
      top:50px;
      width:100%;
      display:flex;
      flex-direction:column;
      background: #13181A;
      border: 1px solid #3A4244;
      border-radius: 10px;
      padding:10px 0;
      z-index:10;
      &.show{
        display:flex;
      }
      &.hidden{
        display:none;
      }
      span{
        padding:10px 25px;
        font-weight: 500;
        font-size: 16px;
        color:#fff;
        cursor:pointer;
        &:hover{
          background-color:rgba(0, 0, 0, 0.2);
        }
      }
    }
  }
`;
const initialMetadata = props.initialMetadata ?? {};
const onChange = props.onChange;
const options = props.options;
const { selectListStatus, selectOptions, selectedItem} = state;
State.init({
  initialMetadata,
  metadata: initialMetadata,
  reportedMetadata: initialMetadata,
  linktree: initialMetadata.linktree ?? {},
  image: initialMetadata.image,
  bannerImage: { cid: initialMetadata.bannerImage.cid},
  backgroundImage: initialMetadata.backgroundImage,
  screenshots: initialMetadata.screenshots ?? {},
  selectOptions: [{id:'NEAR'}, {id:'Ethereum'}, { id:'Bsc'}, {id:'Arbitrum'}],
  selectedItem: initialMetadata.chain ? {id: initialMetadata.chain} : undefined,
});

const metadata = {
  from: "shanshan",
  name: options.name ? state.metadata.name : undefined,
  description: options.name ? state.metadata.description : undefined,
  linktree:
    options.linktree && Object.keys(state.linktree).length > 0
      ? state.linktree
      : undefined,
  image:
    options.image && state.image && Object.keys(state.image).length > 0
      ? state.image
      : undefined,
  bannerImage:
    options.banner && state.bannerImage && Object.keys(state.bannerImage).length > 0
      ? state.bannerImage
      : undefined,
  backgroundImage:
    options.backgroundImage &&
    state.backgroundImage &&
    Object.keys(state.backgroundImage).length > 0
      ? state.backgroundImage
      : undefined,
  tags: options.tags ? state.metadata.tags : undefined,
  screenshots: options.screenshots ? state.metadata.screenshots : undefined,
  chain: options.chain ? state.selectedItem.id : undefined
};

if (
  onChange &&
  JSON.stringify(state.reportedMetadata) !== JSON.stringify(metadata)
) {
  State.update({
    reportedMetadata: metadata,
  });
  onChange(metadata);
}
function selectOptionsFun(item) {
  State.update({
    selectedItem:item,
    selectListStatus:false,
  })
}
const warningIcon = <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.46979 0.510742C3.60976 0.510742 0.48053 3.63964 0.48053 7.5C0.48053 11.3604 3.60976 14.4893 7.46979 14.4893C11.3298 14.4893 14.459 11.3597 14.459 7.5C14.459 3.6403 11.3298 0.510742 7.46979 0.510742ZM7.46979 11.2423C7.30897 11.242 7.15185 11.194 7.0183 11.1044C6.88474 11.0148 6.78073 10.8877 6.71942 10.739C6.6581 10.5903 6.64223 10.4268 6.6738 10.2691C6.70538 10.1114 6.78299 9.96665 6.89682 9.85305C7.01065 9.73945 7.1556 9.66214 7.31336 9.63088C7.47111 9.59963 7.63459 9.61584 7.78313 9.67745C7.93168 9.73907 8.05863 9.84334 8.14794 9.97708C8.23726 10.1108 8.28492 10.268 8.28492 10.4288C8.28492 10.5358 8.26383 10.6417 8.22284 10.7405C8.18186 10.8393 8.12179 10.9291 8.04608 11.0047C7.97036 11.0802 7.88049 11.1401 7.7816 11.1809C7.68271 11.2217 7.57675 11.2425 7.46979 11.2423ZM8.28492 7.71914C8.28187 7.93329 8.19465 8.13764 8.04213 8.28799C7.88961 8.43835 7.68404 8.52264 7.46987 8.52264C7.2557 8.52264 7.05013 8.43835 6.89761 8.28799C6.74509 8.13764 6.65787 7.93329 6.65482 7.71914V3.92469C6.65787 3.71054 6.74509 3.50619 6.89761 3.35583C7.05013 3.20547 7.2557 3.12118 7.46987 3.12118C7.68404 3.12118 7.88961 3.20547 8.04213 3.35583C8.19465 3.50619 8.28187 3.71054 8.28492 3.92469V7.71914Z" fill="#00FFD1"/>
</svg>;
return (
  <Container>
    <div className="warningTip">
      <span class="icon">{warningIcon}</span>
      <p>Notice: It will be published as a component. If you want to publish it as a template, please <a href="#">contact us</a>.</p>
    </div>
    {options.name && (
      <div className="mb-2">
        <label class="title">{options.name.label ?? "Name"}</label>
        <input class="form-input" type="text" value={state.metadata.name} />
      </div>
    )}
    {options.image && (
      <div className="mb-2">
        <label class="title">{options.image.label ?? "Image"}</label>
        <Widget
          src="ref-admin.near/widget/ImageEditorTabs"
          props={{
            image: state.image,
            onChange: (image) => State.update({ image }),
          }}
        />
      </div>
    )}
    {options.banner && (
      <div className="mb-2">
        <label class="title">{options.banner.label ?? "Banner"}</label>
        <div className="uploadButtonBanner">
         <IpfsImageUpload image={state.bannerImage} />
        </div>
      </div>
    )}
    {options.backgroundImage && (
      <div className="mb-2">
        <label class="title">
          {options.backgroundImage.label ?? "Background image"}
        </label>
        <Widget
          src="ref-admin.near/widget/ImageEditorTabs"
          props={{
            image: state.backgroundImage,
            onChange: (backgroundImage) => State.update({ backgroundImage }),
          }}
        />
      </div>
    )}
    {options.description && (
      <div className="mb-2">
        <label class="title">
          {options.description.label ?? "Description"}
        </label>
        <span className="text-white"> (supports markdown)</span>
        <textarea
          className="form-textarea"
          rows={5}
          value={state.metadata.description}
          onChange={(e) => {
            state.metadata.description = e.target.value;
            State.update();
          }}
        />
      </div>
    )}
    {options.chain && (
      <div className="mb-4">
        <label class="title">
          {options.chain.label ?? "Chain"}
        </label>
        <div className="select-area">
          <div className="selected" onClick={() => {
            State.update({
              selectListStatus: true
            })
          }}>
            {selectedItem.id}
            <i class="bi bi-chevron-compact-down text-white"></i>
          </div>
          <div className={`select-list ${selectListStatus ? 'show': 'hidden'}`}>
            {
              selectOptions && selectOptions.map((item) => <span onClick={() => {
                selectOptionsFun(item)
              }}>{item.id}</span>)
            }
          </div>
        </div>
      </div>
    )}
    {options.tags && (
      <div className="mb-2">
        <label class="title">{options.tags.label ?? "Tags"}</label>
        <Widget
          src="ref-admin.near/widget/TagsEditor"
          props={{
            initialTagsObject: metadata.tags,
            tagsPattern: options.tags.pattern,
            placeholder:
              options.tags.placeholder ??
              "rust, engineer, artist, humanguild, nft, learner, founder",
            setTagsObject: (tags) => {
              state.metadata.tags = tags;
              State.update();
            },
          }}
        />
      </div>
    )}
    {options.linktree &&
      (options.linktree.links ?? []).map((link) => (
        <div className="mb-2 websit">
          <label class="title">{link.label}</label>
          <div className="input-group">
            <span className="input-group-text">{link.prefix}</span>
            <input
              class="form-input"
              type="text"
              value={state.linktree[link.name]}
            />
          </div>
        </div>
      ))}
  </Container>
);
