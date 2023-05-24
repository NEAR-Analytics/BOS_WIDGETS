if (!props.accountId) {
  console.log("No accountId props specified");
  return "";
}

const address = `${props.accountId}@near.mailchain.com`;

let mailchainUrl = `https://app.mailchain.com/mailto:${address}`;

if (props.subject) {
  mailchainUrl = `${mailchainUrl}?subject=${props.subject}`;
}

const res = fetch(
  `https://api.mailchain.com/addresses/${address}/resolved-messaging-key`
);
console.log(address, res);
const linkunderline = props.linkunderline === "yes";
// const showRegisteredAddressIndicator = props.showRegisteredAddressIndicator === "yes";
const showRegisteredAddressIndicator = false; // Coming soon
const showExternalLinkIcon = props.showExternalLinkIcon === "yes";
const color = props.color;

const LogoBlack = (
  <svg
    width="33"
    height="33"
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="33" height="33" rx="6" fill="url(#paint0_radial_4492_41106)" />
    <rect width="33" height="33" rx="6" fill="black" />
    <g>
      <path
        d="M21.4957 17.9189C21.2946 17.9189 21.1065 17.9962 20.9662 18.1366L18.1362 20.9666C17.8442 21.2585 17.8442 21.7337 18.1361 22.0257L19.5801 23.4699C19.7203 23.6103 19.9084 23.6875 20.1095 23.6875C20.3106 23.6875 20.4987 23.6103 20.6389 23.4699L23.4694 20.6394C23.6096 20.4989 23.687 20.3109 23.687 20.1097C23.687 19.9086 23.6096 19.7206 23.4694 19.5803L22.0253 18.1365C21.8849 17.9962 21.6969 17.9189 21.4957 17.9189ZM20.1095 24.9999C19.5578 24.9999 19.0401 24.7861 18.652 24.3978L17.208 22.9536C16.4046 22.1499 16.4046 20.8422 17.2083 20.0385L20.0382 17.2085C20.4263 16.8204 20.9441 16.6065 21.4957 16.6065C22.0473 16.6065 22.5649 16.8203 22.9531 17.2084L24.3973 18.6523C24.7856 19.0404 24.9993 19.558 24.9993 20.1097C24.9993 20.6614 24.7857 21.179 24.3975 21.5672L21.5669 24.3978C21.1787 24.7861 20.6611 24.9999 20.1095 24.9999Z"
        fill="#F9F9F9"
      />
      <path
        d="M11.5034 17.9189C11.3022 17.9189 11.1141 17.9962 10.9738 18.1365L9.52996 19.5803C9.38955 19.7206 9.31234 19.9086 9.31234 20.1097C9.31226 20.3109 9.38955 20.4989 9.52996 20.6394L12.3603 23.4699C12.5007 23.6103 12.6887 23.6875 12.8898 23.6875C13.0909 23.6875 13.279 23.6103 13.4194 23.4698L14.8638 22.0256C15.004 21.8853 15.0814 21.6972 15.0814 21.4961C15.0814 21.2951 15.004 21.107 14.8637 20.9667L12.0331 18.1365C11.8926 17.9962 11.7046 17.9189 11.5034 17.9189ZM12.8898 24.9999C12.3382 24.9999 11.8205 24.7861 11.4324 24.3978L8.60191 21.5672C8.21375 21.179 8 20.6614 8 20.1097C8 19.558 8.21387 19.0404 8.60212 18.6523L10.0458 17.2084C10.4341 16.8203 10.9517 16.6065 11.5034 16.6065C12.055 16.6065 12.5726 16.8203 12.9608 17.2084L15.7915 20.0386C16.1798 20.4269 16.3937 20.9444 16.3938 21.4961C16.3938 22.0478 16.1799 22.5654 15.7918 22.9537L14.3472 24.3978C13.9591 24.7861 13.4415 24.9999 12.8898 24.9999Z"
        fill="#F9F9F9"
      />
      <path
        d="M12.8898 9.31245C12.6887 9.31245 12.5007 9.38971 12.3604 9.53005L9.52984 12.3607C9.38955 12.5011 9.31226 12.689 9.31226 12.8902C9.31226 13.0914 9.38955 13.2794 9.52996 13.4198L10.9738 14.8637C11.1141 15.004 11.3022 15.0813 11.5034 15.0813C11.7045 15.0813 11.8925 15.0039 12.0328 14.8637L14.8632 12.0329C15.1552 11.741 15.1551 11.2659 14.8632 10.9739L13.4194 9.53005C13.279 9.38971 13.0909 9.31245 12.8898 9.31245ZM11.5034 16.3937C10.9517 16.3937 10.4341 16.1799 10.0459 15.7918L8.60199 14.3477C8.21375 13.9595 8 13.4419 8 12.8902C7.99988 12.3386 8.21375 11.821 8.60191 11.4328L11.4324 8.60209C11.8205 8.21387 12.3382 8 12.8898 8C13.4415 8 13.9591 8.21387 14.3473 8.60209L15.7911 10.0459C16.5947 10.8496 16.5948 12.1572 15.7912 12.9609L12.9608 15.7917C12.5726 16.1798 12.055 16.3937 11.5034 16.3937Z"
        fill="#F9F9F9"
      />
      <path
        d="M20.1096 9.31245C19.9084 9.31245 19.7203 9.38971 19.5801 9.53005L18.1362 10.9742C17.9958 11.1146 17.9185 11.3026 17.9185 11.5037C17.9185 11.7048 17.9958 11.8929 18.1362 12.0331L20.9665 14.8634C21.1068 15.0037 21.2949 15.0811 21.496 15.0811C21.6971 15.0811 21.8854 15.0037 22.0256 14.8635L23.4698 13.4196C23.6102 13.2792 23.6875 13.0913 23.6875 12.8902C23.6875 12.689 23.6102 12.5012 23.4699 12.3608L20.639 9.53005C20.4986 9.3896 20.3105 9.31245 20.1096 9.31245ZM21.496 16.3933C20.9444 16.3933 20.4267 16.1796 20.0385 15.7914L17.2082 12.9612C16.82 12.573 16.6062 12.0554 16.6062 11.5037C16.6061 10.952 16.82 10.4345 17.2081 10.0463L18.652 8.60209C19.0401 8.21387 19.5578 8 20.1096 8C20.661 8 21.1787 8.21377 21.5669 8.60198L24.3979 11.4328C24.786 11.821 24.9999 12.3386 24.9999 12.8902C24.9997 13.4419 24.7858 13.9595 24.3977 14.3477L22.9534 15.7916C22.5653 16.1796 22.0476 16.3933 21.496 16.3933Z"
        fill="#F9F9F9"
      />
      <path
        d="M12.9958 12.1599C12.5348 12.1599 12.1598 12.535 12.1598 12.9961V20.0038C12.1598 20.4648 12.5348 20.8401 12.9958 20.8401H20.0037C20.4648 20.8401 20.8398 20.4648 20.8398 20.0038V12.9961C20.8398 12.535 20.4648 12.1599 20.0037 12.1599H12.9958ZM20.0037 22.1523H12.9958C11.8112 22.1523 10.8474 21.1885 10.8474 20.0038V12.9961C10.8474 11.8114 11.8112 10.8475 12.9958 10.8475H20.0037C21.1884 10.8475 22.1522 11.8114 22.1522 12.9961V20.0038C22.1522 21.1885 21.1884 22.1523 20.0037 22.1523Z"
        fill="#F9F9F9"
      />
    </g>
    <defs>
      <radialGradient
        id="paint0_radial_4492_41106"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(3.10396 31.203) rotate(-10.568) scale(44.5376)"
      >
        <stop stop-color="#F18337" />
        <stop offset="1" stop-color="#3252EB" />
      </radialGradient>
    </defs>
  </svg>
);

