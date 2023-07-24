
const Container = styled.div`
  .back{
    display:flex;
    align-items:center;
    img{
      margin-right:14px;
      cursor:pointer;
    }
    span{
      color:#979ABE;
      font-size:18px;
      font-weight:500;
      cursor:pointer;
    }
  }
  .pageTitle{
    display:flex;
    align-items:center;
    margin-top:14px;
    img{
      margin-right:14px;
    }
    span{
      font-size:32px;
      color:#fff;
      font-weight:700;
    }
  }
  .recordList{
    border:1px solid #332C4B;
    background-color:#181A27;
    padding-top:12px;
    border-radius:16px;
    margin-top:20px;
    table{
      width:100%;
      tr th {
        color:#91A2AE;
        font-size:14px;
        height:34px;
        border-bottom:1px solid #332C4B;
        .arrow{
          cursor:pointer;
        }
      }
      tr td{
        color:#fff;
        height:42px;
        font-size:14px;
      }
      tr th:nth-child(1), tr td:nth-child(1) {
        padding-left:22px;
      }
      tr th:nth-last-child(1), tr td:nth-last-child(1){
        padding-right:22px;
      }
    }
    .page{
      display:flex;
      justify-content:flex-end;
      align-items:center;
      height:42px;
      border-top:1px solid #332C4B;
      font-size:14px;
      color:#91A2AE;
      gap:6px;
      padding:0 16px;
      .cur_page{
        position:relative;
        top:1px;
        margin:0 10px;
      }
      svg{
        cursor:pointer;
      }
      .disabled{
        opacity:0.3;
        svg{
          cursor:not-allowed;
        }
      }
    }
  }
`
State.init({
  record_list: [],
  current_page_record_list: [],
  current_page: 1,
  number_per_page: 3,
})
function get_my_records_list() {
  asyncFetch("http://139.162.85.48:8100/get-action-by-account?account_id=dom.near").then((res) => {
    const result = JSON.parse(res.body || {}).data || [];

    State.update({
      record_list: result,
      current_page_record_list: get_current_page_record_list(result, current_page)
    })
  });
}
if (state.record_list.length == 0) {
  get_my_records_list();
}
function get_current_page_record_list(record_list, current_page) {
  const total_records = record_list || state.record_list;
  const cur_page = current_page || state.current_page;
  const total_page = Math.ceil(total_records / state.number_per_page);
  return [];

}
function getTime(timestamp) {
  var myDate = new Date(timestamp);
  var year = myDate.getFullYear();
  var month = Number(myDate.getMonth() + 1) + "";
  var date = myDate.getDate() + "";
  var hour = myDate.getHours() < 10 ? "0" + myDate.getHours() : myDate.getHours(); 
  var minute = myDate.getMinutes() < 10 ? "0" + myDate.getMinutes() : myDate.getMinutes(); 
  var second = myDate.getSeconds() < 10 ? "0" + myDate.getSeconds() : myDate.getSeconds();
  var day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[myDate.getDay()];
    if (date.length == 1) {
        date = "0" + date
    }
    if (month.length == 1) {
        month = "0" + month
    }
   return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second + '  ';
}
const template_icons = { // todo
  'ZkEvm': 'https://ipfs.near.social/ipfs/bafkreiftqxncp4pt36z5mcfzizbkccoufksmz2f4zhnproxv4krfb5qmsm',
  'ZkEvm-bridge': 'https://ipfs.near.social/ipfs/bafkreicvtmhen64rruzzkqt7y4prlyt4hbdgbfuzgocss2b55gbewfsery',
  'Ethereum': 'https://ipfs.near.social/ipfs/bafkreiftqxncp4pt36z5mcfzizbkccoufksmz2f4zhnproxv4krfb5qmsm'
}
function click_left_most() {}
function click_left() {}
function click_right() {}
function click_right_most() {}
const left_most_icon = <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<g>
<path d="M2.77733 5.77071C2.35628 6.16574 2.35628 6.83426 2.77733 7.22928L6.31579 10.5491C6.95436 11.1482 8 10.6954 8 9.81976L8 3.18023C8 2.30462 6.95436 1.85185 6.31579 2.45095L2.77733 5.77071Z" fill="#7E8A93"/>
<path d="M1 3V10" stroke="#7E8A93" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>;
const left_icon = <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.777329 3.77071C0.356276 4.16574 0.356276 4.83426 0.777328 5.22928L4.31579 8.54905C4.95436 9.14816 6 8.69538 6 7.81976L6 1.18023C6 0.304619 4.95436 -0.148155 4.31579 0.450951L0.777329 3.77071Z" fill="#7E8A93"/>
</svg>

