const Wrapper = styled.div`
  width: 100%;
  position: relative;
  .input-wrapper {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    gap: 32px;

    .input-search-wrapper {
      position: relative;
      width: 100%;
    }

    .search-wrapper {
      position: absolute;
      right: 12px;
      top: 12px;
    }

    .input-records {
      background: none;
      color: #ebf479;
      border: 1px solid #eef3bc;
      text-align: left;
      outline: none;
      font-size: 20px;
      font-weight: 500;
      line-height: 24px;
      padding: 14px;
      width: 100%;
      border-radius: 16px;
      ::placeholder {
        color: rgba(235, 244, 121, 0.3);
      }
    }

    .input-button {
      width: 169px;
      height: 64px;
      border-radius: 16px;
      background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
      text-align: center;
      color: #02051e;
      flex-shrink: 0;
      cursor: pointer;
      vertical-align: middle;
      padding-top: 20px;
      padding-bottom: 20px;

      font-size: 20px;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: 0em;
      text-align: center;

      :hover {
        text-decoration: none;
      }
    }
  }

  .search-hint-list {
    position: absolute;
    top: 68px;
    z-index: 999;
    width: calc(100% - 200px);
    border-radius: 16px;
    background: #373a53;

    padding: 20px 0px;

    .search-hint-item {
      padding: 20px 32px;
      align-items: center;
      color: white;
      font-size: 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      .highlight {
        color: #ebf479;
      }
      .dex-name {
        display: flex;
        align-items: center;
        gap: 8px;
        line-height: 22px;
        letter-spacing: 0em;
        text-align: left;
        .dex-name-icon {
          width: 26px;
          height: 26px;
          border-radius: 8px;
        }
      }
    }
    .search-hint-item:hover {
      background: rgba(24, 26, 39, 0.3);
    }
  }

  @media (max-width:900px){
    height: 65vh;
    .input-wrapper {
      .input-records{
       border-bottom: 1px solid #e9f456;
       border-top: none;
       border-left: none;
       border-right: none;
       border-radius : 0;
      }
     .input-button{
      width: 162px;
      height: 50px;
      position: fixed;
      bottom: 30px;
      right: 20px;
      line-height: 14px;
      font-size: 16px;
      } 
    }
    .search-hint-list{
      width: 100%;
      overflow: auto;
      height: 55vh;
    }
  }
`;