const LogoColor = (
  <svg
    width="33"
    height="33"
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="33" height="33" rx="6" fill="url(#paint0_radial_4492_41132)" />
    <g filter="url(#filter0_d_4492_41132)">
      <path
        d="M21.5064 17.9267C21.3051 17.9267 21.1169 18.0041 20.9765 18.1445L18.1443 20.9768C17.852 21.2689 17.852 21.7444 18.1441 22.0368L19.5893 23.4821C19.7296 23.6225 19.9178 23.6998 20.1191 23.6998C20.3204 23.6998 20.5086 23.6225 20.6489 23.4821L23.4817 20.6493C23.622 20.5087 23.6994 20.3206 23.6994 20.1192C23.6994 19.918 23.622 19.7298 23.4817 19.5894L22.0364 18.1445C21.8959 18.0041 21.7077 17.9267 21.5064 17.9267ZM20.1191 25.0133C19.567 25.0133 19.0489 24.7993 18.6605 24.4106L17.2153 22.9654C16.4113 22.161 16.4113 20.8523 17.2156 20.048L20.0478 17.2157C20.4361 16.8273 20.9543 16.6133 21.5064 16.6133C22.0585 16.6133 22.5764 16.8272 22.9649 17.2156L24.4102 18.6606C24.7988 19.0491 25.0127 19.5671 25.0128 20.1192C25.0128 20.6714 24.7989 21.1893 24.4104 21.5779L21.5776 24.4106C21.1892 24.7993 20.6711 25.0133 20.1191 25.0133Z"
        fill="white"
      />
      <path
        d="M11.5061 17.9267C11.3048 17.9267 11.1166 18.0041 10.9761 18.1445L9.53116 19.5894C9.39064 19.7298 9.31337 19.918 9.31337 20.1192C9.31329 20.3206 9.39064 20.5087 9.53116 20.6493L12.3637 23.4821C12.5042 23.6225 12.6924 23.6998 12.8937 23.6998C13.0949 23.6998 13.2832 23.6225 13.4236 23.482L14.8692 22.0367C15.0095 21.8962 15.087 21.708 15.087 21.5067C15.087 21.3055 15.0095 21.1173 14.8691 20.9769L12.0362 18.1445C11.8957 18.0041 11.7075 17.9267 11.5061 17.9267ZM12.8937 25.0133C12.3416 25.0133 11.8235 24.7993 11.4351 24.4106L8.60239 21.5779C8.21392 21.1893 8 20.6714 8 20.1192C8 19.5671 8.21404 19.0491 8.60259 18.6606L10.0474 17.2156C10.436 16.8272 10.954 16.6133 11.5061 16.6133C12.0582 16.6133 12.5762 16.8272 12.9647 17.2156L15.7976 20.0481C16.1862 20.4366 16.4002 20.9546 16.4004 21.5067C16.4004 22.0588 16.1863 22.5768 15.7979 22.9655L14.3522 24.4107C13.9637 24.7993 13.4457 25.0133 12.8937 25.0133Z"
        fill="white"
      />
      <path
        d="M12.8937 9.31348C12.6924 9.31348 12.5042 9.3908 12.3638 9.53125L9.53104 12.3641C9.39064 12.5046 9.31329 12.6927 9.31329 12.8941C9.31329 13.0954 9.39064 13.2836 9.53116 13.424L10.9762 14.8691C11.1166 15.0095 11.3048 15.0869 11.5061 15.0869C11.7074 15.0869 11.8956 15.0094 12.036 14.8691L14.8686 12.0361C15.1608 11.744 15.1607 11.2684 14.8686 10.9762L13.4236 9.53125C13.2832 9.3908 13.0949 9.31348 12.8937 9.31348ZM11.5061 16.4003C10.954 16.4003 10.436 16.1863 10.0475 15.7979L8.60247 14.3527C8.21392 13.9642 8 13.4462 8 12.8941C7.99988 12.342 8.21392 11.824 8.60239 11.4355L11.4351 8.60256C11.8235 8.21404 12.3416 8 12.8937 8C13.4457 8 13.9637 8.21404 14.3523 8.60256L15.7973 10.0475C16.6015 10.8519 16.6016 12.1604 15.7974 12.9648L12.9647 15.7978C12.5762 16.1862 12.0582 16.4003 11.5061 16.4003Z"
        fill="white"
      />
      <path
        d="M20.1192 9.31348C19.9178 9.31348 19.7296 9.3908 19.5892 9.53125L18.1442 10.9766C18.0037 11.117 17.9263 11.3052 17.9263 11.5065C17.9263 11.7077 18.0037 11.896 18.1442 12.0363L20.9767 14.8688C21.1172 15.0093 21.3054 15.0867 21.5066 15.0867C21.708 15.0867 21.8963 15.0092 22.0367 14.8689L23.482 13.4239C23.6225 13.2834 23.6999 13.0953 23.6999 12.8941C23.6999 12.6927 23.6225 12.5047 23.4821 12.3643L20.649 9.53125C20.5085 9.39069 20.3203 9.31348 20.1192 9.31348ZM21.5066 16.3999C20.9547 16.3999 20.4366 16.186 20.048 15.7976L17.2155 12.9651C16.827 12.5766 16.613 12.0586 16.613 11.5065C16.6129 10.9544 16.827 10.4364 17.2154 10.0479L18.6605 8.60256C19.0489 8.21404 19.567 8 20.1192 8C20.6711 8 21.1892 8.21394 21.5777 8.60246L24.4108 11.4355C24.7992 11.824 25.0133 12.342 25.0133 12.8941C25.0131 13.4462 24.7991 13.9642 24.4106 14.3527L22.9653 15.7977C22.5768 16.186 22.0587 16.3999 21.5066 16.3999Z"
        fill="white"
      />
      <path
        d="M12.9997 12.1631C12.5383 12.1631 12.163 12.5385 12.163 13V20.0133C12.163 20.4746 12.5383 20.8501 12.9997 20.8501H20.0131C20.4745 20.8501 20.8498 20.4746 20.8498 20.0133V13C20.8498 12.5385 20.4745 12.1631 20.0131 12.1631H12.9997ZM20.0131 22.1634H12.9997C11.8141 22.1634 10.8496 21.1989 10.8496 20.0133V13C10.8496 11.8144 11.8141 10.8497 12.9997 10.8497H20.0131C21.1987 10.8497 22.1633 11.8144 22.1633 13V20.0133C22.1633 21.1989 21.1987 22.1634 20.0131 22.1634Z"
        fill="white"
      />
    </g>
    <defs>
      <radialGradient
        id="paint0_radial_4492_41132"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(3.10396 31.203) rotate(-10.568) scale(44.5376)"
      >
        <stop stop-color="#F18337" />
        <stop offset="1" stop-color="#3252EB" />
      </radialGradient>
    </defs>
  </svg>
);
const WhiteLogo = (
  <svg
    width="33"
    height="33"
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.4957 17.9189C21.2946 17.9189 21.1065 17.9962 20.9662 18.1366L18.1362 20.9666C17.8442 21.2585 17.8442 21.7337 18.1361 22.0257L19.5801 23.4699C19.7203 23.6103 19.9084 23.6875 20.1095 23.6875C20.3106 23.6875 20.4987 23.6103 20.6389 23.4699L23.4694 20.6394C23.6096 20.4989 23.687 20.3109 23.687 20.1097C23.687 19.9086 23.6096 19.7206 23.4694 19.5803L22.0253 18.1365C21.8849 17.9962 21.6969 17.9189 21.4957 17.9189ZM20.1095 24.9999C19.5578 24.9999 19.0401 24.7861 18.652 24.3978L17.208 22.9536C16.4046 22.1499 16.4046 20.8422 17.2083 20.0385L20.0382 17.2085C20.4263 16.8204 20.9441 16.6065 21.4957 16.6065C22.0473 16.6065 22.5649 16.8203 22.9531 17.2084L24.3973 18.6523C24.7856 19.0404 24.9993 19.558 24.9993 20.1097C24.9993 20.6614 24.7857 21.179 24.3975 21.5672L21.5669 24.3978C21.1787 24.7861 20.6611 24.9999 20.1095 24.9999Z"
      fill="black"
    />
    <path
      d="M11.5034 17.9189C11.3022 17.9189 11.1141 17.9962 10.9738 18.1365L9.52996 19.5803C9.38955 19.7206 9.31234 19.9086 9.31234 20.1097C9.31226 20.3109 9.38955 20.4989 9.52996 20.6394L12.3603 23.4699C12.5007 23.6103 12.6887 23.6875 12.8898 23.6875C13.0909 23.6875 13.279 23.6103 13.4194 23.4698L14.8638 22.0256C15.004 21.8853 15.0814 21.6972 15.0814 21.4961C15.0814 21.2951 15.004 21.107 14.8637 20.9667L12.0331 18.1365C11.8926 17.9962 11.7046 17.9189 11.5034 17.9189ZM12.8898 24.9999C12.3382 24.9999 11.8205 24.7861 11.4324 24.3978L8.60191 21.5672C8.21375 21.179 8 20.6614 8 20.1097C8 19.558 8.21387 19.0404 8.60212 18.6523L10.0458 17.2084C10.4341 16.8203 10.9517 16.6065 11.5034 16.6065C12.055 16.6065 12.5726 16.8203 12.9608 17.2084L15.7915 20.0386C16.1798 20.4269 16.3937 20.9444 16.3938 21.4961C16.3938 22.0478 16.1799 22.5654 15.7918 22.9537L14.3472 24.3978C13.9591 24.7861 13.4415 24.9999 12.8898 24.9999Z"
      fill="black"
    />
    <path
      d="M12.8898 9.31245C12.6887 9.31245 12.5007 9.38971 12.3604 9.53005L9.52984 12.3607C9.38955 12.5011 9.31226 12.689 9.31226 12.8902C9.31226 13.0914 9.38955 13.2794 9.52996 13.4198L10.9738 14.8637C11.1141 15.004 11.3022 15.0813 11.5034 15.0813C11.7045 15.0813 11.8925 15.0039 12.0328 14.8637L14.8632 12.0329C15.1552 11.741 15.1551 11.2659 14.8632 10.9739L13.4194 9.53005C13.279 9.38971 13.0909 9.31245 12.8898 9.31245ZM11.5034 16.3937C10.9517 16.3937 10.4341 16.1799 10.0459 15.7918L8.60199 14.3477C8.21375 13.9595 8 13.4419 8 12.8902C7.99988 12.3386 8.21375 11.821 8.60191 11.4328L11.4324 8.60209C11.8205 8.21387 12.3382 8 12.8898 8C13.4415 8 13.9591 8.21387 14.3473 8.60209L15.7911 10.0459C16.5947 10.8496 16.5948 12.1572 15.7912 12.9609L12.9608 15.7917C12.5726 16.1798 12.055 16.3937 11.5034 16.3937Z"
      fill="black"
    />
    <path
      d="M20.1096 9.31245C19.9084 9.31245 19.7203 9.38971 19.5801 9.53005L18.1362 10.9742C17.9958 11.1146 17.9185 11.3026 17.9185 11.5037C17.9185 11.7048 17.9958 11.8929 18.1362 12.0331L20.9665 14.8634C21.1068 15.0037 21.2949 15.0811 21.496 15.0811C21.6971 15.0811 21.8854 15.0037 22.0256 14.8635L23.4698 13.4196C23.6102 13.2792 23.6875 13.0913 23.6875 12.8902C23.6875 12.689 23.6102 12.5012 23.4699 12.3608L20.639 9.53005C20.4986 9.3896 20.3105 9.31245 20.1096 9.31245ZM21.496 16.3933C20.9444 16.3933 20.4267 16.1796 20.0385 15.7914L17.2082 12.9612C16.82 12.573 16.6062 12.0554 16.6062 11.5037C16.6061 10.952 16.82 10.4345 17.2081 10.0463L18.652 8.60209C19.0401 8.21387 19.5578 8 20.1096 8C20.661 8 21.1787 8.21377 21.5669 8.60198L24.3979 11.4328C24.786 11.821 24.9999 12.3386 24.9999 12.8902C24.9997 13.4419 24.7858 13.9595 24.3977 14.3477L22.9534 15.7916C22.5653 16.1796 22.0476 16.3933 21.496 16.3933Z"
      fill="black"
    />
    <path
      d="M12.9958 12.1599C12.5348 12.1599 12.1598 12.535 12.1598 12.9961V20.0038C12.1598 20.4648 12.5348 20.8401 12.9958 20.8401H20.0037C20.4648 20.8401 20.8398 20.4648 20.8398 20.0038V12.9961C20.8398 12.535 20.4648 12.1599 20.0037 12.1599H12.9958ZM20.0037 22.1523H12.9958C11.8112 22.1523 10.8474 21.1885 10.8474 20.0038V12.9961C10.8474 11.8114 11.8112 10.8475 12.9958 10.8475H20.0037C21.1884 10.8475 22.1522 11.8114 22.1522 12.9961V20.0038C22.1522 21.1885 21.1884 22.1523 20.0037 22.1523Z"
      fill="black"
    />
  </svg>
);

const ExtenalLinkIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.89995 0.699997C7.40289 0.699997 6.99995 1.10294 6.99995 1.6C6.99995 2.09705 7.40289 2.5 7.89995 2.5H10.2272L4.56356 8.1636C4.21208 8.51507 4.21208 9.08492 4.56356 9.43639C4.91503 9.78787 5.48488 9.78787 5.83635 9.43639L11.5 3.77279V6.1C11.5 6.59705 11.9029 7 12.4 7C12.897 7 13.3 6.59705 13.3 6.1V1.6C13.3 1.10294 12.897 0.699997 12.4 0.699997H7.89995Z"
      fill="#111827"
    />
    <path
      d="M2.49995 2.5C1.50584 2.5 0.699951 3.30588 0.699951 4.3V11.5C0.699951 12.4941 1.50584 13.3 2.49995 13.3H9.69995C10.6941 13.3 11.5 12.4941 11.5 11.5V8.8C11.5 8.30294 11.097 7.9 10.6 7.9C10.1029 7.9 9.69995 8.30294 9.69995 8.8V11.5H2.49995V4.3L5.19995 4.3C5.69701 4.3 6.09995 3.89705 6.09995 3.4C6.09995 2.90294 5.69701 2.5 5.19995 2.5H2.49995Z"
      fill="#111827"
    />
  </svg>
);

