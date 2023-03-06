const links = props.links;

const supportedLinks = [
  { name: "github", url: "https://github.com/", icon: "bi-github" },
  { name: "discord", url: "https://discord.com/", icon: "bi-discord" },
  { name: "reddit", url: "https://reddit.com/u/", icon: "bi-reddit" },
  { name: "twitter", url: "https://twitter.com/", icon: "bi-twitter" },
  { name: "youtube", url: "https://youtube.com/", icon: "bi-youtube" },
  { name: "website", url: "https://", icon: "bi-globe2" },
];

const SocialItem = styled.li`
  padding: 0.5em;
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
`;

return <List>{linksList}</List>;
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_737_23898)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C5.3724 0 0 5.3808 0 12.0204C0 17.3304 3.438 21.8364 8.2068 23.4252C8.8068 23.5356 9.0252 23.1648 9.0252 22.8456C9.0252 22.5612 9.0156 21.804 9.0096 20.802C5.6712 21.528 4.9668 19.1904 4.9668 19.1904C4.422 17.8008 3.6348 17.4312 3.6348 17.4312C2.5452 16.6872 3.7176 16.7016 3.7176 16.7016C4.9212 16.7856 5.5548 17.94 5.5548 17.94C6.6252 19.776 8.364 19.2456 9.0468 18.9384C9.1572 18.162 9.4668 17.6328 9.81 17.3328C7.146 17.0292 4.344 15.9972 4.344 11.3916C4.344 10.08 4.812 9.006 5.5788 8.166C5.4552 7.8624 5.0436 6.6396 5.6964 4.986C5.6964 4.986 6.7044 4.662 8.9964 6.2172C9.97532 5.95022 10.9853 5.81423 12 5.8128C13.02 5.8176 14.046 5.9508 15.0048 6.2172C17.2956 4.662 18.3012 4.9848 18.3012 4.9848C18.9564 6.6396 18.5436 7.8624 18.4212 8.166C19.1892 9.006 19.6548 10.08 19.6548 11.3916C19.6548 16.0092 16.848 17.0256 14.1756 17.3232C14.6064 17.694 14.9892 18.4272 14.9892 19.5492C14.9892 21.1548 14.9748 22.452 14.9748 22.8456C14.9748 23.1672 15.1908 23.5416 15.8004 23.424C18.19 22.6225 20.2672 21.0904 21.7386 19.0441C23.2099 16.9977 24.001 14.5408 24 12.0204C24 5.3808 18.6264 0 12 0Z" fill="#98A2B3"/>
</g>
<defs>
<clipPath id="clip0_737_23898">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
