const style = props.style || {
  paddingTop: 0,
  paddingLeft: 0,
  paddingBottom: 0,
  paddingRight: 0,
  marginTop: 0,
  marginLeft: 0,
  marginBottom: 0,
  marginRight: 0,
  accent: "#0d9488",
};
const props = props.props || {
  legal: [
    {
      name: "Privacy Policy",
      link: "#",
    },
    {
      name: "Terms and Conditions",
      link: "#",
    },
    {
      name: "Cookies Policy",
      link: "#",
    },
    {
      name: "Disclaimer",
      link: "#",
    },
    {
      name: "Refund Policy",
      link: "#",
    },
  ],
  service: [
    {
      name: "FAQ",
      link: "#",
    },
    {
      name: "Contact Us",
      link: "#",
    },
    {
      name: "Support",
      link: "#",
    },
    {
      name: "Live Chat",
      link: "#",
    },
    {
      name: "Community Forum",
      link: "#",
    },
  ],
  information: [
    {
      name: "Company Info",
      link: "#",
    },
    {
      name: "Careers",
      link: "#",
    },
    {
      name: "Press",
      link: "#",
    },
    {
      name: "Our Team",
      link: "#",
    },
    {
      name: "Blog",
      link: "#",
    },
  ],
  copyRight: "2023 Bike Showroom. All Rights Reserved.",
};

const bp = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
};

const socialIcons = [
  {
    icon: "https://ipfs.near.social/ipfs/bafkreibyvzdqfnvsy7laykskljbyiscrr5egcygczroc5lvs3jeniz7ope",
    href: "https://www.linkedin.com/tryjutsu",
  },
  {
    icon: "https://ipfs.near.social/ipfs/bafkreiccsolmo2epnwlzjqufn4w2hy4pr7fg7blfldcyhyebwujidqzsz4",
    href: "https://github.com/tryjutsu",
  },
  {
    icon: "https://ipfs.near.social/ipfs/bafkreie3unrm66pdzno3peuuahfcpk6ot37gahby2larq5vkqmwaswg6ry",
    href: "https://twitter.com/tryjutsu",
  },
  {
    icon: "https://ipfs.near.social/ipfs/bafkreigiw3z7tf2szzuegrmvuybmamun5a6arg7lzsiqwaektvgp7osarq",
    href: "https://www.youtube.com/tryjutsu",
  },
  {
    icon: "https://ipfs.near.social/ipfs/bafkreig44t4oajrwl6deaurchsincm7zhjr6tgwoo23vfmm2phkrvja6hy",
    href: "https://www.facebook.com/tryjutsu",
  },
];

const FooterWrapper = styled.div`
  padding: ${({ style }) =>
    `${style?.paddingTop}px ${style?.paddingRight}px ${style?.paddingBottom}px ${style?.paddingLeft}px`};
  margin: ${({ style }) =>
    `${style?.marginTop}px ${style?.marginRight}px ${style?.marginBottom}px ${style?.marginLeft}px`};

  background-color: white;
  &:not(.light *) {
    background-color: #080a11;
  }
`;
const FooterContent = styled.div`
  padding: 6rem 1rem;
  width: 100%;
  margin-inline: auto;

  @media (min-width: ${bp.md}) {
    padding-left: 3rem;
    padding-right: 3rem;
  }
`;
const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  width: 100%;
  text-align: center;
  color: rgb(55 65 81);
  font-size: 0.875rem;
  line-height: 1.25rem;
  gap: 2rem;

  &:not(.light *) {
    color: rgb(209 213 219);
  }

  @media (min-width: ${bp.sm}) {
    text-align: left;
  }
`;

const FooterImage = styled.svg`
  max-width: 9rem;
  height: fit-content;
  fill: black;
  margin-left: 0.5rem;

  &:not(.light *) {
    fill: white;
  }
`;

const FooterIcons = styled.div`
  display: flex;
  color: black;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;

  &:not(.light *) {
    color: white;
  }
`;

const FooterIconsLink = styled.a`
  border-radius: 9999px;
  aspect-ratio: 1 / 1;
  width: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:not(.light *) {
    & img {
      filter: invert(1);
    }
  }
