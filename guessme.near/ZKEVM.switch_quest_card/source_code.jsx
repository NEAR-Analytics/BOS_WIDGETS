const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
  height: 42px;
`;
const Wrap = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #332c4b;
  font-weight: 500;
  height: 42px;
  svg {
    position: absolute;
    right: -100px;
    bottom: 43px;
  }
  .highlight {
    color: #000;
    font-weight: 700;
    margin: 0 3px;
    text-decoration: underline;
  }
  .button-dark {
    width: 40px;
    height: 20px;
    border-radius: 20px;
    position: relative;
    flex-shrink: 0;
    cursor: pointer;
    background-color: #181a27;
    margin-left: 18px;
    .button-dark-circle {
      width: 16px;
      height: 16px;
      border-radius: 100%;
      background: #979abe;
      position: absolute;
      left: 2px;
      top: 2px;
    }
  }

  .button-light {
    flex-shrink: 0;
    width: 40px;
    height: 20px;
    border-radius: 20px;
    border: 1px solid #979abe;
    position: relative;
    background: linear-gradient(90deg, #794fdd 0%, #4c25a9 100%);
    cursor: pointer;
    margin-left: 18px;
    .button-light-circle {
      position: absolute;
      right: 2px;
      top: 1px;
      width: 16px;
      height: 16px;
      border-radius: 100%;
      background: linear-gradient(90deg, #eef3bf 0%, #e9f456 100%);
    }
  }
`;
const addToQuestTip = (
  <svg
    width="289"
    height="96"
    viewBox="0 0 289 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="1"
      y="1"
      width="287"
      height="65"
      rx="16"
      fill="#1E202F"
      stroke="url(#paint0_linear_433_2)"
      stroke-dasharray="2 2"
    />
    <path
      d="M17.5644 28V18.528H14.2044V17.312H22.2844V18.528H18.9404V28H17.5644ZM24.2796 28V17.312H25.5756V21.584C25.8103 21.1893 26.1356 20.88 26.5516 20.656C26.9783 20.432 27.4956 20.32 28.1036 20.32C28.9676 20.32 29.645 20.5653 30.1356 21.056C30.6263 21.5467 30.8716 22.32 30.8716 23.376V28H29.5756V23.52C29.5756 22.7947 29.4263 22.272 29.1276 21.952C28.8396 21.6213 28.3916 21.456 27.7836 21.456C27.0796 21.456 26.5356 21.7013 26.1516 22.192C25.7676 22.672 25.5756 23.328 25.5756 24.16V28H24.2796ZM36.9086 28.16C36.162 28.16 35.49 28.0053 34.8926 27.696C34.2953 27.3867 33.826 26.944 33.4846 26.368C33.1433 25.7813 32.9726 25.072 32.9726 24.24C32.9726 23.44 33.138 22.7467 33.4686 22.16C33.7993 21.5733 34.2473 21.12 34.8126 20.8C35.378 20.48 36.0073 20.32 36.7006 20.32C37.4366 20.32 38.0713 20.464 38.6046 20.752C39.138 21.04 39.5486 21.4293 39.8366 21.92C40.1246 22.4 40.2686 22.9493 40.2686 23.568C40.2686 23.7387 40.242 23.9307 40.1886 24.144C40.146 24.3467 40.0873 24.512 40.0126 24.64H34.3006C34.354 25.152 34.4926 25.5893 34.7166 25.952C34.9513 26.304 35.266 26.5707 35.6606 26.752C36.0553 26.9333 36.5086 27.024 37.0206 27.024C37.522 27.024 37.9593 26.9493 38.3326 26.8C38.7166 26.64 39.0846 26.416 39.4366 26.128L39.9486 27.104C39.5433 27.456 39.0846 27.7227 38.5726 27.904C38.0606 28.0747 37.506 28.16 36.9086 28.16ZM34.3006 23.552H38.9246C38.9353 23.5307 38.9406 23.5093 38.9406 23.488C38.9406 23.4667 38.9406 23.4347 38.9406 23.392C38.9406 23.008 38.8606 22.672 38.7006 22.384C38.5406 22.0853 38.2953 21.856 37.9646 21.696C37.6446 21.536 37.2393 21.456 36.7486 21.456C36.3646 21.456 36.002 21.5413 35.6606 21.712C35.3193 21.872 35.0313 22.1067 34.7966 22.416C34.562 22.7253 34.3966 23.104 34.3006 23.552ZM54.52 31.072C53.7947 31.072 53.1867 30.9387 52.696 30.672C52.216 30.416 51.8533 30.0693 51.608 29.632C51.3627 29.1947 51.24 28.704 51.24 28.16C50.1307 28.16 49.1707 27.9253 48.36 27.456C47.5493 26.976 46.9253 26.3253 46.488 25.504C46.0507 24.672 45.832 23.7227 45.832 22.656C45.832 21.5893 46.0507 20.6453 46.488 19.824C46.9253 18.992 47.5493 18.3413 48.36 17.872C49.1707 17.392 50.1307 17.152 51.24 17.152C52.36 17.152 53.32 17.392 54.12 17.872C54.9307 18.3413 55.5547 18.992 55.992 19.824C56.4293 20.6453 56.648 21.5893 56.648 22.656C56.648 23.584 56.4773 24.4267 56.136 25.184C55.8053 25.9413 55.3253 26.5707 54.696 27.072C54.0667 27.5627 53.3093 27.888 52.424 28.048C52.456 28.688 52.664 29.1627 53.048 29.472C53.432 29.792 53.9547 29.952 54.616 29.952C54.9787 29.952 55.3307 29.888 55.672 29.76C56.0133 29.6427 56.3867 29.4507 56.792 29.184L57.288 30.128C56.808 30.4693 56.344 30.7093 55.896 30.848C55.4587 30.9973 55 31.072 54.52 31.072ZM51.24 26.944C52.0613 26.944 52.7707 26.768 53.368 26.416C53.9653 26.0533 54.424 25.552 54.744 24.912C55.0747 24.2613 55.24 23.5093 55.24 22.656C55.24 21.8027 55.0747 21.056 54.744 20.416C54.424 19.7653 53.9653 19.264 53.368 18.912C52.7707 18.5493 52.0613 18.368 51.24 18.368C50.4187 18.368 49.7093 18.5493 49.112 18.912C48.5147 19.264 48.0507 19.7653 47.72 20.416C47.4 21.056 47.24 21.8027 47.24 22.656C47.24 23.5093 47.4 24.2613 47.72 24.912C48.0507 25.552 48.5147 26.0533 49.112 26.416C49.7093 26.768 50.4187 26.944 51.24 26.944ZM61.5164 28.16C60.6524 28.16 59.975 27.9147 59.4844 27.424C58.9937 26.9333 58.7484 26.16 58.7484 25.104V20.48H60.0444V24.96C60.0444 25.6853 60.1884 26.2133 60.4764 26.544C60.775 26.864 61.2284 27.024 61.8364 27.024C62.5404 27.024 63.0844 26.784 63.4684 26.304C63.8524 25.8133 64.0444 25.152 64.0444 24.32V20.48H65.3404V28H64.0924V26.816C63.8684 27.232 63.5377 27.5627 63.1004 27.808C62.663 28.0427 62.135 28.16 61.5164 28.16ZM71.3774 28.16C70.6307 28.16 69.9587 28.0053 69.3614 27.696C68.764 27.3867 68.2947 26.944 67.9534 26.368C67.612 25.7813 67.4414 25.072 67.4414 24.24C67.4414 23.44 67.6067 22.7467 67.9374 22.16C68.268 21.5733 68.716 21.12 69.2814 20.8C69.8467 20.48 70.476 20.32 71.1694 20.32C71.9054 20.32 72.54 20.464 73.0734 20.752C73.6067 21.04 74.0174 21.4293 74.3054 21.92C74.5934 22.4 74.7374 22.9493 74.7374 23.568C74.7374 23.7387 74.7107 23.9307 74.6574 24.144C74.6147 24.3467 74.556 24.512 74.4814 24.64H68.7694C68.8227 25.152 68.9614 25.5893 69.1854 25.952C69.42 26.304 69.7347 26.5707 70.1294 26.752C70.524 26.9333 70.9774 27.024 71.4894 27.024C71.9907 27.024 72.428 26.9493 72.8014 26.8C73.1854 26.64 73.5534 26.416 73.9054 26.128L74.4174 27.104C74.012 27.456 73.5534 27.7227 73.0414 27.904C72.5294 28.0747 71.9747 28.16 71.3774 28.16ZM68.7694 23.552H73.3934C73.404 23.5307 73.4094 23.5093 73.4094 23.488C73.4094 23.4667 73.4094 23.4347 73.4094 23.392C73.4094 23.008 73.3294 22.672 73.1694 22.384C73.0094 22.0853 72.764 21.856 72.4334 21.696C72.1134 21.536 71.708 21.456 71.2174 21.456C70.8334 21.456 70.4707 21.5413 70.1294 21.712C69.788 21.872 69.5 22.1067 69.2654 22.416C69.0307 22.7253 68.8654 23.104 68.7694 23.552ZM79.4345 28.16C78.8585 28.16 78.3252 28.0747 77.8345 27.904C77.3438 27.7227 76.8638 27.4613 76.3945 27.12L76.9865 26.064C77.4452 26.384 77.8665 26.624 78.2505 26.784C78.6452 26.944 79.0452 27.024 79.4505 27.024C80.0478 27.024 80.4958 26.9333 80.7945 26.752C81.0932 26.56 81.2425 26.2827 81.2425 25.92C81.2425 25.6213 81.1518 25.4027 80.9705 25.264C80.7998 25.1147 80.4905 24.9973 80.0425 24.912L78.6825 24.656C77.9998 24.528 77.4878 24.2987 77.1465 23.968C76.8052 23.6373 76.6345 23.2107 76.6345 22.688C76.6345 22.2613 76.7412 21.872 76.9545 21.52C77.1785 21.1573 77.5038 20.8693 77.9305 20.656C78.3572 20.432 78.8905 20.32 79.5305 20.32C80.0745 20.32 80.5812 20.4053 81.0505 20.576C81.5305 20.736 81.9572 20.9547 82.3305 21.232L81.7545 22.256C81.4345 22.0213 81.0932 21.8293 80.7305 21.68C80.3678 21.5307 79.9838 21.456 79.5785 21.456C79.0772 21.456 78.6825 21.5467 78.3945 21.728C78.1065 21.8987 77.9625 22.1707 77.9625 22.544C77.9625 22.7893 78.0478 22.9813 78.2185 23.12C78.3892 23.2587 78.6772 23.3653 79.0825 23.44L80.4425 23.696C81.1252 23.824 81.6478 24.048 82.0105 24.368C82.3838 24.688 82.5705 25.1627 82.5705 25.792C82.5705 26.4853 82.3038 27.056 81.7705 27.504C81.2372 27.9413 80.4585 28.16 79.4345 28.16ZM87.7103 28.096C86.9636 28.096 86.4036 27.92 86.0303 27.568C85.6676 27.2053 85.4863 26.6453 85.4863 25.888V21.6H83.8063V20.48H85.4863V18.336H86.7823V20.48H88.7663V21.6H86.7823V25.792C86.7823 26.1867 86.8783 26.4853 87.0703 26.688C87.2623 26.88 87.5556 26.976 87.9503 26.976C88.0783 26.976 88.2223 26.9707 88.3823 26.96C88.5423 26.9493 88.6703 26.9333 88.7663 26.912V27.968C88.6489 28.0107 88.4889 28.0427 88.2863 28.064C88.0943 28.0853 87.9023 28.096 87.7103 28.096ZM96.4481 28L93.7761 20.48H95.1681L97.0881 26.368L99.0881 20.48H100.336L102.32 26.368L104.256 20.48H105.648L102.976 28H101.712L99.7121 22.112L97.7121 28H96.4481ZM107.373 28V20.48H108.669V28H107.373ZM108.013 18.816C107.779 18.816 107.587 18.7467 107.437 18.608C107.288 18.4587 107.213 18.272 107.213 18.048C107.213 17.824 107.288 17.6427 107.437 17.504C107.587 17.3653 107.779 17.296 108.013 17.296C108.259 17.296 108.456 17.3653 108.605 17.504C108.755 17.6427 108.829 17.824 108.829 18.048C108.829 18.272 108.755 18.4587 108.605 18.608C108.456 18.7467 108.259 18.816 108.013 18.816ZM111.202 28V17.312H112.498V28H111.202ZM115.03 28V17.312H116.326V28H115.03ZM124.62 28L121.948 20.48H123.34L125.26 26.368L127.26 20.48H128.508L130.492 26.368L132.428 20.48H133.82L131.148 28H129.884L127.884 22.112L125.884 28H124.62ZM135.545 28V20.48H136.841V28H135.545ZM136.185 18.816C135.951 18.816 135.759 18.7467 135.609 18.608C135.46 18.4587 135.385 18.272 135.385 18.048C135.385 17.824 135.46 17.6427 135.609 17.504C135.759 17.3653 135.951 17.296 136.185 17.296C136.431 17.296 136.628 17.3653 136.777 17.504C136.927 17.6427 137.001 17.824 137.001 18.048C137.001 18.272 136.927 18.4587 136.777 18.608C136.628 18.7467 136.431 18.816 136.185 18.816ZM139.373 28V17.312H140.669V28H139.373ZM143.202 28V17.312H144.498V28H143.202ZM150.936 28V20.48H152.184V21.856C152.376 21.376 152.659 21.0133 153.032 20.768C153.416 20.512 153.848 20.384 154.328 20.384C154.477 20.384 154.611 20.3947 154.728 20.416C154.856 20.4267 154.957 20.448 155.032 20.48V21.696C154.893 21.664 154.755 21.6427 154.616 21.632C154.477 21.6107 154.339 21.6 154.2 21.6C153.635 21.6 153.165 21.8453 152.792 22.336C152.419 22.816 152.232 23.4933 152.232 24.368V28H150.936ZM159.799 28.16C159.053 28.16 158.381 28.0053 157.783 27.696C157.186 27.3867 156.717 26.944 156.375 26.368C156.034 25.7813 155.863 25.072 155.863 24.24C155.863 23.44 156.029 22.7467 156.359 22.16C156.69 21.5733 157.138 21.12 157.703 20.8C158.269 20.48 158.898 20.32 159.591 20.32C160.327 20.32 160.962 20.464 161.495 20.752C162.029 21.04 162.439 21.4293 162.727 21.92C163.015 22.4 163.159 22.9493 163.159 23.568C163.159 23.7387 163.133 23.9307 163.079 24.144C163.037 24.3467 162.978 24.512 162.903 24.64H157.191C157.245 25.152 157.383 25.5893 157.607 25.952C157.842 26.304 158.157 26.5707 158.551 26.752C158.946 26.9333 159.399 27.024 159.911 27.024C160.413 27.024 160.85 26.9493 161.223 26.8C161.607 26.64 161.975 26.416 162.327 26.128L162.839 27.104C162.434 27.456 161.975 27.7227 161.463 27.904C160.951 28.0747 160.397 28.16 159.799 28.16ZM157.191 23.552H161.815C161.826 23.5307 161.831 23.5093 161.831 23.488C161.831 23.4667 161.831 23.4347 161.831 23.392C161.831 23.008 161.751 22.672 161.591 22.384C161.431 22.0853 161.186 21.856 160.855 21.696C160.535 21.536 160.13 21.456 159.639 21.456C159.255 21.456 158.893 21.5413 158.551 21.712C158.21 21.872 157.922 22.1067 157.687 22.416C157.453 22.7253 157.287 23.104 157.191 23.552ZM168.704 28.16C167.947 28.16 167.275 28 166.688 27.68C166.102 27.3493 165.643 26.8907 165.312 26.304C164.982 25.7173 164.816 25.0293 164.816 24.24C164.816 23.4507 164.982 22.7627 165.312 22.176C165.643 21.5893 166.102 21.136 166.688 20.816C167.275 20.4853 167.947 20.32 168.704 20.32C169.248 20.32 169.739 20.4 170.176 20.56C170.624 20.72 171.019 20.9493 171.36 21.248L170.864 22.224C170.523 21.9573 170.166 21.7653 169.792 21.648C169.419 21.52 169.056 21.456 168.704 21.456C168.192 21.456 167.744 21.568 167.36 21.792C166.976 22.016 166.678 22.336 166.464 22.752C166.251 23.168 166.144 23.664 166.144 24.24C166.144 24.816 166.251 25.312 166.464 25.728C166.678 26.144 166.976 26.464 167.36 26.688C167.744 26.912 168.192 27.024 168.704 27.024C169.056 27.024 169.419 26.9653 169.792 26.848C170.166 26.72 170.523 26.5227 170.864 26.256L171.36 27.232C171.019 27.5307 170.624 27.76 170.176 27.92C169.739 28.08 169.248 28.16 168.704 28.16ZM176.829 28.16C176.072 28.16 175.4 28 174.813 27.68C174.227 27.3493 173.768 26.8907 173.437 26.304C173.107 25.7173 172.941 25.0293 172.941 24.24C172.941 23.4507 173.107 22.7627 173.437 22.176C173.768 21.5893 174.227 21.136 174.813 20.816C175.4 20.4853 176.072 20.32 176.829 20.32C177.597 20.32 178.269 20.4853 178.845 20.816C179.432 21.136 179.891 21.5893 180.221 22.176C180.552 22.7627 180.717 23.4507 180.717 24.24C180.717 25.0293 180.552 25.7173 180.221 26.304C179.891 26.8907 179.432 27.3493 178.845 27.68C178.269 28 177.597 28.16 176.829 28.16ZM176.829 27.024C177.341 27.024 177.789 26.912 178.173 26.688C178.557 26.464 178.856 26.144 179.069 25.728C179.283 25.312 179.389 24.816 179.389 24.24C179.389 23.664 179.283 23.168 179.069 22.752C178.856 22.336 178.557 22.016 178.173 21.792C177.789 21.568 177.341 21.456 176.829 21.456C176.317 21.456 175.869 21.568 175.485 21.792C175.101 22.016 174.803 22.336 174.589 22.752C174.376 23.168 174.269 23.664 174.269 24.24C174.269 24.816 174.376 25.312 174.589 25.728C174.803 26.144 175.101 26.464 175.485 26.688C175.869 26.912 176.317 27.024 176.829 27.024ZM182.811 28V20.48H184.059V21.856C184.251 21.376 184.534 21.0133 184.907 20.768C185.291 20.512 185.723 20.384 186.203 20.384C186.352 20.384 186.486 20.3947 186.603 20.416C186.731 20.4267 186.832 20.448 186.907 20.48V21.696C186.768 21.664 186.63 21.6427 186.491 21.632C186.352 21.6107 186.214 21.6 186.075 21.6C185.51 21.6 185.04 21.8453 184.667 22.336C184.294 22.816 184.107 23.4933 184.107 24.368V28H182.811ZM191.354 28.16C190.661 28.16 190.042 28 189.498 27.68C188.954 27.36 188.528 26.9067 188.218 26.32C187.909 25.7333 187.754 25.04 187.754 24.24C187.754 23.4293 187.909 22.736 188.218 22.16C188.528 21.5733 188.954 21.12 189.498 20.8C190.042 20.48 190.661 20.32 191.354 20.32C191.973 20.32 192.517 20.4427 192.986 20.688C193.456 20.9333 193.813 21.2587 194.058 21.664V17.312H195.354V28H194.106V26.736C193.872 27.1627 193.514 27.5093 193.034 27.776C192.554 28.032 191.994 28.16 191.354 28.16ZM191.594 27.024C192.085 27.024 192.517 26.912 192.89 26.688C193.274 26.464 193.573 26.144 193.786 25.728C194 25.312 194.106 24.816 194.106 24.24C194.106 23.664 194 23.168 193.786 22.752C193.573 22.336 193.274 22.016 192.89 21.792C192.517 21.568 192.085 21.456 191.594 21.456C191.104 21.456 190.666 21.568 190.282 21.792C189.909 22.016 189.616 22.336 189.402 22.752C189.189 23.168 189.082 23.664 189.082 24.24C189.082 24.816 189.189 25.312 189.402 25.728C189.616 26.144 189.909 26.464 190.282 26.688C190.666 26.912 191.104 27.024 191.594 27.024ZM202.291 31.008C201.982 31.008 201.673 30.9653 201.363 30.88C201.065 30.8053 200.798 30.6987 200.563 30.56L200.947 29.536C201.182 29.6533 201.406 29.7387 201.619 29.792C201.833 29.856 202.03 29.888 202.211 29.888C202.446 29.888 202.67 29.8293 202.883 29.712C203.097 29.6053 203.305 29.424 203.507 29.168C203.71 28.9227 203.913 28.592 204.115 28.176L200.979 20.48H202.371L204.755 26.64L207.139 20.48H208.531L205.459 28C205.139 28.7893 204.809 29.4027 204.467 29.84C204.126 30.2773 203.774 30.5813 203.411 30.752C203.049 30.9227 202.675 31.008 202.291 31.008ZM213.064 28.16C212.306 28.16 211.634 28 211.048 27.68C210.461 27.3493 210.002 26.8907 209.672 26.304C209.341 25.7173 209.176 25.0293 209.176 24.24C209.176 23.4507 209.341 22.7627 209.672 22.176C210.002 21.5893 210.461 21.136 211.048 20.816C211.634 20.4853 212.306 20.32 213.064 20.32C213.832 20.32 214.504 20.4853 215.08 20.816C215.666 21.136 216.125 21.5893 216.456 22.176C216.786 22.7627 216.952 23.4507 216.952 24.24C216.952 25.0293 216.786 25.7173 216.456 26.304C216.125 26.8907 215.666 27.3493 215.08 27.68C214.504 28 213.832 28.16 213.064 28.16ZM213.064 27.024C213.576 27.024 214.024 26.912 214.408 26.688C214.792 26.464 215.09 26.144 215.304 25.728C215.517 25.312 215.624 24.816 215.624 24.24C215.624 23.664 215.517 23.168 215.304 22.752C215.09 22.336 214.792 22.016 214.408 21.792C214.024 21.568 213.576 21.456 213.064 21.456C212.552 21.456 212.104 21.568 211.72 21.792C211.336 22.016 211.037 22.336 210.824 22.752C210.61 23.168 210.504 23.664 210.504 24.24C210.504 24.816 210.61 25.312 210.824 25.728C211.037 26.144 211.336 26.464 211.72 26.688C212.104 26.912 212.552 27.024 213.064 27.024ZM221.813 28.16C220.949 28.16 220.272 27.9147 219.781 27.424C219.291 26.9333 219.045 26.16 219.045 25.104V20.48H220.341V24.96C220.341 25.6853 220.485 26.2133 220.773 26.544C221.072 26.864 221.525 27.024 222.133 27.024C222.837 27.024 223.381 26.784 223.765 26.304C224.149 25.8133 224.341 25.152 224.341 24.32V20.48H225.637V28H224.389V26.816C224.165 27.232 223.835 27.5627 223.397 27.808C222.96 28.0427 222.432 28.16 221.813 28.16ZM228.17 28V20.48H229.418V21.856C229.61 21.376 229.893 21.0133 230.266 20.768C230.65 20.512 231.082 20.384 231.562 20.384C231.712 20.384 231.845 20.3947 231.962 20.416C232.09 20.4267 232.192 20.448 232.266 20.48V21.696C232.128 21.664 231.989 21.6427 231.85 21.632C231.712 21.6107 231.573 21.6 231.434 21.6C230.869 21.6 230.4 21.8453 230.026 22.336C229.653 22.816 229.466 23.4933 229.466 24.368V28H228.17ZM237.967 28V20.48H239.263V28H237.967ZM238.607 18.816C238.372 18.816 238.18 18.7467 238.031 18.608C237.882 18.4587 237.807 18.272 237.807 18.048C237.807 17.824 237.882 17.6427 238.031 17.504C238.18 17.3653 238.372 17.296 238.607 17.296C238.852 17.296 239.05 17.3653 239.199 17.504C239.348 17.6427 239.423 17.824 239.423 18.048C239.423 18.272 239.348 18.4587 239.199 18.608C239.05 18.7467 238.852 18.816 238.607 18.816ZM241.795 28V20.48H243.043V21.664C243.267 21.248 243.598 20.9227 244.035 20.688C244.473 20.4427 245.001 20.32 245.619 20.32C246.483 20.32 247.161 20.5653 247.651 21.056C248.142 21.5467 248.387 22.32 248.387 23.376V28H247.091V23.52C247.091 22.7947 246.942 22.272 246.643 21.952C246.355 21.6213 245.907 21.456 245.299 21.456C244.595 21.456 244.051 21.7013 243.667 22.192C243.283 22.672 243.091 23.328 243.091 24.16V28H241.795ZM250.92 30.912V20.48H252.168V21.744C252.403 21.3173 252.76 20.976 253.24 20.72C253.72 20.4533 254.28 20.32 254.92 20.32C255.614 20.32 256.232 20.48 256.776 20.8C257.32 21.12 257.747 21.5733 258.056 22.16C258.366 22.736 258.52 23.4293 258.52 24.24C258.52 25.04 258.366 25.7333 258.056 26.32C257.747 26.9067 257.32 27.36 256.776 27.68C256.232 28 255.614 28.16 254.92 28.16C254.302 28.16 253.758 28.0373 253.288 27.792C252.819 27.5467 252.462 27.2213 252.216 26.816V30.912H250.92ZM254.68 27.024C255.171 27.024 255.603 26.912 255.976 26.688C256.36 26.464 256.659 26.144 256.872 25.728C257.086 25.312 257.192 24.816 257.192 24.24C257.192 23.664 257.086 23.168 256.872 22.752C256.659 22.336 256.36 22.016 255.976 21.792C255.603 21.568 255.171 21.456 254.68 21.456C254.19 21.456 253.752 21.568 253.368 21.792C252.995 22.016 252.702 22.336 252.488 22.752C252.275 23.168 252.168 23.664 252.168 24.24C252.168 24.816 252.275 25.312 252.488 25.728C252.702 26.144 252.995 26.464 253.368 26.688C253.752 26.912 254.19 27.024 254.68 27.024ZM263.407 28.16C262.543 28.16 261.866 27.9147 261.375 27.424C260.884 26.9333 260.639 26.16 260.639 25.104V20.48H261.935V24.96C261.935 25.6853 262.079 26.2133 262.367 26.544C262.666 26.864 263.119 27.024 263.727 27.024C264.431 27.024 264.975 26.784 265.359 26.304C265.743 25.8133 265.935 25.152 265.935 24.32V20.48H267.231V28H265.983V26.816C265.759 27.232 265.428 27.5627 264.991 27.808C264.554 28.0427 264.026 28.16 263.407 28.16ZM272.804 28.096C272.057 28.096 271.497 27.92 271.124 27.568C270.761 27.2053 270.58 26.6453 270.58 25.888V21.6H268.9V20.48H270.58V18.336H271.876V20.48H273.86V21.6H271.876V25.792C271.876 26.1867 271.972 26.4853 272.164 26.688C272.356 26.88 272.649 26.976 273.044 26.976C273.172 26.976 273.316 26.9707 273.476 26.96C273.636 26.9493 273.764 26.9333 273.86 26.912V27.968C273.743 28.0107 273.583 28.0427 273.38 28.064C273.188 28.0853 272.996 28.096 272.804 28.096ZM41.0722 47V40.6H39.3922V39.48H41.0722V38.424C41.0722 37.6667 41.2535 37.112 41.6162 36.76C41.9895 36.3973 42.5495 36.216 43.2962 36.216C43.4882 36.216 43.6802 36.2267 43.8722 36.248C44.0749 36.2693 44.2349 36.3013 44.3522 36.344V37.4C44.2562 37.3787 44.1282 37.3627 43.9682 37.352C43.8082 37.3413 43.6642 37.336 43.5362 37.336C43.1415 37.336 42.8482 37.4373 42.6562 37.64C42.4642 37.832 42.3682 38.1253 42.3682 38.52V39.48H44.3522V40.6H42.3682V47H41.0722ZM49.4778 47.16C48.7205 47.16 48.0485 47 47.4618 46.68C46.8751 46.3493 46.4165 45.8907 46.0858 45.304C45.7551 44.7173 45.5898 44.0293 45.5898 43.24C45.5898 42.4507 45.7551 41.7627 46.0858 41.176C46.4165 40.5893 46.8751 40.136 47.4618 39.816C48.0485 39.4853 48.7205 39.32 49.4778 39.32C50.2458 39.32 50.9178 39.4853 51.4938 39.816C52.0805 40.136 52.5391 40.5893 52.8698 41.176C53.2005 41.7627 53.3658 42.4507 53.3658 43.24C53.3658 44.0293 53.2005 44.7173 52.8698 45.304C52.5391 45.8907 52.0805 46.3493 51.4938 46.68C50.9178 47 50.2458 47.16 49.4778 47.16ZM49.4778 46.024C49.9898 46.024 50.4378 45.912 50.8218 45.688C51.2058 45.464 51.5045 45.144 51.7178 44.728C51.9311 44.312 52.0378 43.816 52.0378 43.24C52.0378 42.664 51.9311 42.168 51.7178 41.752C51.5045 41.336 51.2058 41.016 50.8218 40.792C50.4378 40.568 49.9898 40.456 49.4778 40.456C48.9658 40.456 48.5178 40.568 48.1338 40.792C47.7498 41.016 47.4511 41.336 47.2378 41.752C47.0245 42.168 46.9178 42.664 46.9178 43.24C46.9178 43.816 47.0245 44.312 47.2378 44.728C47.4511 45.144 47.7498 45.464 48.1338 45.688C48.5178 45.912 48.9658 46.024 49.4778 46.024ZM55.4593 47V39.48H56.7073V40.856C56.8993 40.376 57.182 40.0133 57.5553 39.768C57.9393 39.512 58.3713 39.384 58.8513 39.384C59.0006 39.384 59.134 39.3947 59.2513 39.416C59.3793 39.4267 59.4806 39.448 59.5553 39.48V40.696C59.4166 40.664 59.278 40.6427 59.1393 40.632C59.0006 40.6107 58.862 40.6 58.7233 40.6C58.158 40.6 57.6886 40.8453 57.3153 41.336C56.942 41.816 56.7553 42.4933 56.7553 43.368V47H55.4593ZM71.1442 49.912V45.816C70.8989 46.2213 70.5415 46.5467 70.0722 46.792C69.6029 47.0373 69.0589 47.16 68.4402 47.16C67.7469 47.16 67.1282 47 66.5842 46.68C66.0402 46.36 65.6135 45.9067 65.3042 45.32C64.9949 44.7333 64.8402 44.04 64.8402 43.24C64.8402 42.4293 64.9949 41.736 65.3042 41.16C65.6135 40.5733 66.0402 40.12 66.5842 39.8C67.1282 39.48 67.7469 39.32 68.4402 39.32C69.0802 39.32 69.6402 39.4533 70.1202 39.72C70.6002 39.976 70.9575 40.3173 71.1922 40.744V39.48H72.4402V49.912H71.1442ZM68.6802 46.024C69.1709 46.024 69.6029 45.912 69.9762 45.688C70.3602 45.464 70.6589 45.144 70.8722 44.728C71.0855 44.312 71.1922 43.816 71.1922 43.24C71.1922 42.664 71.0855 42.168 70.8722 41.752C70.6589 41.336 70.3602 41.016 69.9762 40.792C69.6029 40.568 69.1709 40.456 68.6802 40.456C68.1895 40.456 67.7522 40.568 67.3682 40.792C66.9949 41.016 66.7015 41.336 66.4882 41.752C66.2749 42.168 66.1682 42.664 66.1682 43.24C66.1682 43.816 66.2749 44.312 66.4882 44.728C66.7015 45.144 66.9949 45.464 67.3682 45.688C67.7522 45.912 68.1895 46.024 68.6802 46.024ZM77.7429 47.16C76.8789 47.16 76.2016 46.9147 75.7109 46.424C75.2203 45.9333 74.9749 45.16 74.9749 44.104V39.48H76.2709V43.96C76.2709 44.6853 76.4149 45.2133 76.7029 45.544C77.0016 45.864 77.4549 46.024 78.0629 46.024C78.7669 46.024 79.3109 45.784 79.6949 45.304C80.0789 44.8133 80.2709 44.152 80.2709 43.32V39.48H81.5669V47H80.3189V45.816C80.0949 46.232 79.7643 46.5627 79.3269 46.808C78.8896 47.0427 78.3616 47.16 77.7429 47.16ZM84.0999 47V39.48H85.3959V47H84.0999ZM84.7399 37.816C84.5053 37.816 84.3133 37.7467 84.1639 37.608C84.0146 37.4587 83.9399 37.272 83.9399 37.048C83.9399 36.824 84.0146 36.6427 84.1639 36.504C84.3133 36.3653 84.5053 36.296 84.7399 36.296C84.9853 36.296 85.1826 36.3653 85.3319 36.504C85.4813 36.6427 85.5559 36.824 85.5559 37.048C85.5559 37.272 85.4813 37.4587 85.3319 37.608C85.1826 37.7467 84.9853 37.816 84.7399 37.816ZM91.3841 47.16C90.6267 47.16 89.9547 47 89.3681 46.68C88.7814 46.3493 88.3227 45.8907 87.9921 45.304C87.6614 44.7173 87.4961 44.0293 87.4961 43.24C87.4961 42.4507 87.6614 41.7627 87.9921 41.176C88.3227 40.5893 88.7814 40.136 89.3681 39.816C89.9547 39.4853 90.6267 39.32 91.3841 39.32C91.9281 39.32 92.4187 39.4 92.8561 39.56C93.3041 39.72 93.6987 39.9493 94.0401 40.248L93.5441 41.224C93.2027 40.9573 92.8454 40.7653 92.4721 40.648C92.0987 40.52 91.7361 40.456 91.3841 40.456C90.8721 40.456 90.4241 40.568 90.0401 40.792C89.6561 41.016 89.3574 41.336 89.1441 41.752C88.9307 42.168 88.8241 42.664 88.8241 43.24C88.8241 43.816 88.9307 44.312 89.1441 44.728C89.3574 45.144 89.6561 45.464 90.0401 45.688C90.4241 45.912 90.8721 46.024 91.3841 46.024C91.7361 46.024 92.0987 45.9653 92.4721 45.848C92.8454 45.72 93.2027 45.5227 93.5441 45.256L94.0401 46.232C93.6987 46.5307 93.3041 46.76 92.8561 46.92C92.4187 47.08 91.9281 47.16 91.3841 47.16ZM96.0531 47V36.312H97.3491V43.192L101.141 39.48H102.741L99.5411 42.568L102.901 47H101.301L98.6291 43.448L97.3491 44.68V47H96.0531ZM111.978 47.16C111.22 47.16 110.548 47 109.962 46.68C109.375 46.3493 108.916 45.8907 108.586 45.304C108.255 44.7173 108.09 44.0293 108.09 43.24C108.09 42.4507 108.255 41.7627 108.586 41.176C108.916 40.5893 109.375 40.136 109.962 39.816C110.548 39.4853 111.22 39.32 111.978 39.32C112.746 39.32 113.418 39.4853 113.994 39.816C114.58 40.136 115.039 40.5893 115.37 41.176C115.7 41.7627 115.866 42.4507 115.866 43.24C115.866 44.0293 115.7 44.7173 115.37 45.304C115.039 45.8907 114.58 46.3493 113.994 46.68C113.418 47 112.746 47.16 111.978 47.16ZM111.978 46.024C112.49 46.024 112.938 45.912 113.322 45.688C113.706 45.464 114.004 45.144 114.218 44.728C114.431 44.312 114.538 43.816 114.538 43.24C114.538 42.664 114.431 42.168 114.218 41.752C114.004 41.336 113.706 41.016 113.322 40.792C112.938 40.568 112.49 40.456 111.978 40.456C111.466 40.456 111.018 40.568 110.634 40.792C110.25 41.016 109.951 41.336 109.738 41.752C109.524 42.168 109.418 42.664 109.418 43.24C109.418 43.816 109.524 44.312 109.738 44.728C109.951 45.144 110.25 45.464 110.634 45.688C111.018 45.912 111.466 46.024 111.978 46.024ZM117.959 49.912V39.48H119.207V40.744C119.442 40.3173 119.799 39.976 120.279 39.72C120.759 39.4533 121.319 39.32 121.959 39.32C122.653 39.32 123.271 39.48 123.815 39.8C124.359 40.12 124.786 40.5733 125.095 41.16C125.405 41.736 125.559 42.4293 125.559 43.24C125.559 44.04 125.405 44.7333 125.095 45.32C124.786 45.9067 124.359 46.36 123.815 46.68C123.271 47 122.653 47.16 121.959 47.16C121.341 47.16 120.797 47.0373 120.327 46.792C119.858 46.5467 119.501 46.2213 119.255 45.816V49.912H117.959ZM121.719 46.024C122.21 46.024 122.642 45.912 123.015 45.688C123.399 45.464 123.698 45.144 123.911 44.728C124.125 44.312 124.231 43.816 124.231 43.24C124.231 42.664 124.125 42.168 123.911 41.752C123.698 41.336 123.399 41.016 123.015 40.792C122.642 40.568 122.21 40.456 121.719 40.456C121.229 40.456 120.791 40.568 120.407 40.792C120.034 41.016 119.741 41.336 119.527 41.752C119.314 42.168 119.207 42.664 119.207 43.24C119.207 43.816 119.314 44.312 119.527 44.728C119.741 45.144 120.034 45.464 120.407 45.688C120.791 45.912 121.229 46.024 121.719 46.024ZM131.182 47.16C130.435 47.16 129.763 47.0053 129.166 46.696C128.569 46.3867 128.099 45.944 127.758 45.368C127.417 44.7813 127.246 44.072 127.246 43.24C127.246 42.44 127.411 41.7467 127.742 41.16C128.073 40.5733 128.521 40.12 129.086 39.8C129.651 39.48 130.281 39.32 130.974 39.32C131.71 39.32 132.345 39.464 132.878 39.752C133.411 40.04 133.822 40.4293 134.11 40.92C134.398 41.4 134.542 41.9493 134.542 42.568C134.542 42.7387 134.515 42.9307 134.462 43.144C134.419 43.3467 134.361 43.512 134.286 43.64H128.574C128.627 44.152 128.766 44.5893 128.99 44.952C129.225 45.304 129.539 45.5707 129.934 45.752C130.329 45.9333 130.782 46.024 131.294 46.024C131.795 46.024 132.233 45.9493 132.606 45.8C132.99 45.64 133.358 45.416 133.71 45.128L134.222 46.104C133.817 46.456 133.358 46.7227 132.846 46.904C132.334 47.0747 131.779 47.16 131.182 47.16ZM128.574 42.552H133.198C133.209 42.5307 133.214 42.5093 133.214 42.488C133.214 42.4667 133.214 42.4347 133.214 42.392C133.214 42.008 133.134 41.672 132.974 41.384C132.814 41.0853 132.569 40.856 132.238 40.696C131.918 40.536 131.513 40.456 131.022 40.456C130.638 40.456 130.275 40.5413 129.934 40.712C129.593 40.872 129.305 41.1067 129.07 41.416C128.835 41.7253 128.67 42.104 128.574 42.552ZM136.631 47V39.48H137.879V40.856C138.071 40.376 138.354 40.0133 138.727 39.768C139.111 39.512 139.543 39.384 140.023 39.384C140.173 39.384 140.306 39.3947 140.423 39.416C140.551 39.4267 140.653 39.448 140.727 39.48V40.696C140.589 40.664 140.45 40.6427 140.311 40.632C140.173 40.6107 140.034 40.6 139.895 40.6C139.33 40.6 138.861 40.8453 138.487 41.336C138.114 41.816 137.927 42.4933 137.927 43.368V47H136.631ZM144.297 47.16C143.721 47.16 143.219 47.0747 142.793 46.904C142.377 46.7227 142.051 46.4667 141.817 46.136C141.582 45.7947 141.465 45.3893 141.465 44.92C141.465 44.4507 141.582 44.056 141.817 43.736C142.051 43.416 142.382 43.1653 142.809 42.984C143.235 42.792 143.731 42.664 144.297 42.6L147.017 42.264C146.953 41.6453 146.729 41.192 146.345 40.904C145.971 40.6053 145.491 40.456 144.905 40.456C144.542 40.456 144.163 40.536 143.769 40.696C143.374 40.8453 142.963 41.0747 142.537 41.384L142.009 40.392C142.403 40.0613 142.846 39.8 143.337 39.608C143.838 39.416 144.361 39.32 144.905 39.32C146.035 39.32 146.889 39.5813 147.465 40.104C148.041 40.6267 148.329 41.4 148.329 42.424V47H147.081V45.832C146.803 46.28 146.425 46.616 145.945 46.84C145.465 47.0533 144.915 47.16 144.297 47.16ZM144.537 46.024C145.081 46.024 145.539 45.9173 145.913 45.704C146.286 45.48 146.563 45.192 146.745 44.84C146.937 44.4773 147.033 44.0987 147.033 43.704V43.336L144.633 43.64C144.035 43.7147 143.577 43.8427 143.257 44.024C142.947 44.1947 142.793 44.4827 142.793 44.888C142.793 45.2507 142.947 45.5333 143.257 45.736C143.566 45.928 143.993 46.024 144.537 46.024ZM153.14 47.096C152.393 47.096 151.833 46.92 151.46 46.568C151.097 46.2053 150.916 45.6453 150.916 44.888V40.6H149.236V39.48H150.916V37.336H152.212V39.48H154.196V40.6H152.212V44.792C152.212 45.1867 152.308 45.4853 152.5 45.688C152.692 45.88 152.985 45.976 153.38 45.976C153.508 45.976 153.652 45.9707 153.812 45.96C153.972 45.9493 154.1 45.9333 154.196 45.912V46.968C154.079 47.0107 153.919 47.0427 153.716 47.064C153.524 47.0853 153.332 47.096 153.14 47.096ZM156.116 47V39.48H157.412V47H156.116ZM156.756 37.816C156.521 37.816 156.329 37.7467 156.18 37.608C156.03 37.4587 155.956 37.272 155.956 37.048C155.956 36.824 156.03 36.6427 156.18 36.504C156.329 36.3653 156.521 36.296 156.756 36.296C157.001 36.296 157.198 36.3653 157.348 36.504C157.497 36.6427 157.572 36.824 157.572 37.048C157.572 37.272 157.497 37.4587 157.348 37.608C157.198 37.7467 157.001 37.816 156.756 37.816ZM163.4 47.16C162.642 47.16 161.97 47 161.384 46.68C160.797 46.3493 160.338 45.8907 160.008 45.304C159.677 44.7173 159.512 44.0293 159.512 43.24C159.512 42.4507 159.677 41.7627 160.008 41.176C160.338 40.5893 160.797 40.136 161.384 39.816C161.97 39.4853 162.642 39.32 163.4 39.32C164.168 39.32 164.84 39.4853 165.416 39.816C166.002 40.136 166.461 40.5893 166.792 41.176C167.122 41.7627 167.288 42.4507 167.288 43.24C167.288 44.0293 167.122 44.7173 166.792 45.304C166.461 45.8907 166.002 46.3493 165.416 46.68C164.84 47 164.168 47.16 163.4 47.16ZM163.4 46.024C163.912 46.024 164.36 45.912 164.744 45.688C165.128 45.464 165.426 45.144 165.64 44.728C165.853 44.312 165.96 43.816 165.96 43.24C165.96 42.664 165.853 42.168 165.64 41.752C165.426 41.336 165.128 41.016 164.744 40.792C164.36 40.568 163.912 40.456 163.4 40.456C162.888 40.456 162.44 40.568 162.056 40.792C161.672 41.016 161.373 41.336 161.16 41.752C160.946 42.168 160.84 42.664 160.84 43.24C160.84 43.816 160.946 44.312 161.16 44.728C161.373 45.144 161.672 45.464 162.056 45.688C162.44 45.912 162.888 46.024 163.4 46.024ZM169.381 47V39.48H170.629V40.664C170.853 40.248 171.184 39.9227 171.621 39.688C172.059 39.4427 172.587 39.32 173.205 39.32C174.069 39.32 174.747 39.5653 175.237 40.056C175.728 40.5467 175.973 41.32 175.973 42.376V47H174.677V42.52C174.677 41.7947 174.528 41.272 174.229 40.952C173.941 40.6213 173.493 40.456 172.885 40.456C172.181 40.456 171.637 40.7013 171.253 41.192C170.869 41.672 170.677 42.328 170.677 43.16V47H169.381ZM182.412 47V39.48H183.66V40.664C183.884 40.248 184.215 39.9227 184.652 39.688C185.09 39.4427 185.618 39.32 186.236 39.32C187.1 39.32 187.778 39.5653 188.268 40.056C188.759 40.5467 189.004 41.32 189.004 42.376V47H187.708V42.52C187.708 41.7947 187.559 41.272 187.26 40.952C186.972 40.6213 186.524 40.456 185.916 40.456C185.212 40.456 184.668 40.7013 184.284 41.192C183.9 41.672 183.708 42.328 183.708 43.16V47H182.412ZM195.041 47.16C194.295 47.16 193.623 47.0053 193.025 46.696C192.428 46.3867 191.959 45.944 191.617 45.368C191.276 44.7813 191.105 44.072 191.105 43.24C191.105 42.44 191.271 41.7467 191.601 41.16C191.932 40.5733 192.38 40.12 192.945 39.8C193.511 39.48 194.14 39.32 194.833 39.32C195.569 39.32 196.204 39.464 196.737 39.752C197.271 40.04 197.681 40.4293 197.969 40.92C198.257 41.4 198.401 41.9493 198.401 42.568C198.401 42.7387 198.375 42.9307 198.321 43.144C198.279 43.3467 198.22 43.512 198.145 43.64H192.433C192.487 44.152 192.625 44.5893 192.849 44.952C193.084 45.304 193.399 45.5707 193.793 45.752C194.188 45.9333 194.641 46.024 195.153 46.024C195.655 46.024 196.092 45.9493 196.465 45.8C196.849 45.64 197.217 45.416 197.569 45.128L198.081 46.104C197.676 46.456 197.217 46.7227 196.705 46.904C196.193 47.0747 195.639 47.16 195.041 47.16ZM192.433 42.552H197.057C197.068 42.5307 197.073 42.5093 197.073 42.488C197.073 42.4667 197.073 42.4347 197.073 42.392C197.073 42.008 196.993 41.672 196.833 41.384C196.673 41.0853 196.428 40.856 196.097 40.696C195.777 40.536 195.372 40.456 194.881 40.456C194.497 40.456 194.135 40.5413 193.793 40.712C193.452 40.872 193.164 41.1067 192.929 41.416C192.695 41.7253 192.529 42.104 192.433 42.552ZM198.706 47L201.65 43.112L198.866 39.48H200.386L202.482 42.296L204.578 39.48H206.098L203.314 43.112L206.258 47H204.738L202.482 44.008L200.226 47H198.706ZM211.031 47.096C210.284 47.096 209.724 46.92 209.351 46.568C208.988 46.2053 208.807 45.6453 208.807 44.888V40.6H207.127V39.48H208.807V37.336H210.103V39.48H212.087V40.6H210.103V44.792C210.103 45.1867 210.199 45.4853 210.391 45.688C210.583 45.88 210.876 45.976 211.271 45.976C211.399 45.976 211.543 45.9707 211.703 45.96C211.863 45.9493 211.991 45.9333 212.087 45.912V46.968C211.969 47.0107 211.809 47.0427 211.607 47.064C211.415 47.0853 211.223 47.096 211.031 47.096ZM220.952 47.096C220.206 47.096 219.646 46.92 219.272 46.568C218.91 46.2053 218.728 45.6453 218.728 44.888V40.6H217.048V39.48H218.728V37.336H220.024V39.48H222.008V40.6H220.024V44.792C220.024 45.1867 220.12 45.4853 220.312 45.688C220.504 45.88 220.798 45.976 221.192 45.976C221.32 45.976 221.464 45.9707 221.624 45.96C221.784 45.9493 221.912 45.9333 222.008 45.912V46.968C221.891 47.0107 221.731 47.0427 221.528 47.064C221.336 47.0853 221.144 47.096 220.952 47.096ZM223.928 47V39.48H225.224V47H223.928ZM224.568 37.816C224.333 37.816 224.141 37.7467 223.992 37.608C223.843 37.4587 223.768 37.272 223.768 37.048C223.768 36.824 223.843 36.6427 223.992 36.504C224.141 36.3653 224.333 36.296 224.568 36.296C224.813 36.296 225.011 36.3653 225.16 36.504C225.309 36.6427 225.384 36.824 225.384 37.048C225.384 37.272 225.309 37.4587 225.16 37.608C225.011 37.7467 224.813 37.816 224.568 37.816ZM227.756 47V39.48H229.004V40.536C229.218 40.152 229.511 39.8533 229.884 39.64C230.268 39.4267 230.732 39.32 231.276 39.32C231.831 39.32 232.3 39.4427 232.684 39.688C233.068 39.9227 233.351 40.2533 233.532 40.68C233.767 40.232 234.103 39.896 234.54 39.672C234.988 39.4373 235.5 39.32 236.076 39.32C236.908 39.32 237.57 39.5653 238.06 40.056C238.551 40.5467 238.796 41.32 238.796 42.376V47H237.5V42.52C237.5 41.7947 237.356 41.272 237.068 40.952C236.78 40.6213 236.364 40.456 235.82 40.456C235.202 40.456 234.727 40.7013 234.396 41.192C234.076 41.672 233.916 42.328 233.916 43.16V47H232.62V42.52C232.62 41.7947 232.476 41.272 232.188 40.952C231.9 40.6213 231.49 40.456 230.956 40.456C230.327 40.456 229.852 40.7013 229.532 41.192C229.212 41.672 229.052 42.328 229.052 43.16V47H227.756ZM244.823 47.16C244.076 47.16 243.404 47.0053 242.807 46.696C242.209 46.3867 241.74 45.944 241.399 45.368C241.057 44.7813 240.887 44.072 240.887 43.24C240.887 42.44 241.052 41.7467 241.383 41.16C241.713 40.5733 242.161 40.12 242.727 39.8C243.292 39.48 243.921 39.32 244.615 39.32C245.351 39.32 245.985 39.464 246.519 39.752C247.052 40.04 247.463 40.4293 247.751 40.92C248.039 41.4 248.183 41.9493 248.183 42.568C248.183 42.7387 248.156 42.9307 248.103 43.144C248.06 43.3467 248.001 43.512 247.927 43.64H242.215C242.268 44.152 242.407 44.5893 242.631 44.952C242.865 45.304 243.18 45.5707 243.575 45.752C243.969 45.9333 244.423 46.024 244.935 46.024C245.436 46.024 245.873 45.9493 246.247 45.8C246.631 45.64 246.999 45.416 247.351 45.128L247.863 46.104C247.457 46.456 246.999 46.7227 246.487 46.904C245.975 47.0747 245.42 47.16 244.823 47.16ZM242.215 42.552H246.839C246.849 42.5307 246.855 42.5093 246.855 42.488C246.855 42.4667 246.855 42.4347 246.855 42.392C246.855 42.008 246.775 41.672 246.615 41.384C246.455 41.0853 246.209 40.856 245.879 40.696C245.559 40.536 245.153 40.456 244.663 40.456C244.279 40.456 243.916 40.5413 243.575 40.712C243.233 40.872 242.945 41.1067 242.711 41.416C242.476 41.7253 242.311 42.104 242.215 42.552Z"
      fill="#ECF48D"
    />
    <path
      d="M189.194 68.0646C191.773 72.9707 189.74 82.6958 186.026 82.8687C181.384 83.0848 181.234 77.0049 184.207 76.6736C187.181 76.3423 191.148 81.5455 185.185 86.801C180.415 91.0054 175.51 92.0686 173.655 92.0746M173.655 92.0746L176.032 87.7453M173.655 92.0746L178.496 94.3201"
      stroke="url(#paint1_linear_433_2)"
      stroke-linecap="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_433_2"
        x1="144.5"
        y1="1"
        x2="144.5"
        y2="66"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#EEF3BC" />
        <stop offset="1" stop-color="#EAF45A" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_433_2"
        x1="180.578"
        y1="94.7656"
        x2="186.023"
        y2="69.3211"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#EEF3BC" />
        <stop offset="1" stop-color="#EAF45A" />
      </linearGradient>
    </defs>
  </svg>
);

const questionSwitch = Storage.get("zkevm-aave-question-switch");
if (questionSwitch !== null) {
  State.init({
    switch: questionSwitch == "on" ? true : false,
  });
}

const onAdd = () => {
  State.update({
    switch: true,
  });
  Storage.set("zkevm-aave-question-switch", "on");
};

const onCancel = () => {
  State.update({
    switch: false,
  });
  Storage.set("zkevm-aave-question-switch", "off");
};
return (
  <Container>
    <Wrap>
      {!state.switch && addToQuestTip}
      Sync to{" "}
      <a className="highlight" href="/warmup">
        zkEVM Warm up [My Quest]
      </a>{" "}
      after transaction
      {!state.switch && (
        <div className="button-dark" onClick={onAdd}>
          <div className="button-dark-circle"></div>
        </div>
      )}
      {state.switch && (
        <div className="button-light" onClick={onCancel}>
          <div className="button-light-circle"></div>
        </div>
      )}
    </Wrap>
  </Container>
);
