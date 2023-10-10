const ownerId = "nearcon23.near";

const GridView = styled.div`
  display: grid;
  grid-template-columns: 48% 52%;
  align-items:center;
  @media screen and (max-width: 800px) {
    display:block;
 }
`;

const FinalGridView = styled.div`
  display: grid;
  grid-template-columns: 55% 45%;
  align-items:center;
  @media screen and (max-width: 800px) {
    display:flex;
    flex-direction: column-reverse;
 }
`;

const MobileImage = styled.img`
  display:none;
   @media screen and (max-width: 800px) {
    display:block;
 }
`;

const DesktopImage = styled.img`
    @media screen and (max-width: 800px) {
    display:none;
 }
`;

const ParaInMobile = styled.p`
   @media screen and (max-width: 800px) {
    margin-top:-70px;
 }
`;

const hotels = [
  {
    text: "PortoBay Liberdade",
    link: "https://www.portobay.com/en/hotels/lisbon-hotels/portobay-liberdade/",
  },
  {
    text: "Hotel Tivoli Avenida Liberdade Lisboa",
    link: "https://www.tivolihotels.com/en/tivoli-avenida-liberdade-lisboa?utm_campaign=local-gmb&utm_medium=organic_search&utm_source=google_gmb",
  },
  {
    text: "NH Collection Lisboa Liberdade",
    link: "https://www.nh-hotels.com/en/hotel/nh-collection-lisboa-liberdade?utm_campaign=local-gmb&utm_medium=organic_search&utm_source=google_gmb",
  },
  {
    text: "Sofitel Lisbon Liberdade",
    link: "https://all.accor.com/hotel/1319/index.en.shtml?utm_campaign=seo+maps&utm_medium=seo+maps&utm_source=google+Maps",
  },
  {
    text: "Altis Avenida Hotel",
    link: "https://www.altishotels.com/altis-avenida-hotel/",
  },
  {
    text: "Hapimag Resort Lisbon",
    link: "https://www.hapimag.com/en-gb/portugal/lisbon/lisbon/",
  },
  { text: "138 Liberdade Hotel", link: "https://www.138liberdadehotel.com/" },
  {
    text: "Heritage Avenida Liberdade Boutique Hotel",
    link: "https://lisbonheritagehotels.com/heritage-avenida-liberdade-hotel/?utm_source=Google&utm_medium=Organic&utm_campaign=Google%20Business",
  },
];

const hotels2 = [
  {
    text: "The Myriad",
    link: "https://www.sanahotels.com/pt/hotel/myriad-by-sana/",
  },
  {
    text: "Tivoli Oriente Hotel",
    link: "https://www.tivolihotels.com/en/tivoli-oriente?utm_campaign=local-gmb&utm_medium=organic_search&utm_source=google_gmb",
  },
  {
    text: "Martinhal Lisbon Oriente",
    link: "https://www.martinhal.com/locations/residences/",
  },
  {
    text: "The Homeboat Company Parque das Nações",
    link: "https://thehomeboatcompany.com/",
  },
  { text: "Melia Lisboa Oriente", link: "" },
  {
    text: "Olissippo Oriente Hotel",
    link: "https://www.olissippohotels.com/en/Hotels/Oriente/The-Hotel.aspx",
  },
];