`;

const FooterLink = styled.a`
  color: black;

  &:not(.light *) {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const FooterBottom = styled.div`
  max-width: 100%;
  margin-inline: auto;
  padding: 1.5rem;
  border-top: 1px solid;
  border-color: #080a1120;

  &:not(.light *) {
    border-color: #080a11;
  }
`;
const FooterBottomContent = styled.p`
  color: #4b5563; /* text-gray-600 */
  font-size: 0.75rem; /* text-xs */
  text-align: center;
  &:not(.light *) {
    color: rgb(209 213 219);
  }
`;

return (
  <FooterWrapper id={id} style={style} props={props}>
    <FooterContent>
      <FooterGrid>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: 0.8,
          }}
        >
          <FooterImage
            width="517"
            height="173"
            viewBox="0 0 517 173"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M130.516 35.8742V99.9947C130.516 111.885 137.028 118.891 148.564 118.891C160.1 118.891 166.54 111.885 166.54 99.9947V35.8742H192.514V102.755C192.514 125.685 175.104 140.76 148.564 140.76C122.024 140.76 104.543 125.685 104.543 102.755V35.8742H130.516ZM266.472 138H240.569V56.7523H211.127V35.8742H295.984V56.7523H266.472V138ZM310.068 108.912H334.839C335.476 116.343 342.907 121.085 353.665 121.085C363.361 121.085 370.013 116.414 370.013 109.691C370.013 104.029 365.555 100.986 353.877 98.6501L340.43 95.9607C321.746 92.422 312.121 82.2307 312.121 66.1651C312.121 46.2071 328.115 33.114 352.745 33.114C376.666 33.114 393.227 46.0655 393.652 64.962H369.659C369.093 57.7431 362.228 52.7182 353.098 52.7182C343.969 52.7182 337.953 57.0354 337.953 63.8296C337.953 69.4207 342.482 72.6763 353.24 74.7995L366.404 77.3473C386.574 81.2398 395.633 90.3696 395.633 106.577C395.633 127.879 379.355 140.76 352.603 140.76C326.771 140.76 310.493 128.587 310.068 108.912ZM441.353 35.8742V99.9947C441.353 111.885 447.864 118.891 459.4 118.891C470.936 118.891 477.376 111.885 477.376 99.9947V35.8742H503.35V102.755C503.35 125.685 485.94 140.76 459.4 140.76C432.86 140.76 415.379 125.685 415.379 102.755V35.8742H441.353Z" />
            <path d="M0 57.627V35.8418H83.0678V99.303C83.0678 122.984 63.7154 140.842 41.2971 140.842C17.7083 140.842 0 121.148 0 99.303V83.3903H21.7852V99.303C21.7852 111.003 31.588 119.054 41.2971 119.054C52.4085 119.054 61.2827 110.326 61.2827 99.303V57.627H0Z" />
            <circle cx="10.8919" cy="70.6034" r="7.2933" fill="#FFD37C" />
          </FooterImage>
          <FooterIcons>
            {socialIcons.map((item, index) => (
              <FooterIconsLink key={index} href={item.href}>
                <img src={item.icon} alt="logo" />
              </FooterIconsLink>
            ))}
          </FooterIcons>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingInline: "1rem",
            gap: "1rem",
            textAlign: "center",
          }}
        >
          {props?.legal?.map((item, index) => (
            <FooterLink key={index} href={item.link}>
              {item.name}
            </FooterLink>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingInline: "1rem",
            gap: "1rem",
            textAlign: "center",
          }}
        >
          {props?.service?.map((item, index) => (
            <FooterLink key={index} href={item.link}>
              {item.name}
            </FooterLink>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingInline: "1rem",
            gap: "1rem",
            textAlign: "center",
          }}
        >
          {props?.information?.map((item, index) => (
            <FooterLink key={index} href={item.link}>
              {item.name}
            </FooterLink>
          ))}
        </div>
      </FooterGrid>
    </FooterContent>
    <FooterBottom>
      <FooterBottomContent>{props?.copyRight}</FooterBottomContent>
    </FooterBottom>
  </FooterWrapper>
);
