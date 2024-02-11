/* -------------------------------------------------------------------------- */
/*
 __        ___           __                               
 \ \      / (_)_ __ ___ / _|_ __ __ _ _ __ ___   ___  ___ 
  \ \ /\ / /| | '__/ _ \ |_| '__/ _` | '_ ` _ \ / _ \/ __|
   \ V  V / | | | |  __/  _| | | (_| | | | | | |  __/\__ \
    \_/\_/  |_|_|  \___|_| |_|  \__,_|_| |_| |_|\___||___/

  =========================================================
  * Wireframes - v1.0.0
  =========================================================
  * Product Page: https://wireframes.design
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

                                                                                 */

/* -------------------------------------------------------------------------- */

                          
const SocialLinks = styled.ul`
  display: flex;
  justify-content: center;
  align-items: stretch;
  color: white;
  gap: 2rem;
  flex-wrap: wrap;
  font-size: 1.5rem;
  line-height: 1.5;
  list-style: none;

  & > li {
    height: 1.5rem;

    & > a {
      height: 100%;
      width: auto;
      position: relative;
      color: inherit;
      text-decoration: none;
      transition: color 0.5s ease-in-out;

      &:hover {
        color: #a7a7a7;
        text-decoration: none;
      }

      & > svg {
        height: 100%;
      }
    }
  }
`;

const social = (
  <SocialLinks>
    <li
      id="menu-item-13396"
      class="no-auto-link menu-item menu-item-type-custom menu-item-object-custom menu-item-13396"
    >
      <a
        title="Official GitHub Repo"
        target="_blank"
        rel="wireframes-design"
        href="https://github.com/wireframes-design"
      >
        <Widget
            src="v1.wireframes.near/widget/Components.Icon.BoostrapIcons"
            props={{
                iconName:"github"
            }
            }
          />
      </a>
    </li>
</SocialLinks>
);

const Legal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  gap: 1rem;

  & > span.separator {
    display: inline-block;
    height: 1.5rem;
    width: 1px;
    background-color: #d1d1d1;
    margin: 0;
    padding: 0;
  }

  & > a {
    color: inherit;
    text-decoration: none;
    margin: 0;
    padding: 0;
    transition: color 0.5s ease-in-out;

    &:hover {
      color: #676767;
      text-decoration: none;
    }
  }
`;

const links = (
  <Legal>
    <a href="mailto:info@wireframes.design"><small>info@wireframes.design</small></a>
    <span className="separator"></span>
    <span><small>Copyright © 2024 Wireframes All Rights Reserved.</small></span>
  </Legal>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 2rem 0;
  background-color: black;
`;

return (
  <Container>
    {social}
    {links}
  </Container>
);