const iconsMap = {
  "ZkEvm-bridge": (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="26"
        height="26"
        rx="8"
        transform="matrix(1 0 0 -1 0 26)"
        fill="url(#paint0_linear_0_141)"
      />
      <path
        d="M8.47059 8.5V6.82609L7.80227 6.41856C7.48913 6.22761 7.0966 6.2234 6.77944 6.40759L4.4978 7.73264C4.18964 7.91161 4 8.24104 4 8.5974V11.3067C4 11.6443 4.17038 11.9591 4.45305 12.1438L6.77804 13.6628C7.09445 13.8695 7.50037 13.8802 7.8272 13.6904L10.0904 12.3761C10.3986 12.1971 10.5882 11.8677 10.5882 11.5113V6.45334C10.5882 6.09264 10.7825 5.75989 11.0966 5.58255L12.184 4.96859C12.5053 4.78718 12.9004 4.79744 13.2118 4.99527L14.1244 5.57495C14.4133 5.75842 14.5882 6.07686 14.5882 6.41906V7.47225C14.5882 7.81445 14.4133 8.13288 14.1244 8.31636L13.187 8.91181C12.8888 9.10123 12.5127 9.11924 12.1978 8.9592L11.2941 8.5V10.1739L12.221 10.6449C12.5233 10.7985 12.8829 10.7885 13.1762 10.6182L15.5022 9.26736C15.8104 9.08839 16 8.75896 16 8.4026V5.4887C16 5.13234 15.8104 4.80291 15.5022 4.62395L13.1912 3.28185C12.8898 3.10679 12.5189 3.10133 12.2125 3.26744L9.69994 4.62931C9.37738 4.80414 9.17647 5.14157 9.17647 5.50847V10.5809C9.17647 10.9231 9.00149 11.2416 8.71264 11.4251L7.80004 12.0047C7.48859 12.2026 7.0935 12.2128 6.77221 12.0314L5.68481 11.4175C5.37072 11.2401 5.17647 10.9074 5.17647 10.5467V9.56203C5.17647 9.20133 5.37072 8.86859 5.68481 8.69124L6.78299 8.0712C7.09857 7.89302 7.48585 7.89952 7.79527 8.0882L8.47059 8.5Z"
        fill="white"
      />
      <path d="M18 19L14 16.6244L18 10V19Z" fill="white" />
      <path d="M18 23L14 17L18 19.5082V23Z" fill="white" />
      <path d="M18 19L22 16.6244L18 10V19Z" fill="white" />
      <path d="M18 23L22 17L18 19.5082V23Z" fill="white" />
      <path
        d="M7 15C7 19 11.5 21 14 19.6947"
        stroke="white"
        stroke-width="1.5"
      />
      <defs>
        <linearGradient
          id="paint0_linear_0_141"
          x1="13"
          y1="0"
          x2="13"
          y2="26"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#982ECC" />
          <stop offset="1" stop-color="#7C3FE4" />
        </linearGradient>
      </defs>
    </svg>
  ),
  "native bridge": (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="26"
        height="26"
        rx="8"
        transform="matrix(1 0 0 -1 0 26)"
        fill="url(#paint0_linear_0_141)"
      />
      <path
        d="M8.47059 8.5V6.82609L7.80227 6.41856C7.48913 6.22761 7.0966 6.2234 6.77944 6.40759L4.4978 7.73264C4.18964 7.91161 4 8.24104 4 8.5974V11.3067C4 11.6443 4.17038 11.9591 4.45305 12.1438L6.77804 13.6628C7.09445 13.8695 7.50037 13.8802 7.8272 13.6904L10.0904 12.3761C10.3986 12.1971 10.5882 11.8677 10.5882 11.5113V6.45334C10.5882 6.09264 10.7825 5.75989 11.0966 5.58255L12.184 4.96859C12.5053 4.78718 12.9004 4.79744 13.2118 4.99527L14.1244 5.57495C14.4133 5.75842 14.5882 6.07686 14.5882 6.41906V7.47225C14.5882 7.81445 14.4133 8.13288 14.1244 8.31636L13.187 8.91181C12.8888 9.10123 12.5127 9.11924 12.1978 8.9592L11.2941 8.5V10.1739L12.221 10.6449C12.5233 10.7985 12.8829 10.7885 13.1762 10.6182L15.5022 9.26736C15.8104 9.08839 16 8.75896 16 8.4026V5.4887C16 5.13234 15.8104 4.80291 15.5022 4.62395L13.1912 3.28185C12.8898 3.10679 12.5189 3.10133 12.2125 3.26744L9.69994 4.62931C9.37738 4.80414 9.17647 5.14157 9.17647 5.50847V10.5809C9.17647 10.9231 9.00149 11.2416 8.71264 11.4251L7.80004 12.0047C7.48859 12.2026 7.0935 12.2128 6.77221 12.0314L5.68481 11.4175C5.37072 11.2401 5.17647 10.9074 5.17647 10.5467V9.56203C5.17647 9.20133 5.37072 8.86859 5.68481 8.69124L6.78299 8.0712C7.09857 7.89302 7.48585 7.89952 7.79527 8.0882L8.47059 8.5Z"
        fill="white"
      />
      <path d="M18 19L14 16.6244L18 10V19Z" fill="white" />
      <path d="M18 23L14 17L18 19.5082V23Z" fill="white" />
      <path d="M18 19L22 16.6244L18 10V19Z" fill="white" />
      <path d="M18 23L22 17L18 19.5082V23Z" fill="white" />
      <path
        d="M7 15C7 19 11.5 21 14 19.6947"
        stroke="white"
        stroke-width="1.5"
      />
      <defs>
        <linearGradient
          id="paint0_linear_0_141"
          x1="13"
          y1="0"
          x2="13"
          y2="26"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#982ECC" />
          <stop offset="1" stop-color="#7C3FE4" />
        </linearGradient>
      </defs>
    </svg>
  ),
  "zkEVM-bridge": (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="dex-name-icon"
    >
      <rect
        width="26"
        height="26"
        rx="8"
        transform="matrix(1 0 0 -1 0 26)"
        fill="url(#paint0_linear_0_141)"
      />
      <path
        d="M8.47059 8.5V6.82609L7.80227 6.41856C7.48913 6.22761 7.0966 6.2234 6.77944 6.40759L4.4978 7.73264C4.18964 7.91161 4 8.24104 4 8.5974V11.3067C4 11.6443 4.17038 11.9591 4.45305 12.1438L6.77804 13.6628C7.09445 13.8695 7.50037 13.8802 7.8272 13.6904L10.0904 12.3761C10.3986 12.1971 10.5882 11.8677 10.5882 11.5113V6.45334C10.5882 6.09264 10.7825 5.75989 11.0966 5.58255L12.184 4.96859C12.5053 4.78718 12.9004 4.79744 13.2118 4.99527L14.1244 5.57495C14.4133 5.75842 14.5882 6.07686 14.5882 6.41906V7.47225C14.5882 7.81445 14.4133 8.13288 14.1244 8.31636L13.187 8.91181C12.8888 9.10123 12.5127 9.11924 12.1978 8.9592L11.2941 8.5V10.1739L12.221 10.6449C12.5233 10.7985 12.8829 10.7885 13.1762 10.6182L15.5022 9.26736C15.8104 9.08839 16 8.75896 16 8.4026V5.4887C16 5.13234 15.8104 4.80291 15.5022 4.62395L13.1912 3.28185C12.8898 3.10679 12.5189 3.10133 12.2125 3.26744L9.69994 4.62931C9.37738 4.80414 9.17647 5.14157 9.17647 5.50847V10.5809C9.17647 10.9231 9.00149 11.2416 8.71264 11.4251L7.80004 12.0047C7.48859 12.2026 7.0935 12.2128 6.77221 12.0314L5.68481 11.4175C5.37072 11.2401 5.17647 10.9074 5.17647 10.5467V9.56203C5.17647 9.20133 5.37072 8.86859 5.68481 8.69124L6.78299 8.0712C7.09857 7.89302 7.48585 7.89952 7.79527 8.0882L8.47059 8.5Z"
        fill="white"
      />
      <path d="M18 19L14 16.6244L18 10V19Z" fill="white" />
      <path d="M18 23L14 17L18 19.5082V23Z" fill="white" />
      <path d="M18 19L22 16.6244L18 10V19Z" fill="white" />
      <path d="M18 23L22 17L18 19.5082V23Z" fill="white" />
      <path
        d="M7 15C7 19 11.5 21 14 19.6947"
        stroke="white"
        stroke-width="1.5"
      />
      <defs>
        <linearGradient
          id="paint0_linear_0_141"
          x1="13"
          y1="0"
          x2="13"
          y2="26"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#982ECC" />
          <stop offset="1" stop-color="#7C3FE4" />
        </linearGradient>
      </defs>
    </svg>
  ),

  QuickSwap: (
    <img
      className="dex-name-icon"
      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxyZWN0IHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgcng9IjEwIiBmaWxsPSIjMEYxMTI2Ii8+CjxyZWN0IHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgcng9IjEwIiBmaWxsPSJ1cmwoI3BhdHRlcm4wKSIvPgo8ZGVmcz4KPHBhdHRlcm4gaWQ9InBhdHRlcm4wIiBwYXR0ZXJuQ29udGVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgd2lkdGg9IjEiIGhlaWdodD0iMSI+Cjx1c2UgeGxpbms6aHJlZj0iI2ltYWdlMF81MV82MTUiIHRyYW5zZm9ybT0ic2NhbGUoMC4wMzEyNSkiLz4KPC9wYXR0ZXJuPgo8aW1hZ2UgaWQ9ImltYWdlMF81MV82MTUiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFDQUFBQUFnQ0FZQUFBQnplbnIwQUFBSzJtbERRMUJKUTBNZ1VISnZabWxzWlFBQVNJbVZsd2RVRTlrYWdPL01wQmRhQUFFcG9YZWtFMEJLNktFSTBrRlVRaEpJS0NFbUJCVlJVVmxjd2JXZ0lnTHFpcTZLS0xpNkFySVd4SUp0VWJEWERiSUlxT3Rpd1lhYW5jQWo3TzQ3Nzczei9uUHUzTy84ODkrLzNIUHZuSDhBb0lheFJhSmNXQTJBUEdHQk9EWTBnSjZja2tySER3SUlZQUVKbUFLRXpaR0ltREV4a1FDVnlmbnY4dTQyYW8zS0RYdUZyMzkvLzE5Rmc4dVRjQUNBMGxETzRFbzRlU2gzb09NWlJ5UXVBQUE1aU9wTkZ4YUlGSHdkWlUweG1pREt2eWs0YTRJL0tEaGpuREdVY1p2NDJFQ1U2UUFRS0d5Mk9Bc0FpaDJxcHhkeXNsQS9GRVVOamtLdVFJaHlNY3ErSEQ2YmkvSUpsTzN5OHZJVlBJU3lGV292QW9DSzdnNWdaUHpGWjliZi9HY28vYlBaV1VxZXFHdGNDRUVDaVNpWHZmai8zSnIvTFhtNTBza1lGdWlnOE1WaHNZcDQ2UDdkemNtUFVMSXdZMWIwSkF1NEV6a3BtQzhOUzVoa2ppUXdkWks1N0tBSTVkcmNXWkdUbkNrSVlTbjlGTERpSjVrbkNZNmJaSEYrckRKV3BqaVFPY2xzOFhoY0Vzb3lhVTZDVXMvbnNaVCtpL2p4U1pOY0tFaWNOY21TbkxpSUtadEFwVjRzalZYbXp4T0dCa3pGRFZIV25pZjVTNzBDbG5KdEFUOCtURms3ZXlwL25wQTU1Vk9Tck15Tnl3c0tuckpKVU5xTENnS1VzVVM1TVVwN1htNm9VaThwakZPdUxVQVA1OVRhR09VZVpyUERZeVlaQ0VBVVlBTU9YWFdTQUNqZ0xTcFFGQktZTDFvc0ZtVHhDK2hNOUxieDZDd2h4OEdPN3V6bzdBS0E0dTVPSEllUmErTjNFdEpWbjlLVmJRTEFEeXVYeTF1bWRHR1hBVGhTQVFEWmRVcG5pUjVVRmZUY1h3emdTTVdGRXpxTTRxSDRJcWdDVGFBTERORXZneFd3Qjg3QUhYZ0RmeEFNd2tFMGlBY3BZQjZhS3gva0FURllDSXJCQ2xBR0tzQUdzQVhVZ0oxZ045Z1BEb0Vqb0JXY0FHZkFCWEFGWEFlM3dBTWdBd1BnT1JnQjc4QVlCRUY0aUFyUklGM0lDREtIYkNGbmlBSDVRc0ZRSkJRTHBVRHBVQllraEtSUU1iUUtxb0Fxb1Jwb0Y5UUEvUWdkaDg1QWw2QWU2QjdVQncxRHI2RlBNQUpUWUUzWUFMYUFaOEFNbUFsSHdQSHdYRGdMWGdBWHdhWHdPcmdhcm9jUHdpM3dHZmdLZkF1V3djL2hVUVFnWkVRYk1VYnNFUVlTaUVRanFVZ21Ja2FXSWVWSUZWS1BOQ0h0U0JkeUE1RWhMNUNQR0J5R2hxRmo3REhlbURCTUFvYURXWUJaaGxtTHFjSHN4N1Jnem1GdVlQb3dJNWl2V0NwV0gydUw5Y0t5c01uWUxPeENiQm0yQ3JzWGV3eDdIbnNMTzRCOWg4UGh0SEdXT0E5Y0dDNEZsNDFiZ2x1TDI0NXJ4blhnZW5EOXVGRThIcStMdDhYNzRLUHhiSHdCdmd5L0RYOFFmeHJmaXgvQWZ5Q1FDVVlFWjBJSUlaVWdKS3drVkJFT0VFNFJlZ21EaERHaUd0R2M2RVdNSm5LSmk0bnJpWHVJN2NScnhBSGlHRW1kWkVueUljV1Rza2tyU05Xa0p0SjUwa1BTR3pLWmJFTDJKTThtQzhnbDVHcnlZZkpGY2gvNUkwV0RZa01KcEtSUnBKUjFsSDJVRHNvOXloc3FsV3BCOWFlbVVndW82NmdOMUxQVXg5UVBLalFWQnhXV0NsZGx1VXF0U290S3I4cExWYUtxdVNwVGRaNXFrV3FWNmxIVmE2b3YxSWhxRm1xQmFteTFaV3ExYXNmVjdxaU5xdFBVbmRTajFmUFUxNm9mVUwra1BxU0IxN0RRQ05iZ2FwUnE3Tlk0cTlGUFEyaW10RUFhaDdhS3RvZDJuamFnaWRPMDFHUnBabXRXYUI3UzdOWWMwZExRY3RWSzFGcWtWYXQxVWt1bWpXaGJhTE8wYzdYWGF4L1J2cTM5YVpyQk5PWTAzclExMDVxbTlVNTdyek5keDErSHAxT3UwNnh6UytlVExsMDNXRGRIZDZOdXErNGpQWXllamQ1c3ZZVjZPL1RPNjcyWXJqbmRlenBuZXZuMEk5UHY2OFA2TnZxeCtrdjBkK3RmMVI4MU1EUUlOUkFaYkRNNGEvRENVTnZRM3pEYmNMUGhLY05oSTVxUnI1SEFhTFBSYWFObmRDMDZrNTVMcjZhZm80OFk2eHVIR1V1TmR4bDNHNCtaV0pva21LdzBhVFo1WkVveVpaaG1tbTQyN1RRZE1UTXlpeklyTm1zMHUyOU9OR2VZODgyM21uZVp2N2V3dEVpeVdHM1JhakZrcVdQSnNpeXliTFI4YUVXMThyTmFZRlZ2ZGRNYVo4Mnd6ckhlYm4zZEJyWnhzK0hiMU5wY3M0VnQzVzBGdHR0dGUreXdkcDUyUXJ0NnV6djJGSHVtZmFGOW8zMmZnN1pEcE1OS2gxYUhselBNWnFUTzJEaWphOFpYUnpmSFhNYzlqZytjTkp6Q25WWTZ0VHU5ZHJaeDVqalhPdDkwb2JxRXVDeDNhWE41NVdycnluUGQ0WHJYamVZVzViYmFyZFB0aTd1SHU5aTl5WDNZdzh3ajNhUE80dzVEa3hIRFdNdTQ2SW4xRFBCYzdubkM4Nk9YdTFlQjF4R3ZQN3p0dlhPOEQzZ1B6YlNjeVp1NVoyYS9qNGtQMjJlWGo4eVg3cHZ1KzcydnpNL1lqKzFYNy9mRTM5U2Y2Ny9YZjVCcHpjeG1IbVMrREhBTUVBY2NDM2dmNkJXNE5MQWpDQWtLRFNvUDZnN1dDRTRJcmdsK0hHSVNraFhTR0RJUzZoYTZKTFFqREJzV0ViWXg3QTdMZ01WaE5iQkd3ajNDbDRhZmk2QkV4RVhVUkR5SnRJa1VSN1pId1ZIaFVadWlIczR5bnlXYzFSb05vbG5SbTZJZnhWakdMSWo1ZVRadWRzenMydGxQWTUxaWkyTzc0bWh4OCtNT3hMMkxENGhmSC84Z3dTcEJtdENacUpxWWx0aVErRDRwS0treVNaWThJM2xwOHBVVXZSUkJTbHNxUGpVeGRXL3E2SnpnT1Z2bURLUzVwWldsM1o1ck9YZlIzRXZ6OU9ibHpqczVYM1UrZS83UmRHeDZVdnFCOU0vc2FIWTllelNEbFZHWE1jSUo1R3psUE9mNmN6ZHpoM2srdkVyZVlLWlBabVhtVUpaUDFxYXNZYjRmdjRyL1FoQW9xQkc4eWc3TDNwbjlQaWM2WjErT1BEY3B0em1Qa0plZWQxeW9JY3dSbnNzM3pGK1UzeU95RlpXSlpBdThGbXhaTUNLT0VPK1ZRSks1a3JZQ1RiUkp1aXExa240ajdTdjBMYXd0L0xBd2NlSFJSZXFMaEl1dUxyWlp2R2J4WUZGSTBROUxNRXM0U3pxTGpZdFhGUGN0WlM3ZHRReGFsckdzYzducDh0TGxBeVdoSmZ0WGtGYmtyUGhscGVQS3lwVnZWeVd0YWk4MUtDMHA3ZjhtOUp2R01wVXljZG1kMWQ2cmQzNkwrVmJ3YmZjYWx6WGIxbnd0NTVaZnJuQ3NxS3I0dkphejl2SjNUdDlWZnlkZmw3bXVlNzM3K2gwYmNCdUVHMjV2OU51NHYxSzlzcWl5ZjFQVXBwYk45TTNsbTk5dW1iL2xVcFZyMWM2dHBLM1NyYkxxeU9xMmJXYmJObXo3WE1PdnVWVWJVTnRjcDErM3B1NzlkdTcyM2gzK081cDJHdXlzMlBucGU4SDNkM2VGN21xcHQ2aXYybzNiWGJqNzZaN0VQVjAvTUg1bzJLdTN0Mkx2bDMzQ2ZiTDlzZnZQTlhnME5CelFQN0MrRVc2VU5nNGZURHQ0L1ZEUW9iWW0rNlpkemRyTkZZZkJZZW5oWnorbS8zajdTTVNSenFPTW8wMC9tZjlVZDR4MnJMd0ZhbG5jTXRMS2I1VzFwYlQxSEE4LzN0bnUzWDdzWjRlZjk1MHdQbEY3VXV2aytsT2tVNlduNUtlTFRvOTJpRHBlbk1rNjA5ODV2L1BCMmVTek44L05QdGQ5UHVMOHhRc2hGODUyTWJ0T1gvUzVlT0tTMTZYamx4bVhXNis0WDJtNTZuYjEyQzl1dnh6cmR1OXV1ZVp4cmUyNjUvWDJucGs5cDNyOWVzL2NDTHB4NFNicjVwVmJzMjcxM0U2NGZmZE8yaDNaWGU3ZG9YdTU5MTdkTDd3LzlxRGtJZlpoK1NPMVIxV1A5Ui9YLzJyOWE3UE1YWGF5TDZqdjZwTzRKdy82T2YzUGY1UDg5bm1nOUNuMWFkV2cwV0REa1BQUWllR1E0ZXZQNWp3YmVDNTZQdmFpN0hmMTMrdGVXcjM4NlEvL1A2Nk9KSThNdkJLL2tyOWUrMGIzemI2M3JtODdSMk5HSDcvTGV6ZjJ2dnlEN29mOUh4a2Z1ejRsZlJvY1cvZ1ovN242aS9XWDlxOFJYeC9LOCtSeUVWdk1IbThGRUhUQW1aa0F2TjZIOXNZcEFORFF2cHcwWjZLM0hoZG80bjlnbk1CLzRvbitlMXpjQVdoQ0owVmI1TjhCd0ZGRk8rdVAraTRCSUJxZDQvMEI3T0tpSFA4U1NhYUw4NFF2bFVZQThNWnkrZXQ4QUlqbytCd3FsNC9GeU9WZjZ0Qmtid0p3YW1paXAxY0lEdTNsbTJqblg2dnllcitXbElCL3lFUy8vNWNhL3prRFJRYXU0Si96bi9SNkdmK3ZQbk92QUFBQU9HVllTV1pOVFFBcUFBQUFDQUFCaDJrQUJBQUFBQUVBQUFBYUFBQUFBQUFDb0FJQUJBQUFBQUVBQUFBZ29BTUFCQUFBQUFFQUFBQWdBQUFBQUk5T1FNa0FBQWM5U1VSQlZGZ0p4VmQ3VkZSMUh2ODRnTUJNekRBOEZIRFVPUzZ2aUN4cmEyMUJnOVhDc21RMWQ4dWpFclcyNW5iY090dXV0bjkwMnJMTzhiVFdtbVV1QitxVVlabXZ6ZGN1U0NUSHdKT3RydmtBa1dFRlNoaEJuZ01ETXpFTWV6Ky80WGU3TTQ2cGYrM3ZuUHY0ZmQvdjM3M0EvM21OdTFIOVJVVkZQOHZMeTd0MWNIRFFPand5RWtQK3NKQ1FicjFlMzF4ZVhuNW01Y3FWeDI1VTVqWHBxZlRVbVRQdkRnd01kQTBQRDQ5ZWJSRkhHdEtTNTVxQ3IwV1FsWlVWWmJQWlNnZWNReU5YVXhvTWZ2eEU3U2lOSVM5bFhFdFBVRHc5b0RlQkNpNzNEWTFXMTNlT2JpcHI4cnNJSTQ3Ry9tMVRxY3BHR1Q4V2phQTFjUGp3NFdYWjJka2ZoWWFHcXNiVm5PL0M3bVB0T05udUZMRFFFQi9PTStJUisyN1hDR1ltNlBGemZSTWFXdnZ3MnBvQ2xkZmo4YUMxdGZVcHE5VmFvZ0xIWG5TQmdFRGxuUTRYL3JDMURyL2JZVU9idzQwWkV3M2ltaFlWZ3RqeHdLTHA4VUlFbGIvMmFDcU8vNmNKVmQxbXdVTmVMam95YWRLa1lzb1dBTTB0UlBNT2hpby9QLytmMG5PYnZSOFBiVG1EQ01YTTJWWVQ0bThhRDdmSEM2ZmJnd3Y5STdndjNZelZlVmFZdzNYNDQ4UEpxS3c4aHZjT25vZDUray9SMXU5R1VZMGRjMU5OaUkwS2gwNm5nOFZpV2FSY1pRY09IR2lWZXYxUzBOYlcxcENZbUpoQ0pKVXZMcW5GbktsR21DSkQwVGZrRVlyNzNDUElTakZqeVQwSmlETkdDRG5PUVpkMy9WLy9ydHV3K1N1a3JuNE9NUkUvK01YVTdGcHhDMUlTZmJYb2REcTdsVGEyMXRUVTlKTlpUY0haczJmWFNPVU0zVzlMNjBWT3Rjb040YUY0cCtCbXJKcGpRVTFERDE1OGVhTXdJTnFVcTR1TmljZm5YMjdHS3c5TVJZNFNMU3JtUldNb1M2YkRZRERFRkJjWHJ4V015azJOQUt1VlNDSmUzdG1BNnUrY3lKNXN1TUp6aG54bDhXbU1yLzhDNjljOTdhMnZ2NkF6bVl4SS9vbEZ5aFJQUnVYOUx5L3A5cHkrTEF4WmxCNkRsMzZWcXVMeTdwOGJ6U2dJQTdTRnB3MDljNTA1eFlnYVc0OWdYREl6QVZtcFppZ1o4UnIwckl3ckZ6MXRhYnlBZ1FHWFVuZ1QwTzZKRk4xVDJlTHdTMFZMUzR2b0N0RkxTbUhNazRWWGRyb0xFd3poUWpLVlB6a3J3VHNsTmx4SHhUTG5DbElvYi96dlJVRVhIUitIYUgyb3FIYlN4TjJSSVVKKzVJc2oyRkw4RDh5OE93MHprMzZCajZ2dFNoUjh0ZUQxZW4rcE1KZUlDTWp3TTJ5L2VmK2N6aFR1SzZMTlQyVGdyVStQNHZtbHM0VWkzdGpUY2pXM1hNTGNSNTZIczdzVHViTm1ZUDZEczdCNFlaNWZkQmpSd3JlcUJNdGtpMFhVRUkya25MQ3dzSEhqT0NxcnE2c2RwQ0F4QzJhaUVtTWFVZlRVZE1ISXNCN2NYNDdHeGlhY2I3aUlubDRuek5FR3BLVmF3T0xiWEhJQ2ZRNG4rcDE5bUpnMGlnODNyY1c5cys4UXZMeVJmMG5KT1hRNDNXb2FhRUJPVGs0NlU1REVEVlBRNGZoZUZBd05ZTHR4Ylh4N0cvNjhiaitpRENheG41ak9Zak9oK1d3UHFvNmVVNVIrQlV0aUVreEdnN2d3Q3N5ZDh3eEtQbmdCankvTkZ6ejArQy96cDRoaFJoMHBpUUtNZ29LQ2FGRURNditkL2Q4TFRKZnk0SWg5N0oyVE9LRjRSK1dXZSs5RTdQUzdmSnhqZDlMMDFaNUUvOGw2UDdnMTR4NnNLRndQNitUSmFpU3kwbUtWdG02RjFDRVpoQUV5QXJxT0N3bzhSQ2duUWJzeWZLeVBMOGRnaDYvWTVOeVh6SHpTcU9IMmRyamFmSjBpY1RSaThiSS80ZkszbFJLRUIyZjR4allCMG1tL1ZrcEtNTU43dEFMeW9DRWhsZW9uV01URmZiQmx2TzEyVVFPQnVBRlhQUFo4ZGtnRloweTZDWEZSeWdHaUxEcTlkZXZXWHAweURNNUxDZzZVUzdWVnd1TkFJNEo1TC9tR0x0bEZBY3E5ZkxJMnR1Lzh3UUN6SVF4cGlRYUJaZ1NvVzBTZ3VibjVhMEt0VXhOdys2MnBhQzByRlo1cmpaQkNBNTgwclB1YlNyVkkyUTNhdGIvQ2x6N0N4SXdZT3ovc2RydU5NR0dBMiszZXpRMnRtajh2RzYyMTM2SnAyNFlySWtFYXVhUnhGMHMvRVhOZ2RLUVJ2VDJuSkZwOWVucGEvR2FIUlBUMjl1N2d1eGhFeWl4SUt6LzBlUjNISzN2MjVzejVrZzRKdCtTQU9SNGZtNkRDK01McXArY2NRdG8xTGlUWjE0NWp3SXYyTmd4MWJOZVNDSU00QTVnQzlURGk5MXR5Y3ZKU1VuNjRiYTlvbytoRXZXRHN0UStDNzRhWU9LRlE3djJram0wQ0RTRFlkdXBOUDlLbXBxYUQwNlpOZTRoQXRRc0tDd3RYY1JRVHlBR3k4TmRab0NJdWFZajBWdTRGVW5NTFZNNTZlR2JGblJvS1gvVlhWRlNzazBBMUFnUm9UMFcyeVFQNXExRjE2QnZWQU1rVTdCbW9uRFFNZjJmekIzNW5RMjF0N2RyTXpNelhwUXcxQWdUazV1YVdLaDJ4amU4c3lJcURXL0QwN3g5VkkwRjRzQlZNT2IwdjI3VUcybU9ib2RjcXB5dy9Bd2hJU1VsWlJrSytjNzM5eG5QWXMzZURhRStaRXNKWkQxUWNiYjdOcitpb09DTEpqSC90ZmxZZHc2U256T1hMbHkvaHUzYjVwVUNMNE45TlJucjZLamt5V1IvSGo5ZnBkdTA5Z3FxNmZqRjZaYy96SUtMU25Jd281VmpPUU43OXM5V3dNNVdNS2gzVHlyK3VkOVpFc0o4VC9uellHcjhiMVY3OEtRbGNwS09NNjFKMk5TSitML0NETlpnaGdRcmxuclIxZFhXdlhzOXYyVlZURU13Zy9qY3NXTEJnM3REUTBGMFJFUkdwUnFNeGxuUU9oNlBMNVhJMVJFWkcvbnZmdm4xbE4vS0gvRC93c3k4cHFET2lWUUFBQUFCSlJVNUVya0pnZ2c9PSIvPgo8L2RlZnM+Cjwvc3ZnPgo="
    />
  ),
  Balancer: (
    <img
      className="dex-name-icon"
      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxyZWN0IHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgcng9IjEwIiBmaWxsPSJ1cmwoI3BhdHRlcm4wKSIvPgo8ZGVmcz4KPHBhdHRlcm4gaWQ9InBhdHRlcm4wIiBwYXR0ZXJuQ29udGVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgd2lkdGg9IjEiIGhlaWdodD0iMSI+Cjx1c2UgeGxpbms6aHJlZj0iI2ltYWdlMF81MV82MzciIHRyYW5zZm9ybT0ic2NhbGUoMC4wMzEyNSkiLz4KPC9wYXR0ZXJuPgo8aW1hZ2UgaWQ9ImltYWdlMF81MV82MzciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFDQUFBQUFnQ0FJQUFBRDhHTzJqQUFBSzJtbERRMUJKUTBNZ1VISnZabWxzWlFBQVNJbVZsd2RVRTlrYWdPL01wQmRhQUFFcG9YZWtFMEJLNktFSTBrRlVRaEpJS0NFbUJCVlJVVmxjd2JXZ0lnTHFpcTZLS0xpNkFySVd4SUp0VWJEWERiSUlxT3Rpd1lhYW5jQWo3TzQ3Nzczei9uUHUzTy84ODkrLzNIUHZuSDhBb0lheFJhSmNXQTJBUEdHQk9EWTBnSjZja2tySER3SUlZQUVKbUFLRXpaR0ltREV4a1FDVnlmbnY4dTQyYW8zS0RYdUZyMzkvLzE5Rmc4dVRjQUNBMGxETzRFbzRlU2gzb09NWlJ5UXVBQUE1aU9wTkZ4YUlGSHdkWlUweG1pREt2eWs0YTRJL0tEaGpuREdVY1p2NDJFQ1U2UUFRS0d5Mk9Bc0FpaDJxcHhkeXNsQS9GRVVOamtLdVFJaHlNY3ErSEQ2YmkvSUpsTzN5OHZJVlBJU3lGV292QW9DSzdnNWdaUHpGWjliZi9HY28vYlBaV1VxZXFHdGNDRUVDaVNpWHZmai8zSnIvTFhtNTBza1lGdWlnOE1WaHNZcDQ2UDdkemNtUFVMSXdZMWIwSkF1NEV6a3BtQzhOUzVoa2ppUXdkWks1N0tBSTVkcmNXWkdUbkNrSVlTbjlGTERpSjVrbkNZNmJaSEYrckRKV3BqaVFPY2xzOFhoY0Vzb3lhVTZDVXMvbnNaVCtpL2p4U1pOY0tFaWNOY21TbkxpSUtadEFwVjRzalZYbXp4T0dCa3pGRFZIV25pZjVTNzBDbG5KdEFUOCtURms3ZXlwL25wQTU1Vk9Tck15Tnl3c0tuckpKVU5xTENnS1VzVVM1TVVwN1htNm9VaThwakZPdUxVQVA1OVRhR09VZVpyUERZeVlaQ0VBVVlBTU9YWFdTQUNqZ0xTcFFGQktZTDFvc0ZtVHhDK2hNOUxieDZDd2h4OEdPN3V6bzdBS0E0dTVPSEllUmErTjNFdEpWbjlLVmJRTEFEeXVYeTF1bWRHR1hBVGhTQVFEWmRVcG5pUjVVRmZUY1h3emdTTVdGRXpxTTRxSDRJcWdDVGFBTERORXZneFd3Qjg3QUhYZ0RmeEFNd2tFMGlBY3BZQjZhS3gva0FURllDSXJCQ2xBR0tzQUdzQVhVZ0oxZ045Z1BEb0Vqb0JXY0FHZkFCWEFGWEFlM3dBTWdBd1BnT1JnQjc4QVlCRUY0aUFyUklGM0lDREtIYkNGbmlBSDVRc0ZRSkJRTHBVRHBVQllraEtSUU1iUUtxb0Fxb1Jwb0Y5UUEvUWdkaDg1QWw2QWU2QjdVQncxRHI2RlBNQUpUWUUzWUFMYUFaOEFNbUFsSHdQSHdYRGdMWGdBWHdhWHdPcmdhcm9jUHdpM3dHZmdLZkF1V3djL2hVUVFnWkVRYk1VYnNFUVlTaUVRanFVZ21Ja2FXSWVWSUZWS1BOQ0h0U0JkeUE1RWhMNUNQR0J5R2hxRmo3REhlbURCTUFvYURXWUJaaGxtTHFjSHN4N1Jnem1GdVlQb3dJNWl2V0NwV0gydUw5Y0t5c01uWUxPeENiQm0yQ3JzWGV3eDdIbnNMTzRCOWg4UGh0SEdXT0E5Y0dDNEZsNDFiZ2x1TDI0NXJ4blhnZW5EOXVGRThIcStMdDhYNzRLUHhiSHdCdmd5L0RYOFFmeHJmaXgvQWZ5Q1FDVVlFWjBJSUlaVWdKS3drVkJFT0VFNFJlZ21EaERHaUd0R2M2RVdNSm5LSmk0bnJpWHVJN2NScnhBSGlHRW1kWkVueUljV1Rza2tyU05Xa0p0SjUwa1BTR3pLWmJFTDJKTThtQzhnbDVHcnlZZkpGY2gvNUkwV0RZa01KcEtSUnBKUjFsSDJVRHNvOXloc3FsV3BCOWFlbVVndW82NmdOMUxQVXg5UVBLalFWQnhXV0NsZGx1VXF0U290S3I4cExWYUtxdVNwVGRaNXFrV3FWNmxIVmE2b3YxSWhxRm1xQmFteTFaV3ExYXNmVjdxaU5xdFBVbmRTajFmUFUxNm9mVUwra1BxU0IxN0RRQ05iZ2FwUnE3Tlk0cTlGUFEyaW10RUFhaDdhS3RvZDJuamFnaWRPMDFHUnBabXRXYUI3UzdOWWMwZExRY3RWSzFGcWtWYXQxVWt1bWpXaGJhTE8wYzdYWGF4L1J2cTM5YVpyQk5PWTAzclExMDVxbTlVNTdyek5keDErSHAxT3UwNnh6UytlVExsMDNXRGRIZDZOdXErNGpQWXllamQ1c3ZZVjZPL1RPNjcyWXJqbmRlenBuZXZuMEk5UHY2OFA2TnZxeCtrdjBkK3RmMVI4MU1EUUlOUkFaYkRNNGEvRENVTnZRM3pEYmNMUGhLY05oSTVxUnI1SEFhTFBSYWFObmRDMDZrNTVMcjZhZm80OFk2eHVIR1V1TmR4bDNHNCtaV0pva21LdzBhVFo1WkVveVpaaG1tbTQyN1RRZE1UTXlpeklyTm1zMHUyOU9OR2VZODgyM21uZVp2N2V3dEVpeVdHM1JhakZrcVdQSnNpeXliTFI4YUVXMThyTmFZRlZ2ZGRNYVo4Mnd6ckhlYm4zZEJyWnhzK0hiMU5wY3M0VnQzVzBGdHR0dGUreXdkcDUyUXJ0NnV6djJGSHVtZmFGOW8zMmZnN1pEcE1OS2gxYUhselBNWnFUTzJEaWphOFpYUnpmSFhNYzlqZytjTkp6Q25WWTZ0VHU5ZHJaeDVqalhPdDkwb2JxRXVDeDNhWE41NVdycnluUGQ0WHJYamVZVzViYmFyZFB0aTd1SHU5aTl5WDNZdzh3ajNhUE80dzVEa3hIRFdNdTQ2SW4xRFBCYzdubkM4Nk9YdTFlQjF4R3ZQN3p0dlhPOEQzZ1B6YlNjeVp1NVoyYS9qNGtQMjJlWGo4eVg3cHZ1KzcydnpNL1lqKzFYNy9mRTM5U2Y2Ny9YZjVCcHpjeG1IbVMrREhBTUVBY2NDM2dmNkJXNE5MQWpDQWtLRFNvUDZnN1dDRTRJcmdsK0hHSVNraFhTR0RJUzZoYTZKTFFqREJzV0ViWXg3QTdMZ01WaE5iQkd3ajNDbDRhZmk2QkV4RVhVUkR5SnRJa1VSN1pId1ZIaFVadWlIczR5bnlXYzFSb05vbG5SbTZJZnhWakdMSWo1ZVRadWRzenMydGxQWTUxaWkyTzc0bWh4OCtNT3hMMkxENGhmSC84Z3dTcEJtdENacUpxWWx0aVErRDRwS0treVNaWThJM2xwOHBVVXZSUkJTbHNxUGpVeGRXL3E2SnpnT1Z2bURLUzVwWldsM1o1ck9YZlIzRXZ6OU9ibHpqczVYM1UrZS83UmRHeDZVdnFCOU0vc2FIWTllelNEbFZHWE1jSUo1R3psUE9mNmN6ZHpoM2srdkVyZVlLWlBabVhtVUpaUDFxYXNZYjRmdjRyL1FoQW9xQkc4eWc3TDNwbjlQaWM2WjErT1BEY3B0em1Qa0plZWQxeW9JY3dSbnNzM3pGK1UzeU95RlpXSlpBdThGbXhaTUNLT0VPK1ZRSks1a3JZQ1RiUkp1aXExa240ajdTdjBMYXd0L0xBd2NlSFJSZXFMaEl1dUxyWlp2R2J4WUZGSTBROUxNRXM0U3pxTGpZdFhGUGN0WlM3ZHRReGFsckdzYzducDh0TGxBeVdoSmZ0WGtGYmtyUGhscGVQS3lwVnZWeVd0YWk4MUtDMHA3ZjhtOUp2R01wVXljZG1kMWQ2cmQzNkwrVmJ3YmZjYWx6WGIxbnd0NTVaZnJuQ3NxS3I0dkphejl2SjNUdDlWZnlkZmw3bXVlNzM3K2gwYmNCdUVHMjV2OU51NHYxSzlzcWl5ZjFQVXBwYk45TTNsbTk5dW1iL2xVcFZyMWM2dHBLM1NyYkxxeU9xMmJXYmJObXo3WE1PdnVWVWJVTnRjcDErM3B1NzlkdTcyM2gzK081cDJHdXlzMlBucGU4SDNkM2VGN21xcHQ2aXYybzNiWGJqNzZaN0VQVjAvTUg1bzJLdTN0Mkx2bDMzQ2ZiTDlzZnZQTlhnME5CelFQN0MrRVc2VU5nNGZURHQ0L1ZEUW9iWW0rNlpkemRyTkZZZkJZZW5oWnorbS8zajdTTVNSenFPTW8wMC9tZjlVZDR4MnJMd0ZhbG5jTXRMS2I1VzFwYlQxSEE4LzN0bnUzWDdzWjRlZjk1MHdQbEY3VXV2aytsT2tVNlduNUtlTFRvOTJpRHBlbk1rNjA5ODV2L1BCMmVTek44L05QdGQ5UHVMOHhRc2hGODUyTWJ0T1gvUzVlT0tTMTZYamx4bVhXNis0WDJtNTZuYjEyQzl1dnh6cmR1OXV1ZVp4cmUyNjUvWDJucGs5cDNyOWVzL2NDTHB4NFNicjVwVmJzMjcxM0U2NGZmZE8yaDNaWGU3ZG9YdTU5MTdkTDd3LzlxRGtJZlpoK1NPMVIxV1A5Ui9YLzJyOWE3UE1YWGF5TDZqdjZwTzRKdy82T2YzUGY1UDg5bm1nOUNuMWFkV2cwV0REa1BQUWllR1E0ZXZQNWp3YmVDNTZQdmFpN0hmMTMrdGVXcjM4NlEvL1A2Nk9KSThNdkJLL2tyOWUrMGIzemI2M3JtODdSMk5HSDcvTGV6ZjJ2dnlEN29mOUh4a2Z1ejRsZlJvY1cvZ1ovN242aS9XWDlxOFJYeC9LOCtSeUVWdk1IbThGRUhUQW1aa0F2TjZIOXNZcEFORFF2cHcwWjZLM0hoZG80bjlnbk1CLzRvbitlMXpjQVdoQ0owVmI1TjhCd0ZGRk8rdVAraTRCSUJxZDQvMEI3T0tpSFA4U1NhYUw4NFF2bFVZQThNWnkrZXQ4QUlqbytCd3FsNC9GeU9WZjZ0Qmtid0p3YW1paXAxY0lEdTNsbTJqblg2dnllcitXbElCL3lFUy8vNWNhL3prRFJRYXU0Si96bi9SNkdmK3ZQbk92QUFBQU9HVllTV1pOVFFBcUFBQUFDQUFCaDJrQUJBQUFBQUVBQUFBYUFBQUFBQUFDb0FJQUJBQUFBQUVBQUFBZ29BTUFCQUFBQUFFQUFBQWdBQUFBQUk5T1FNa0FBQUtwU1VSQlZFZ043VmJQYnlsUkZOWStHd2xkVklTb1JnaUpZQ0ZJYWtNclltM0R3dHJLenJZci80Q0ZoYi9BUmlMK2hRWWJpVlJVR20wMHRCWmE0a2VGUkVoRTZuMDZ5Y3lZdWRQbjhlemVUU2E1Yys0NTMzZm5uUFBkT3lmcjlWb2tNTHJkYmlhVHFkVnFyVmFyMld4K2ZuN1Nqbks1M0dnMEdnd0dtODBXRG9mVmFqVzl4SjJBZ0QvdTcrOERnUURYVmZnOUZBclY2M1UrRGl3aXZqV2J6UXBEQ2E2SXhlSjhQczlITytWSFBEdzg4STEvdEt4V3EwS2hRSERqY3lMWGY1VWZDaFJabWt3bWZEUkNpaWdubENFU2lVaWxVc0ttV0NaVU94cU5DaFVBVUNkNFdQNkVhYnZkYmpRYWIyOXZ3K0dRWGxZb0ZIcTkzbVF5NlhRNjJraWNrQWtXaTBVdWx5c1dpNlBSQ0JCMnUvM3k4cElUMytsMHF0WHE0K01qSEs2dnI0UEJvRVFpNGZoc1hqbFpTNlZTRG9jRExVRncvZEdFRUpmTGxVNm5PWUFNQVdwcnRWcC9CTmxwRVRUeitaeW1ZUWpRQmpzQjdPQ0VzdE1FakE3T3pzNTJpTjNKWmJsY01uNDAxY2ZIeDhYRkJiT3c3d3dneURZTnk2UUlKaWpsOXZaMmJ4cWNmZkY0bkYwQVlKTGI5T25wQ2JwSG01WktKWHpaRHg4RFVGVFY3WGI3L1g2aUpzZ0ViTVRwZFByKy9zNVdHYldxMVdwVktoVzU5MW54V3dUajhiaGNMbGNxRld3ZlI0WEZZc0h1T0NxREJtZXoyV0F3Z0hPdjEzdjVIdjErMytQeDNOemNPSjNPcTZ1cjgvTnpob0txQms2Q1BRNDRCb1UxZytMUThVZ3NoYndwY2l3VzIwTzZMRXpDRklBb09NQi9JY1hKWlBMcjY0dmdkWUFKZ09nUm1Vd20yanhIRytpQ1U1VGxhUGdpczlrc1FqWFF5OGZnQU94R1E2Z0RCSXpMNngvV0dWQm9IRXJTekZHQkF5U1JTS0R4RC9rYXI5ZUxHNFY5T1c4SmpZS0dndTd1N3ZCdjhmejgvUHI2aWtzTkF6OE5IR0pzVTZsVW9vd2FqUWEvWDFDbHorZmJrdGgzQUlHQUEzVGdLM01mSEFna0ZQNmZRQ2d6dFAzb0tmb054cWxNdUNzc242SUFBQUFBU1VWT1JLNUNZSUk9Ii8+CjwvZGVmcz4KPC9zdmc+Cg=="
    />
  ),
  "Pancake Swap": (
    <img
      className="dex-name-icon"
      src="https://repository-images.githubusercontent.com/440462673/6872d684-f7ed-463c-9a5c-76542eddbcc4"
    />
  ),

  "0vix": (
    <img
      className="dex-name-icon"
      src="https://ipfs.near.social/ipfs/bafkreigyodedyhiqmstq3g5edcqw25yyari4y3rcbsnqtxldb2zb2vpah4"
    />
  ),
};

