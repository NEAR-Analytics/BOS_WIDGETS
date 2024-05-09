const { handleChange, period, show, mobile } = props;

const Loading = () => <Widget src="flashui.near/widget/Loading" />;

const code = `
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.umd.min.js"></script>
    <style>
      .preset-plugin-container{
        background: #fff;
      }
    </style>
  </head>

  <body style="display:none">
  </body>

  <script>
    window.addEventListener('message', function(event) {
      const {period, mobile} = event.data;

      const picker = new easepick.create({
        element: "body",
        css: [
            "https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css"
        ],
        calendars: mobile ? 1 : 2,
        grid: mobile ? 1 : 2,
        autoApply: true,
        plugins: [
          "AmpPlugin",
          "RangePlugin",
          "PresetPlugin"
        ],
        AmpPlugin: {
            resetButton: true,
            darkMode: false
        },
        PresetPlugin: {
          position: "top"
        },
        setup(picker) {
          picker.on('select', (e) => {
            let startDate =  picker.getStartDate('DD MMM YYYY');
            let endDate =  picker.getEndDate('DD MMM YYYY');
            window.top.postMessage({ startDate, endDate }, "*");
          });
        }
      });    

      picker.show();

    }, false);

    
  </script>
</html>
`;

const Container = styled.div`
  position: relative;
  width: 100%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  z-index: 1000;
  top: ${mobile ? "50px" : "10px"};
  right: ${mobile ? "-85px" : "-150px"};
  width: ${mobile ? "90vw" : "630px"};
  height: ${mobile ? "361px" : "341px"};
  border: 1px solid #ebebeb;
  background: var(--Primary-Base-White, #fff);
  box-shadow:
    0px 68px 19px 0px rgba(0, 0, 0, 0),
    0px 43px 17px 0px rgba(0, 0, 0, 0.01),
    0px 24px 15px 0px rgba(0, 0, 0, 0.04),
    0px 11px 11px 0px rgba(0, 0, 0, 0.07),
    0px 3px 6px 0px rgba(0, 0, 0, 0.08);

  iframe {
    width: 100%;
    height: 100%;
  }
`;

return (
  <>
    {show && (
      <Container>
        <Wrapper>
          <iframe
            srcDoc={code}
            onMessage={handleChange}
            message={{ period, mobile }}
          />
        </Wrapper>
      </Container>
    )}
  </>
);
