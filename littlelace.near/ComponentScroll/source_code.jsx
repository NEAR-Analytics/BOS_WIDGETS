// scrollbar
const ScrollBar = styled.div`
  width: 10px;
  height: 100%;
  right: 0;
  top: 0px;
  position: absolute;
  border-radius: 7px;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.35);
  opacity: ${(props) => (props.hovering ? 1 : 0)};
  align-self: center;
  justify-self: center;
`;

const ScrollBarTrack = styled.div`
  position: relative;
  height: 100%;
`;

const ScrollBarThumb = styled.div`
  position: absolute;
  width: 100%;
  background-color: #888;
  border-radius: 4px;
`;

const [scrollbarHeight, setScrollbarHeight] = useState(0);
const [thumbTop, setThumbTop] = useState(0);

const handleScroll = (event) => {
  const { scrollTop, scrollHeight, clientHeight } = event.target;

  const calculatedHeight = (clientHeight / scrollHeight) * clientHeight;
  const calculatedTop = (scrollTop / scrollHeight) * 100;

  setScrollbarHeight(calculatedHeight);
  setThumbTop(calculatedTop);
};

return (
  <ScrollBar>
    <ScrollBarTrack>
      <ScrollBarThumb
        scrollbarHeight={scrollbarHeight}
        thumbTop={thumbTop + "%"}
      />
    </ScrollBarTrack>
  </ScrollBar>
);