State.init({
  text: "",
  hintList: [],
  selectClose: false,
});

let link = "";

const onSaveParams = (text) => {
  console.log("text: ", text);
  const arr = text.split(/\s+/);

  const isBridge = arr[0].toLowerCase() === "bridge";

  const isSwap = arr[0].toLowerCase() === "swap";
  console.log("isSwap: ", isSwap, isBridge);

  if (isBridge) {
    const [action_type, symbol, from, chain] = arr;

    Storage.set("zk-evm-bridge-params", {
      symbol,
      chain,
    });
  }

  if (isSwap) {
    const [action_type, amount, symbol, on, dexName] = arr;

    Storage.set("zk-evm-swap-params", {
      amount,
      symbol,
      dexName: state.dexName || dexName,
      assetId: state.assetId || state.hintList[0].address,
    });
  }
};

const parseString =
  state?.hintList?.length === 1 ? state.hintList[0].full : state.text;

if (state?.hintList?.length === 1) {
  onSaveParams(state.hintList[0].full);
}

const arr = parseString.split(/\s+/);

const isBridge = arr[0].toLowerCase() === "bridge";

const isSwap = arr[0].toLowerCase() === "swap";

const isBorrow = arr[0].toLowerCase() === "borrow";

const isRepay = arr[0].toLowerCase() === "repay";

