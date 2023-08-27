const Slide = ({ content }) => {
  const styles = {
    backgroundImage: `url(${content})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
    width: '100%',
  };
  
  return <div style={styles}></div>;
};

const Slider = () => {
  
  const images = [
    "https://near.org/_next/static/media/logo-black.2e682d59.svg",
    "",
    "",
  ]

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <div style={{ height: '500px', width: '500px' }}>
      <Slide content={images[index]} />
    </div>
  );
};