const right_most_icon = <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.22267 5.77071C7.64372 6.16574 7.64372 6.83426 7.22267 7.22928L3.68421 10.5491C3.04564 11.1482 2 10.6954 2 9.81976L2 3.18023C2 2.30462 3.04564 1.85185 3.68421 2.45095L7.22267 5.77071Z" fill="#7E8A93"/>
<path d="M9 3V10" stroke="#7E8A93" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>;


const right_icon = <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.22267 3.77071C5.64372 4.16574 5.64372 4.83426 5.22267 5.22928L1.68421 8.54905C1.04564 9.14816 -4.6751e-07 8.69538 -4.29236e-07 7.81976L-1.39013e-07 1.18023C-1.00738e-07 0.304619 1.04564 -0.148155 1.68421 0.450951L5.22267 3.77071Z" fill="#7E8A93"/>
</svg>

const arrow_down_icon = <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.70705 5.29289C5.31653 5.68342 4.68336 5.68342 4.29284 5.29289L0.707053 1.70711C0.0770878 1.07714 0.523254 -9.15906e-07 1.41416 -8.38021e-07L8.58573 -2.11062e-07C9.47664 -1.33177e-07 9.9228 1.07714 9.29284 1.70711L5.70705 5.29289Z" fill="#91A2AE"/>
</svg>


return <Container>
 <div className="back">
   <img src="https://ipfs.near.social/ipfs/bafkreig7ezlwthp2u6gsoifpvbsjcepuyvtx33uyjaentqwvcoh64unvd4"></img>
   <span>Back</span>
 </div>
 <div className="pageTitle">
   <img src="https://ipfs.near.social/ipfs/bafkreia7hmyccnbvwwx6abuohry4xbjnmsg2bslip7tdns6jx5xg2vpbde"></img>
   <span className="">My Execute Records</span>
 </div>
 <div className="recordList">
  <table>
     <thead>
       <tr>
         <th>Quest</th>
         {/* 需要接口提供字段 */}
         <th>Action</th>
         <th>Template</th> 
         {/* <th>Status</th> */}
         <th>
           Time <span className="arrow" style={{marginLeft: '5px'}}>{arrow_down_icon}</span>
        </th>
         {/* <th>Tx</th> */}
       </tr>
     </thead>
     <tbody>
      {
        state.record_list.map((record, index) => {
          return  <tr key={index}>
          <td>{record.action_title}</td>
          <td>Swap</td>
          <td>
            <img src={template_icons[record.template]} style={{marginRight: '6px'}}></img>
            {record.template}</td>
          {/* <td>Pending</td> */}
          <td>{getTime(record.timestamp)}</td>
          {/* <td>EsdWX6...mLsG</td> */}
        </tr>
        })
      }
     
     </tbody>
  </table>
  <div className="page">
      <span className="disabled" onClick={click_left_most}>{left_most_icon}</span>
      <span className="disabled" onClick={click_left}>{left_icon}</span>
      <span className="cur_page">1-20 of 32</span>
      <span onClick={click_right}>{right_icon}</span>
      <span onClick={click_right_most}>{right_most_icon}</span>  
  </div>
 </div>
</Container>