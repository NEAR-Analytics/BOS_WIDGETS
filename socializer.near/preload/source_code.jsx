const Wrapper = styled.div`
    width: 150px;
    height: 150px;
    margin: 50px auto 0;
    position: relative;

    & .cube-wrapper{
        transform-style: preserve-3d;
        animation: bouncing 2s infinite;
    }
    & .cube{
        transform-style: preserve-3d;
        transform: rotateX(45deg) rotateZ(45deg);
        animation: rotation 2s infinite;
    }
    & .cube-faces{
        transform-style: preserve-3d;
        height: 80px;
        width: 80px;
        position: relative;
        transform-origin: 0 0;
        transform: translateX(0) translateY(0) translateZ(-40px);
    }
    & .cube-face{
        position: absolute;
        inset: 0;
        background: #110d31ff;
        border: solid 1px #fff;
    }
    & .cube-face.shadow{
        transform: translateZ(-80px);
        animation: bouncing-shadow 2s infinite;
    }
    & .cube-face.top{ transform: translateZ(80px); }
    & .cube-face.front{
        transform-origin: 0 50%;
        transform: rotateY(-90deg);
    }
    & .cube-face.back{
        transform-origin: 0 50%;
        transform: rotateY(-90deg) translateZ(-80px);
    }
    & .cube-face.right{
        transform-origin: 50% 0;
        transform: rotateX(-90deg) translateY(-80px);
    }
    & .cube-face.left{
        transform-origin: 50% 0;
        transform: rotateX(-90deg) translateY(-80px) translateZ(80px);
    }

    @keyframes rotation{
        0%{
            transform: rotateX(45deg) rotateY(0) rotateZ(45deg);
            animation-timing-function: cubic-bezier(0.17, 0.84, 0.44, 1);
        }
        50%{
            transform: rotateX(45deg) rotateY(0) rotateZ(225deg);
            animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
        }
        100%{
            transform: rotateX(45deg) rotateY(0) rotateZ(405deg);
            animation-timing-function: cubic-bezier(0.17, 0.84, 0.44, 1);
        }
    }
    @keyframes bouncing{
        0%{
            transform: translateY(-40px);
            animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
        }
        45%{
            transform: translateY(40px);
            animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
        }
        100%{
            transform: translateY(-40px);
            animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
        }
    }
    @keyframes bouncing-shadow{
        0%{
            transform: translateZ(-80px) scale(1.3);
            animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
            opacity: 0.05;
        }
        45%{
            transform: translateZ(0);
            animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
            opacity: 0.3;
        }
        100%{
            transform: translateZ(-80px) scale(1.3);
            animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
            opacity: 0.05;
        }
    }
`;

return (
  <div className="d-flex justify-content-center align-items-center w-100">
    <Wrapper>
      <div className="cube-wrapper">
        <div className="cube">
          <div className="cube-faces">
            <div className="cube-face shadow" />
            <div className="cube-face bottom" />
            <div className="cube-face top" />
            <div className="cube-face left" />
            <div className="cube-face right" />
            <div className="cube-face back" />
            <div className="cube-face front" />
          </div>
        </div>
      </div>
    </Wrapper>
  </div>
);
