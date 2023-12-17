const picurl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;
function makeTitleShort(c_title) {
  if (c_title.length > 12) {
    return c_title.slice(0, 12) + "...";
  }
  return c_title;
}
function makeDetailsShort(c_details) {
  if (c_details.length > 100) {
    return c_details.slice(0, 100) + "...";
  }
  return c_details;
}
return (
  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow mr-2 ml-2 mb-2 mt-2 p-3">
    <a className="flex items-center justify-center" href="#">
      <img
        className="rounded-t-lg h-60"
        src={picurl(changeBox.value.picture)}
        alt=""
      />
    </a>

    <div className="flex items-center justify-center mt-6 space-x-3">
      <img
        className="w-6 h-6 rounded-full"
        src={`https://i.near.social/magic/thumbnail/https://near.social/magic/img/account/${changeBox.accountId}`}
        alt="Profile Picture"
      />

      <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500">
        <div className="pe-3 font-medium text-green-900">
          {changeBox.accountId}
        </div>
        <div className="ps-3 text-sm text-green-500">
          {new Date(changeBox.value.postdate).toLocaleDateString(
            [],
            dateFormat
          )}
        </div>
      </div>
    </div>
    <div className="p-3">
      <a href="#">
        <div className="mb-2 text-2xl font-bold tracking-tight text-center text-green-900">
          {makeTitleShort(changeBox.value.title)}
        </div>
      </a>
      <div className="mb-3 font-normal text-center text-green-600">
        {makeDetailsShort(changeBox.value.details)}
      </div>
      <div className="text-center">
        <a
          href="#"
          className="inline-flex text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => {
            State.update({
              theme: styled.div`
                        * {
                        font-family: 'Kanit';
                        }
                        #details_box{
                            display: ;
                        }
                        #create_box,#start_box, #home_box, #my_box, #support_box{
                            display:none;
                        }
                        ${font}
                        ${css}
                        `,
              title_now: changeBox.value.title,
            });
          }}
        >
          ดูเรื่องนี้
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
);