const isSupply = arr[0].toLowerCase() === "supply";

if (isBridge && (!!state.selectClose || state?.hintList?.length === 1)) {
  link = "/guessme.near/widget/ZKEVMSwap.zkevm-bridge";
}
if (isSwap && (!!state.selectClose || state?.hintList?.length === 1)) {
  link = "/guessme.near/widget/ZKEVMSwap.zkevm-swap";
}

if (
  (isRepay || isBorrow) &&
  (!!state.selectClose || state?.hintList?.length === 1)
) {
  link = `/bluebiu.near/widget/0vix.Lending?tab=${isRepay ? "repay" : "borrow"
    }`;
}

if (isSupply && (!!state.selectClose || state?.hintList?.length === 1)) {
  link = "/bluebiu.near/widget/0vix.Lending?tab=supply";
}

return (
  <Wrapper>
    <div className="input-wrapper">
      <div className="input-search-wrapper">
        <input
          className="input-records"
          placeholder="e.g. Swap 100 USDC; Bridge USDC; Supply on 0vix; Borrow on 0vix; Repay on 0vix"
          value={state.text}
          onChange={(e) => {
            State.update({
              text: e.target.value,
              selectClose: false,
            });
          }}
        />

        <div className="search-wrapper">{searchIcon}</div>
      </div>

      {!!link && (
        <a className="input-button" href={link}>
          Execute
        </a>
      )}
      {!link && (
        <div
          className="input-button"
          style={{
            opacity: 0.3,
          }}
        >
          Execute
        </div>
      )}
    </div>

    <Widget
      src="guessme.near/widget/ZKEVMWarmUp.search-config"
      props={{
        onLoad: (hintList) => {
          State.update({
            hintList,
          });
        },
        search: state.text,
      }}
    />

    {!!state.text && state.hintList.length > 0 && !state.selectClose && (
      <div className="search-hint-list">
        {state.hintList.slice(0, 8).map((item) => {
          if (!item.matched) return <div></div>;
          return (
            <div
              className="search-hint-item"
              onClick={() => {
                State.update({
                  text: item.full,
                  hintList: [],
                  dexName: item.dappName,
                  selectClose: true,
                  assetId: item.address,
                });
                onSaveParams(item.full);
              }}
            >
              <div className="search-hint-content">
                <span className="highlight">{item.highlight}</span>
                {item.left}
              </div>
              <div className="dex-name">
                {iconsMap[item.dappName]}

                {item.dappName}
              </div>
            </div>
          );
        })}
      </div>
    )}
  </Wrapper>
);
