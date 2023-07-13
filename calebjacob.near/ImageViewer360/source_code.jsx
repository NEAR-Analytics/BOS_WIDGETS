State.init({
  currentImageIndex: 0,
  pointerIsDown: false,
  pointerStartPositionX: 0,
});

const pointerMoveThreshold = 20;
const description = "A fancy description of my image";
const images = [
  "https://ipfs.near.social/ipfs/bafkreibu3gr4saomeeg6cwlu5vj7x2lfl7ixx7peigklad34dtxemlape4",
  "https://ipfs.near.social/ipfs/bafkreiaw7hltj3pxaotgb62zofoe2gte6etreho3t5vnvn5i52eeczyzwy",
  "https://ipfs.near.social/ipfs/bafkreibp4ye7hpnpmrdowjnnoifehl4eis72grgtrfso2r4dj56cb4wioq",
  "https://ipfs.near.social/ipfs/bafkreibonmxktirqm6ryjitinq6iex55xlyigzim65qc6ed2rdxkb64xfa",
  "https://ipfs.near.social/ipfs/bafkreicg5nhez4l6kpbfbbyfxzcq2amt7wvyl75hxg7lweedhjwyfvslli",
  "https://ipfs.near.social/ipfs/bafkreiej6x4cpwwfzgwo52xz64z57nhaa6g2g7gdmfvlu4njtg5coxyqde",
  "https://ipfs.near.social/ipfs/bafkreigfcs6wmilv5moo3j77lc2osq2crjdmlvsjjwox5bzjfg5tv6y3qy",
  "https://ipfs.near.social/ipfs/bafkreigr5566l2iznytoick7zvjkablvapgsturpjukffqrhgezbdy7anu",
  "https://ipfs.near.social/ipfs/bafkreidgb7drovahl4jakunbkhzjj2m4wjd2scin6q6i2ke2cyy3wuhzgy",
  "https://ipfs.near.social/ipfs/bafkreibbtbjceuz3timus4m3p26fus2cwr7oisaxmuhai4rtldstqqhytu",
  "https://ipfs.near.social/ipfs/bafkreia442yukgvfkeleq2k7dqw66no2itn6lbfzl65xelksvfvmsnz2w4",
  "https://ipfs.near.social/ipfs/bafkreifsu3yiyuvunybj4ay3yngg4dx7jb6cgrhlq75oq76fm6kqhwumwi",
  "https://ipfs.near.social/ipfs/bafkreia442yukgvfkeleq2k7dqw66no2itn6lbfzl65xelksvfvmsnz2w4",
  "https://ipfs.near.social/ipfs/bafkreibbtbjceuz3timus4m3p26fus2cwr7oisaxmuhai4rtldstqqhytu",
  "https://ipfs.near.social/ipfs/bafkreidgb7drovahl4jakunbkhzjj2m4wjd2scin6q6i2ke2cyy3wuhzgy",
  "https://ipfs.near.social/ipfs/bafkreigr5566l2iznytoick7zvjkablvapgsturpjukffqrhgezbdy7anu",
  "https://ipfs.near.social/ipfs/bafkreigfcs6wmilv5moo3j77lc2osq2crjdmlvsjjwox5bzjfg5tv6y3qy",
  "https://ipfs.near.social/ipfs/bafkreiej6x4cpwwfzgwo52xz64z57nhaa6g2g7gdmfvlu4njtg5coxyqde",
  "https://ipfs.near.social/ipfs/bafkreicg5nhez4l6kpbfbbyfxzcq2amt7wvyl75hxg7lweedhjwyfvslli",
  "https://ipfs.near.social/ipfs/bafkreibonmxktirqm6ryjitinq6iex55xlyigzim65qc6ed2rdxkb64xfa",
  "https://ipfs.near.social/ipfs/bafkreibp4ye7hpnpmrdowjnnoifehl4eis72grgtrfso2r4dj56cb4wioq",
  "https://ipfs.near.social/ipfs/bafkreiaw7hltj3pxaotgb62zofoe2gte6etreho3t5vnvn5i52eeczyzwy",
];

function nextImage() {
  const index =
    state.currentImageIndex < images.length - 1
      ? state.currentImageIndex + 1
      : 0;
  State.update({ currentImageIndex: index });
}

function previousImage() {
  const index =
    state.currentImageIndex === 0
      ? images.length - 1
      : state.currentImageIndex - 1;
  State.update({ currentImageIndex: index });
}

function onPointerDown(e) {
  State.update({ pointerIsDown: true, pointerStartPositionX: e.clientX });
}

function onPointerUp() {
  State.update({ pointerIsDown: false });
}

function onPointerMove(e) {
  if (state.pointerIsDown) {
    const diff = state.pointerStartPositionX - e.clientX;

    if (Math.abs(diff) > pointerMoveThreshold) {
      State.update({ pointerStartPositionX: e.clientX });
      if (diff < 0) {
        nextImage();
      } else {
        previousImage();
      }
    }
  }
}

const Wrapper = styled.div`
    width: 100%;
    max-width: 600px;
    position: relative;
    background: #000;
    touch-action: none;
    user-select: none;
`;

const Images = styled.div`
    position: absolute;
    inset: 1rem;

    img {
        display: block;
        width: 100%;
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
    }

    .currentImage {
        opacity: 1;
    }
`;

const DefaultImage = styled.img`
    display: block;
    width: 100%;
    opacity: 0;
`;

const Icon360 = styled.img`
    z-index: 10;
    position: absolute;
    top: 0.5rem;
    right: 1rem;
    width: 60px;
`;

return (
  <Wrapper
    onPointerDown={onPointerDown}
    onPointerUp={onPointerUp}
    onPointerLeave={onPointerUp}
    onPointerMove={onPointerMove}
  >
    <Icon360
      src="https://ipfs.near.social/ipfs/bafkreidnqbpcuc5ufvvnq7kgde5fyefbctpxfrf56s2s4jydghovjpxy2q"
      alt="360 Image View"
    />

    <DefaultImage src={images[0]} alt={description} />

    <Images>
      {images.map((image, i) => {
        return (
          <img
            src={image}
            alt={description}
            key={image}
            className={i === state.currentImageIndex ? "currentImage" : ""}
          />
        );
      })}
    </Images>
  </Wrapper>
);
