const Wrapper = styled.div`
width: 100px;
height: 100px;
margin: 50px auto;
position: relative;

& .loader-inner-1,
& .loader-inner-2,
& .loader-inner-3,
& .loader-inner-4{
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    position: absolute;
}
& .loader-inner-1:before,
& .loader-inner-2:before,
& .loader-inner-3:before,
& .loader-inner-4:before{
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    position: absolute;
    right: 0;
    animation-name: loading-1;
    animation-iteration-count: infinite;
    animation-direction: normal;
    animation-duration: 2s;
}
& .loader-inner-1{
    top: 0;
    left: 0;
    transform: rotate(70deg);
}
& .loader-inner-1:before{ background: #06aed5; }
& .loader-inner-2{
    top: 0;
    right: 0;
    transform: rotate(160deg);
}
& .loader-inner-2:before{ background: #ec008c; }
& .loader-inner-3{
    bottom: 0;
    right: 0;
    transform: rotate(-110deg);
}
& .loader-inner-3:before{ background: #ffbf00; }
& .loader-inner-4{
    bottom: 0;
    left: 0;
    transform: rotate(-20deg);
}
& .loader-inner-4:before{ background: #079c00; }
@keyframes loading-1{
    0%{
        width: 20px;
        right: 0;
    }
    30%{
        width: 120px;
        right: -100px;
    }
    60%{
        width: 20px;
        right: -100px;
    }
}
`;

return (
  <div className="d-flex justify-content-center align-items-center">
    <Wrapper>
      <span className="loader-inner-1"></span>
      <span className="loader-inner-2"></span>
      <span className="loader-inner-3"></span>
      <span className="loader-inner-4"></span>
    </Wrapper>
  </div>
);
