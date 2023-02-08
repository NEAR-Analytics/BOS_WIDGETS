const url = props.url;

if (!url) {
  return props.__engine.helpers.propIsRequiredMessage('url');
}

if (!state) {
  State.init({ loaded: false, src: null });
  return <></>;
}

const AnimationFadeBlurIn = styled.keyframes`
  from {
    opacity: 0;
    filter: blur(20px);
  }

  to {
    opacity: 1;
    filter: blur(0px);
  }
`;

const LoadedImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${state.loaded ? 1 : 0};

  animation: ${AnimationFadeBlurIn} 1s ease-in-out;
  animation-delay: ${(props) => props.delay || '0s'};
  animation-fill-mode: both;
  animation-iteration-count: 1;
  animation-duration: ${(props) => props.duration || '1s'};
`;

return (
  <>
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

    {state.loaded && (
      <img
        src={state.src}
        alt={props.alt || 'Image'}
        delay={props.delay || '0s'}
        duration={props.duration || '0.5s'}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'blur(200px)',
        }}
      />
    )}

    {state.loaded && (
      <LoadedImage
        src={state.src}
        alt={props.alt || 'Image'}
        style={props.style || {}}
        delay={props.delay || '2s'}
        duration={props.duration || '2s'}
        onAnimationEnd={() => {
          console.log('Animation end 1');
        }}
      />
    )}
  </>
);
