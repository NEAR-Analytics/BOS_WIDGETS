const code = `<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <style>
    @import url("https://fonts.googleapis.com/css?family=Roboto");
    @-webkit-keyframes come-in {
      0% {
        -webkit-transform: translatey(100px);
                transform: translatey(100px);
        opacity: 0;
      }
      30% {
        -webkit-transform: translateX(-50px) scale(0.4);
                transform: translateX(-50px) scale(0.4);
      }
      70% {
        -webkit-transform: translateX(0px) scale(1.2);
                transform: translateX(0px) scale(1.2);
      }
      100% {
        -webkit-transform: translatey(0px) scale(1);
                transform: translatey(0px) scale(1);
        opacity: 1;
      }
    }
    @keyframes come-in {
      0% {
        -webkit-transform: translatey(100px);
                transform: translatey(100px);
        opacity: 0;
      }
      30% {
        -webkit-transform: translateX(-50px) scale(0.4);
                transform: translateX(-50px) scale(0.4);
      }
      70% {
        -webkit-transform: translateX(0px) scale(1.2);
                transform: translateX(0px) scale(1.2);
      }
      100% {
        -webkit-transform: translatey(0px) scale(1);
                transform: translatey(0px) scale(1);
        opacity: 1;
      }
    }
    * {
      margin: 0;
      padding: 0;
    }
    html, body {
      background: transparent;
      font-family: 'Roboto', sans-serif;
    }
    .floating-container {
      position: fixed;
      width: 100px;
      height: 100px;
      bottom: 0;
      right: 0;
      margin: 35px 25px;
    }
    .floating-container:hover {
      height: 300px;
    }
    .floating-container:hover .floating-button {
      box-shadow: 0 10px 25px rgba(44, 179, 240, 0.6);
      -webkit-transform: translatey(5px);
              transform: translatey(5px);
      -webkit-transition: all 0.3s;
      transition: all 0.3s;

      
    }
    .floating-container:hover .element-container .float-element:nth-child(1) {
      -webkit-animation: come-in 0.4s forwards 0.2s;
              animation: come-in 0.4s forwards 0.2s;
    }
    .floating-container:hover .element-container .float-element:nth-child(2) {
      -webkit-animation: come-in 0.4s forwards 0.4s;
              animation: come-in 0.4s forwards 0.4s;
    }
    .floating-container:hover .element-container .float-element:nth-child(3) {
      -webkit-animation: come-in 0.4s forwards 0.6s;
              animation: come-in 0.4s forwards 0.6s;
    }
    .floating-container .floating-button {
        
      position: absolute;
      width: 65px;
      height: 65px;
      background: #d2cafa;
      bottom: 0;
      border-radius: 50%;
      left: 0;
      right: 0;
      margin: auto;
      color: #664ff8;
      line-height: 65px;
      text-align: center;
      font-size: 23px;
      z-index: 100;
      box-shadow: 0 10px 25px -5px rgba(44, 179, 240, 0.6);
      cursor: pointer;
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
    }
    .floating-container .float-element {
      position: relative;
      display: block;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      margin: 15px auto;
      color: white;
      font-weight: 500;
      text-align: center;
      line-height: 50px;
      z-index: 0;
      opacity: 0;
      -webkit-transform: translateY(100px);
              transform: translateY(100px);
    }
    .floating-container .float-element .material-icons {
      vertical-align: middle;
      font-size: 16px;
    }
    .floating-container .float-element:nth-child(1) {
      background: #fff;
      color:#664ff8;
      box-shadow: 0 20px 20px -10px #664ff8;
    }
    .floating-container .float-element:nth-child(2) {
      background: #fff;
            color:#664ff8;
      box-shadow: 0 20px 20px -10px #664ff8;
    }
    .floating-container .float-element:nth-child(3) {
      background: #fff;
            color:#664ff8;
      box-shadow: 0 20px 20px -10px #664ff8;
    }
  </style>
</head>
<body>
  <div class="floating-container">
    <div class="floating-button">+</div>
    

    <div class="element-container">
      <a href="google.com">
        <span class="float-element tooltip-left">
          <i class="material-icons" >phone</i>
        </span>
      </a>
      <span class="float-element">
        <i class="material-icons">email</i>
      </span>
      <span class="float-element">
        <i class="material-icons">chat</i>
      </span>
    </div>
  </div>
</body>
</html>
`;

return (
  <div>
    <iframe srcDoc={code} />
  </div>
);
