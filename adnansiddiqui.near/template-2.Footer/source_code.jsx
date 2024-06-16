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
  logoSrc: "https://ipfs.near.social/ipfs/bafkreiejbuzfn6ybqcbh7lzkkhm52mx3xzc7mukyeexhn6pzlkh5abbpj4",
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

const FooterImageLight = styled.img`
  height: 4rem;
  display: none;
  &:not(.light *) {
    display: inline-block;
  }
`;

const FooterImageDark = styled.img`
  height: 4rem;
  display: inline-block;
  &:not(.light *) {
    display: none;
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

const defaultLogoSrc =
  "https://ipfs.near.social/ipfs/bafkreiejbuzfn6ybqcbh7lzkkhm52mx3xzc7mukyeexhn6pzlkh5abbpj4";

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
          {props?.logoSrc === defaultLogoSrc ? (
            <>
              <FooterImageLight
                src="https://ipfs.near.social/ipfs/bafkreiewklbhmy27lrztstcxbuhcasnmmff5r7kjki5pthxmdqkidmwue4"
                alt="logo"
              />
              <FooterImageDark
                src="https://ipfs.near.social/ipfs/bafkreiejbuzfn6ybqcbh7lzkkhm52mx3xzc7mukyeexhn6pzlkh5abbpj4"
                alt="logo"
              />
            </>
          ) : (
            <img
              style={{ height: "4rem" }}
              src={props?.logoSrc}
              alt="company logo"
            />
          )}
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
