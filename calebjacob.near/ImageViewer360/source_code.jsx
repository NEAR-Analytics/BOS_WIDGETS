State.init({
  currentImageIndex: 0,
});

const description = "A description of my image";
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

const currentImageSrc = images[state.currentImageIndex];

function nextImage() {
  const index =
    state.currentImageIndex < images.length - 1
      ? state.currentImageIndex + 1
      : 0;
  State.update({ currentImageIndex: index });
}

const Wrapper = styled.div`
    width: 100%;
    max-width: 600px;
    border: 1px solid #ccc;
    position: relative;

    img {
        display: block;
        width: 100%;
        opacity: 0;
        transition: opacity 300ms;
    }
`;

const Images = styled.div`
    position: absolute;
    inset: 1rem;

    img {
        position: absolute;
        inset: 0;
    }

    .currentImage {
        opacity: 1;
    }
`;

return (
  <Wrapper onClick={nextImage}>
    <img src={images[0]} alt={description} />

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
