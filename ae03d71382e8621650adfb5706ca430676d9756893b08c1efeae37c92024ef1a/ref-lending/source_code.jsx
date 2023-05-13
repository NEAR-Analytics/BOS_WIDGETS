const Container = styled.div`
    width:100%;
    .table th, .table td{
    color: rgb(126, 138, 147);
        font-size: 14px;
        vertical-align: middle;
        border:none;
    }
   .box_tabel{
      border-radius: 12px;
      background: #1A2E33;
      padding:20px;
    }
    .title {
        font-weight: 700;
        font-size: 18px;
        color:#fff;
    }
    .title_top {
      font-weight: 700;
      font-size: 20px;
      color:#fff;
    }
    .mt_16{
      margin-top:16px;
    }
    .tokenIcon{
      width: 26px;
      height: 26px;
      border-radius:100px;
      margin-right:4px;
    }
    .rewardIcon{
      width: 16px;
      height: 16px;
      border-radius:100px;
    }
    .text_grey_color{
      color:#7E8A93;
    }
    .mr_10{
      margin-right:10px;
    }
    .ml_5 {
      margin-left:5px;
    }
    .topArea{
        padding:0 25px 38px 25px;
    }
    .flexContainer{
        display:flex;
        align-items:center;
        margin-top:12px;
    }
    .block{
        display:flex;
        flex-direction:column;
        border-right:2px solid rgba(48, 67, 82, 0.5);
        padding-right:30px;
        margin-right:30px;
    }
    .block .t{
        font-size:14px;
        color:#7E8A93;
    }
    .block .v{
        font-weight: 700;
        font-size: 26px;
        color:#fff;
    }
    .noBorder {
        border:none!important;
    }
    .mt_26{
        margin-top:26px;
    }
    .flex_center{
      display:flex;
      align-items:center;
    }
    .flex-end{
      display:flex;
      align-items:center;
      justify-content:end;
      height:50px;
    }

    .claim_button{
      display:flex;
      align-items:center;
      justify-content:center;
      height:26px;
      background: #00FFD1;
      border-radius: 6px;
      margin-left:16px;
      font-weight: 700;
      font-size: 12px;
      cursor:pointer;
      padding:0 12px 0 12px;
    }
`;