const GRAY_COLOR = "hsla(0, 0%, 88%, 1)";
const GREEN_COLOR = "hsla(131, 54%, 40%, 1)";

return (
  <div
    id="mailchain"
    style={{
      padding: props.padding,
      margin: props.margin,
    }}
  >
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip id={`tooltip-top`}>
          <strong>Mailchain</strong> is the web3 communication layer. Send and
          receive messages directly between wallets.
        </Tooltip>
      }
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: "36px",
        }}
      >
        {props.symbol !== "none" && (
          <div
            style={{
              height: "34px",
              width: "34px",
              position: "relative",
            }}
          >
            {!["bw", "icon"].includes(props.symbol) && LogoColor}

            {props.symbol === "bw" && LogoBlack}
            {props.symbol === "icon" && WhiteLogo}

            {showRegisteredAddressIndicator && props.symbol && res && (
              <div
                style={{
                  height: "12px",
                  width: "12px",
                  background:
                    res.body.status === "registered" ? GREEN_COLOR : GRAY_COLOR,
                  position: "absolute",
                  right: props.symbol === "icon" ? "2px" : "-4px",
                  bottom: props.symbol === "icon" ? "2px" : "-4px",
                  borderRadius: "12px",
                  border: "white solid 2px",
                }}
              />
            )}
          </div>
        )}
        {props.symbol !== "icon" && <>&nbsp; &nbsp;</>}
        <a
          href={mailchainUrl}
          style={{
            textDecoration: linkunderline ? "underline" : "none",
            color,
          }}
          target="_blank"
        >
          Send a web3 email to {props.accountId}
          {showExternalLinkIcon && ExtenalLinkIcon}
        </a>
      </div>
    </OverlayTrigger>
  </div>
);
