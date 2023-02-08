const url = props.url;

if (!url) {
  return props.__engine.helpers.propIsRequiredMessage('url');
}

if (!state) {
  State.init({ loaded: false, src: null });
  return <></>;
}

const AnimationFadeBlurIn = styled.keyframes`
  0% {
    opacity: 0;
    filter: blur(50px);
    transform: rotate(-8deg) scale(0.22);
  }

  30% {
    filter: blur(40px);
    transform: rotate(8deg) scale(0.2);
  }

  100% {
    opacity: 1;
    filter: blur(0px);
    transform: rotate(0deg) scale(1);
  }
`;

const LoadedImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;

  animation: ${AnimationFadeBlurIn} 1s ease-in-out;
  animation-delay: ${(props) => props.delay || '0s'};
  animation-fill-mode: forwards;
  animation-duration: ${(props) => props.duration || '0s'};
`;

return (
  <>
    {!state.loaded && (
      <img
        src={url}
        alt={props.alt || 'Image'}
        onLoad={() => {
          console.log('Image loaded');
          State.update({ loaded: true, src: url });
        }}
        style={{
          display: 'none',
          width: 0,
          height: 0,
        }}
      />
    )}

    {state.loaded && (
      <LoadedImage
        src={state.src}
        alt={props.alt || 'Image'}
        style={props.style || {}}
        delay={props.delay || '0.4s'}
        duration={props.duration || '0.8s'}
      />
    )}
  </>
);
