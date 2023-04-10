const links = props.links;

const supportedLinks = [
  {
    name: "github",
    url: "https://github.com/",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_737_23898)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 0C5.3724 0 0 5.3808 0 12.0204C0 17.3304 3.438 21.8364 8.2068 23.4252C8.8068 23.5356 9.0252 23.1648 9.0252 22.8456C9.0252 22.5612 9.0156 21.804 9.0096 20.802C5.6712 21.528 4.9668 19.1904 4.9668 19.1904C4.422 17.8008 3.6348 17.4312 3.6348 17.4312C2.5452 16.6872 3.7176 16.7016 3.7176 16.7016C4.9212 16.7856 5.5548 17.94 5.5548 17.94C6.6252 19.776 8.364 19.2456 9.0468 18.9384C9.1572 18.162 9.4668 17.6328 9.81 17.3328C7.146 17.0292 4.344 15.9972 4.344 11.3916C4.344 10.08 4.812 9.006 5.5788 8.166C5.4552 7.8624 5.0436 6.6396 5.6964 4.986C5.6964 4.986 6.7044 4.662 8.9964 6.2172C9.97532 5.95022 10.9853 5.81423 12 5.8128C13.02 5.8176 14.046 5.9508 15.0048 6.2172C17.2956 4.662 18.3012 4.9848 18.3012 4.9848C18.9564 6.6396 18.5436 7.8624 18.4212 8.166C19.1892 9.006 19.6548 10.08 19.6548 11.3916C19.6548 16.0092 16.848 17.0256 14.1756 17.3232C14.6064 17.694 14.9892 18.4272 14.9892 19.5492C14.9892 21.1548 14.9748 22.452 14.9748 22.8456C14.9748 23.1672 15.1908 23.5416 15.8004 23.424C18.19 22.6225 20.2672 21.0904 21.7386 19.0441C23.2099 16.9977 24.001 14.5408 24 12.0204C24 5.3808 18.6264 0 12 0Z"
            fill="#98A2B3"
          />
        </g>
        <defs>
          <clipPath id="clip0_737_23898">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    name: "discord",
    url: "https://discord.com/",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.88806 10.0679C9.20406 10.0679 8.66406 10.6679 8.66406 11.3999C8.66406 12.1319 9.21606 12.7319 9.88806 12.7319C10.5721 12.7319 11.1121 12.1319 11.1121 11.3999C11.1241 10.6679 10.5721 10.0679 9.88806 10.0679ZM14.2681 10.0679C13.5841 10.0679 13.0441 10.6679 13.0441 11.3999C13.0441 12.1319 13.5961 12.7319 14.2681 12.7319C14.9521 12.7319 15.4921 12.1319 15.4921 11.3999C15.4921 10.6679 14.9521 10.0679 14.2681 10.0679Z"
          fill="#98A2B3"
        />
        <path
          d="M20.1001 0H4.02006C2.66406 0 1.56006 1.104 1.56006 2.472V18.696C1.56006 20.064 2.66406 21.168 4.02006 21.168H17.6281L16.9921 18.948L18.5281 20.376L19.9801 21.72L22.5601 24V2.472C22.5601 1.104 21.4561 0 20.1001 0ZM15.4681 15.672C15.4681 15.672 15.0361 15.156 14.6761 14.7C16.2481 14.256 16.8481 13.272 16.8481 13.272C16.3561 13.596 15.8881 13.824 15.4681 13.98C14.8681 14.232 14.2921 14.4 13.7281 14.496C12.5761 14.712 11.5201 14.652 10.6201 14.484C9.93606 14.352 9.34806 14.16 8.85606 13.968C8.58006 13.86 8.28006 13.728 7.98006 13.56C7.94406 13.536 7.90806 13.524 7.87206 13.5C7.84806 13.488 7.83606 13.476 7.82406 13.464C7.60806 13.344 7.48806 13.26 7.48806 13.26C7.48806 13.26 8.06406 14.22 9.58806 14.676C9.22806 15.132 8.78406 15.672 8.78406 15.672C6.13206 15.588 5.12406 13.848 5.12406 13.848C5.12406 9.984 6.85206 6.852 6.85206 6.852C8.58006 5.556 10.2241 5.592 10.2241 5.592L10.3441 5.736C8.18406 6.36 7.18806 7.308 7.18806 7.308C7.18806 7.308 7.45206 7.164 7.89606 6.96C9.18006 6.396 10.2001 6.24 10.6201 6.204C10.6921 6.192 10.7521 6.18 10.8241 6.18C11.5561 6.084 12.3841 6.06 13.2481 6.156C14.3881 6.288 15.6121 6.624 16.8601 7.308C16.8601 7.308 15.9121 6.408 13.8721 5.784L14.0401 5.592C14.0401 5.592 15.6841 5.556 17.4121 6.852C17.4121 6.852 19.1401 9.984 19.1401 13.848C19.1401 13.848 18.1201 15.588 15.4681 15.672Z"
          fill="#98A2B3"
        />
      </svg>
    ),
  },
  {
    name: "reddit",
    url: "https://reddit.com/u/",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM18.2456 10.2456C19.214 10.2456 20 11.0316 20 12C20 12.7158 19.5649 13.3333 18.9895 13.614C19.0175 13.7824 19.0316 13.9509 19.0316 14.1333C19.0316 16.828 15.9018 19.0035 12.0281 19.0035C8.15439 19.0035 5.02457 16.828 5.02457 14.1333C5.02457 13.9509 5.0386 13.7684 5.06667 13.6C4.44913 13.3193 4.02808 12.7158 4.02808 12C4.02808 11.0316 4.81404 10.2456 5.78246 10.2456C6.24562 10.2456 6.68071 10.4421 6.98948 10.7368C8.1965 9.85261 9.86667 9.30524 11.7333 9.2491L12.6176 5.06664C12.6456 4.98243 12.6877 4.91226 12.7579 4.87015C12.8281 4.82805 12.9123 4.81401 12.9965 4.82805L15.9018 5.44559C16.0983 5.02454 16.5193 4.74384 17.0105 4.74384C17.6983 4.74384 18.2597 5.30524 18.2597 5.99296C18.2597 6.68068 17.6983 7.24208 17.0105 7.24208C16.3368 7.24208 15.7895 6.70875 15.7614 6.0491L13.1649 5.50173L12.3649 9.2491C14.1895 9.31927 15.8456 9.88068 17.0386 10.7368C17.3474 10.428 17.7684 10.2456 18.2456 10.2456ZM9.24913 12C8.56141 12 8.00001 12.5614 8.00001 13.2491C8.00001 13.9368 8.56141 14.4982 9.24913 14.4982C9.93685 14.4982 10.4983 13.9368 10.4983 13.2491C10.4983 12.5614 9.93685 12 9.24913 12ZM12.014 17.4596C12.4912 17.4596 14.1193 17.4035 14.9754 16.5473C15.1018 16.421 15.1018 16.2245 15.0035 16.0842C14.8772 15.9579 14.6667 15.9579 14.5404 16.0842C13.993 16.6175 12.8561 16.814 12.0281 16.814C11.2 16.814 10.0491 16.6175 9.5158 16.0842C9.38948 15.9579 9.17895 15.9579 9.05264 16.0842C8.92632 16.2105 8.92632 16.421 9.05264 16.5473C9.89474 17.3895 11.5368 17.4596 12.014 17.4596ZM13.5018 13.2491C13.5018 13.9368 14.0632 14.4982 14.7509 14.4982C15.4386 14.4982 16 13.9368 16 13.2491C16 12.5614 15.4386 12 14.7509 12C14.0632 12 13.5018 12.5614 13.5018 13.2491Z"
          fill="#98A2B3"
        />
      </svg>
    ),
  },
  {
    name: "twitter",
    url: "https://twitter.com/",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.55016 21.75C16.6045 21.75 21.5583 14.2467 21.5583 7.74186C21.5583 7.53092 21.5536 7.3153 21.5442 7.10436C22.5079 6.40746 23.3395 5.54425 24 4.5553C23.1025 4.9546 22.1496 5.21538 21.1739 5.32874C22.2013 4.71291 22.9705 3.74547 23.3391 2.60577C22.3726 3.17856 21.3156 3.58261 20.2134 3.80061C19.4708 3.01156 18.489 2.48912 17.4197 2.31405C16.3504 2.13899 15.2532 2.32105 14.2977 2.8321C13.3423 3.34314 12.5818 4.15471 12.1338 5.14131C11.6859 6.12792 11.5754 7.23462 11.8195 8.2903C9.86249 8.19209 7.94794 7.6837 6.19998 6.7981C4.45203 5.91249 2.90969 4.66944 1.67297 3.14952C1.0444 4.23324 0.852057 5.51565 1.13503 6.73609C1.418 7.95654 2.15506 9.02345 3.19641 9.71999C2.41463 9.69517 1.64998 9.48468 0.965625 9.10592V9.16686C0.964925 10.3041 1.3581 11.4066 2.07831 12.2868C2.79852 13.167 3.80132 13.7706 4.91625 13.995C4.19206 14.1931 3.43198 14.222 2.69484 14.0794C3.00945 15.0574 3.62157 15.9129 4.44577 16.5263C5.26997 17.1398 6.26512 17.4806 7.29234 17.5012C5.54842 18.8711 3.39417 19.6141 1.17656 19.6106C0.783287 19.61 0.390399 19.5859 0 19.5384C2.25286 20.9837 4.87353 21.7514 7.55016 21.75Z"
          fill="#98A2B3"
        />
      </svg>
    ),
  },
  {
    name: "youtube",
    url: "https://youtube.com/",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.7609 7.20005C23.7609 7.20005 23.5266 5.54536 22.8047 4.8188C21.8906 3.86255 20.8688 3.85786 20.4 3.80161C17.0438 3.55786 12.0047 3.55786 12.0047 3.55786H11.9953C11.9953 3.55786 6.95625 3.55786 3.6 3.80161C3.13125 3.85786 2.10938 3.86255 1.19531 4.8188C0.473438 5.54536 0.24375 7.20005 0.24375 7.20005C0.24375 7.20005 0 9.14536 0 11.086V12.9047C0 14.8454 0.239062 16.7907 0.239062 16.7907C0.239062 16.7907 0.473437 18.4454 1.19062 19.1719C2.10469 20.1282 3.30469 20.0954 3.83906 20.1985C5.76094 20.3813 12 20.4375 12 20.4375C12 20.4375 17.0438 20.4282 20.4 20.1891C20.8688 20.1329 21.8906 20.1282 22.8047 19.1719C23.5266 18.4454 23.7609 16.7907 23.7609 16.7907C23.7609 16.7907 24 14.85 24 12.9047V11.086C24 9.14536 23.7609 7.20005 23.7609 7.20005ZM9.52031 15.1125V8.36724L16.0031 11.7516L9.52031 15.1125Z"
          fill="#98A2B3"
        />
      </svg>
    ),
  },
  {
    name: "website",
    url: "https://",
    icon: (
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 32 32"
        enable-background="new 0 0 32 32"
      >
        <g>
          <path
            fill="#808184"
            d="M0.034,16.668C0.388,25.179,7.403,32,16,32s15.612-6.821,15.966-15.332C31.985,16.615,32,16.56,32,16.5
		           c0-0.036-0.013-0.067-0.02-0.1C31.983,16.266,32,16.135,32,16c0-8.822-7.178-16-16-16S0,7.178,0,16c0,0.135,0.017,0.266,0.02,0.4
		           C0.013,16.433,0,16.464,0,16.5C0,16.56,0.015,16.615,0.034,16.668z M24.921,22.741c-1.319-0.552-2.735-0.979-4.215-1.271
		           c0.158-1.453,0.251-2.962,0.28-4.47h4.98C25.875,19.055,25.51,20.994,24.921,22.741z M26.965,17h3.984
		           c-0.186,2.806-1.138,5.402-2.662,7.578c-0.759-0.533-1.577-1.018-2.457-1.44C26.474,21.269,26.871,19.196,26.965,17z
		           M12.389,22.286C13.567,22.102,14.776,22,16.001,22c1.224,0,2.432,0.102,3.61,0.286C18.916,27.621,17.4,31,16,31
		           C14.6,31,13.084,27.621,12.389,22.286z M13.908,30.664c-2.751-0.882-5.078-3.471-6.482-6.984c1.246-0.525,2.586-0.935,3.989-1.217
		           C11.875,25.958,12.713,29.005,13.908,30.664z M12.275,10.709C13.491,10.897,14.739,11,16,11c1.261,0,2.509-0.103,3.725-0.291
		           C19.898,12.329,20,14.097,20,16h-8C12,14.097,12.102,12.329,12.275,10.709z M19.985,17c-0.028,1.525-0.118,2.961-0.26,4.291
		           C18.509,21.103,17.262,21,16.001,21c-1.262,0-2.51,0.104-3.726,0.291c-0.141-1.33-0.232-2.766-0.26-4.291H19.985z M20.585,22.463
		           c1.404,0.282,2.743,0.692,3.989,1.217c-1.404,3.513-3.731,6.102-6.482,6.985C19.287,29.005,20.125,25.958,20.585,22.463z M21,16
		           c0-1.836-0.101-3.696-0.294-5.471c1.48-0.292,2.896-0.72,4.215-1.271C25.605,11.288,26,13.574,26,16H21z M20.585,9.537
		           c-0.46-3.496-1.298-6.542-2.492-8.201c2.751,0.882,5.078,3.471,6.482,6.984C23.328,8.845,21.988,9.255,20.585,9.537z M19.611,9.714
		           C18.433,9.898,17.224,10,16,10c-1.224,0-2.433-0.102-3.611-0.286C13.084,4.379,14.6,1,16,1S18.916,4.379,19.611,9.714z
		           M11.415,9.537C10.012,9.256,8.672,8.845,7.426,8.32c1.404-3.513,3.731-6.102,6.482-6.984C12.713,2.995,11.875,6.042,11.415,9.537z
		           M11.294,10.529C11.102,12.304,11,14.164,11,16H6c0-2.426,0.395-4.712,1.079-6.742C8.398,9.81,9.814,10.237,11.294,10.529z
		           M11.014,17c0.029,1.508,0.122,3.017,0.28,4.471c-1.48,0.293-2.896,0.72-4.215,1.271C6.49,20.995,6.125,19.055,6.034,17H11.014z
		           M6.17,23.139c-0.88,0.422-1.697,0.907-2.457,1.44C2.189,22.403,1.237,19.807,1.051,17h3.984C5.129,19.196,5.526,21.27,6.17,23.139
		           z M4.313,25.38c0.685-0.479,1.417-0.921,2.207-1.305c1.004,2.485,2.448,4.548,4.186,5.942C8.18,29.06,5.977,27.45,4.313,25.38z
		           M21.294,30.017c1.738-1.394,3.182-3.458,4.186-5.943c0.79,0.384,1.522,0.826,2.207,1.305C26.023,27.449,23.82,29.06,21.294,30.017
		           z M27,16c0-2.567-0.428-4.987-1.17-7.139c0.88-0.422,1.698-0.907,2.457-1.44C29.991,9.855,31,12.81,31,16H27z M27.688,6.621
		           c-0.685,0.479-1.417,0.921-2.207,1.305c-1.004-2.485-2.449-4.549-4.186-5.943C23.82,2.94,26.023,4.55,27.688,6.621z M10.706,1.983
		           C8.968,3.377,7.524,5.441,6.519,7.926C5.729,7.542,4.997,7.1,4.312,6.62C5.977,4.55,8.18,2.94,10.706,1.983z M3.713,7.421
		           C4.472,7.954,5.29,8.439,6.17,8.861C5.428,11.013,5,13.433,5,16H1C1,12.81,2.009,9.855,3.713,7.421z"
          />
        </g>
      </svg>
    ),
  },
];

const SocialItem = styled.li`
  padding: 0.125em;
`;

const linksList = supportedLinks
  .filter(({ name }) => name in links)
  .map(({ name, url, icon }) => (
    <SocialItem>
      <a href={`${url}${links[name]}`} target="_blank">
        {icon}
      </a>
    </SocialItem>
  ));

const List = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: between;
  align-items: center;
  margin: 0;
  padding: 0;
  gap: .25em;
`;

return <List>{linksList}</List>;