return (
  <div>
   { /* <GridView>
      <MobileImage
        style={{ margin: "auto" }}
        src="https://ipfs.near.social/ipfs/bafkreicnq6ab66u4asm2ctvhjvvqtsfbbgiwnqiqyttgydxom7w4uofshy"
      />
      <div style={{ padding: 30 }}>
        <p style={{ fontSize: 40, fontWeight: "600", lineHeight: "45px" }}>
          Travelling to LISBON <br /> for Nearcon 2023?
        </p>
        <p style={{ fontSize: "20px", paddingTop: 15 }}>
          Travala is offering a $50 credit to those who book travel through the
          site. Terms and conditions apply.
        </p>
        <div style={{ width: 200, paddingTop: 20, marginBottom: 20 }}>
          <Widget src={`${ownerId}/widget/Travel.Button`} />
        </div>
      </div>
      <DesktopImage src="https://ipfs.near.social/ipfs/bafybeiaa7gc5wuifwzbncdeac6gtbswjktkldrfwfze3y2xblagtczortq" />
    </GridView>
    */}
    <GridView
      style={{ backgroundColor: "black", gridTemplateColumns: "45% 55%" }}
    >
      <img
        style={{ width: "100%" }}
        src="https://ipfs.near.social/ipfs/bafkreianhiuajvug5n2radjqyw2wrmdm4yapd75ddloj5twkreleuikdue"
      />
      <div style={{ padding: 30 }}>
        <ParaInMobile
          style={{
            color: "white",
            fontSize: 40,
            fontWeight: "500",
          }}
        >
          AREA 1: The Liberdade
        </ParaInMobile>

        <p style={{ color: "#00EC97", fontWeight: "600", fontSize: 18 }}>
          In the heart of lisbon, a popular area for food,drink and exploring
          the city
        </p>

        <p
          style={{
            color: "#00EC97",
            fontSize: 18,
            marginBottom: 5,
            marginTop: 25,
          }}
        >
          Hotels in the Area
        </p>
        {hotels.map((item) => (
          <a
            style={{
              marginBottom: 2,
              color: "white",
              textDecoration: "underline",
              display: "block",
            }}
            target="_blank"
            href={item.link}
          >
            {item.text}
          </a>
        ))}
      </div>
    </GridView>
    <FinalGridView
      style={{
        backgroundColor: "black",
        gridTemplateColumns: "52% 48%",
        paddingBottom: 30,
      }}
    >
      <div style={{ padding: 30 }}>
        <ParaInMobile
          style={{
            color: "white",
            fontSize: 40,
            fontWeight: "500",
          }}
        >
          AREA 2: The Oriente
        </ParaInMobile>

        <p style={{ color: "#00EC97", fontWeight: "600", fontSize: 18 }}>
          North of lisbon with close proximity to the event venues and close
          access to highways and airport
        </p>

        <p
          style={{
            color: "#00EC97",
            fontSize: 18,
            marginBottom: 5,
            marginTop: 20,
          }}
        >
          Hotels in the Area
        </p>
        {hotels2.map((item) => (
          <a
            style={{
              marginBottom: 2,
              color: "white",
              textDecoration: "underline",
              display: "block",
            }}
            target="_blank"
            href={item.link}
          >
            {item.text}
          </a>
        ))}
      </div>
      <img
        style={{ width: "100%" }}
        src="https://ipfs.near.social/ipfs/bafkreiewvpna7i6nngolgpjgvfx6iasmh74xq2zjvb47deqlzhh26t5kym"
      />
    </FinalGridView>
    <GridView style={{ gridTemplateColumns: "60% 40%" }}>
      <div style={{ padding: 25 }}>
        <p
          style={{
            fontSize: 40,
            fontWeight: "500",
          }}
        >
          Need a Visa?
        </p>
        <p style={{ marginBottom: 10 }}>
          NEARCON is able to provide a Visa Invitation Letter in partnership
          with our local partner, Happy Ambitions Unipessoal LDA, in an effort
          to aid you in your visa application process.
        </p>
        <p style={{ marginBottom: 10 }}>
          All requests must be submitted via this form by October 7, 2023. 
        </p>
        <p style={{ marginBottom: 10 }}>
          Once the form is completed with all of the required information please
          allow 5 business days to process. You’ll receive a custom visa letter
          from our partner via email.
        </p>
        <p style={{ marginBottom: 10 }}>
          Please note, approval/processing times are contingent upon the
          individuals country of departure/embassy. Visas cannot be guaranteed
          for approval due to the nature of the application process. We highly
          recommend requesting the letter as soon as possible due to wait times
          at the various Embassies. Please note, while we can provide the visa
          letter, we cannot help or provide guidance on the visa process itself.
        </p>
      </div>
    </GridView>
  </div>
);
