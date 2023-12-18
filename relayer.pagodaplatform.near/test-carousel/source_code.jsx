const slide_data = [
  {
    img_url: "https://th.bing.com/th/id/OIG.OfNFuMJgye3yehM.pauG?pid=ImgGn",
    title: "Bad Ape 1",
  },
  {
    img_url: "https://th.bing.com/th/id/OIG.AM7fdW6ptwT_8NrblvDZ?pid=ImgGn",
    title: "Bad Ape 2",
    description: "This is my bad ape 2",
  },
];

const CarouselSrc = `
<head>
  <script src="https://code.jquery.com/jquery-3.7.0.slim.min.js" integrity="sha256-tG5mcZUtJsZvyKAxYLVXrmjKBVLd6VpVccqz/r4ypFE=" crossorigin="anonymous"></script>
</head>

<style>
  @import url('https://fonts.googleapis.com/css?family=Press+Start+2P');

  * {
      box-sizing: border-box;
  }

  html, body{
      font-family: "Pixel Emulator", "Press Start 2P", Courier new, monospace;
      overflow: hidden;
      width: 100%;
      height: 100%;
      margin: auto;
      background-color: #101010;
  }

  .mySlides {
      display: none;
  }

  /* Slideshow container */
  .slideshow-container {
      max-width: 1000px;
      position: relative;
      margin: auto;
      height: 100%;
  }
/* Caption text */
  .text {
      color: #f2f2f2;
      font-size: 15px;
      padding: 8px 12px;
      bottom: 8px;
      width: 50%;
      height: auto;
      text-align: center;
  }

  .active {
      background-color: #717171;
  }

  .sliderStyle {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      height: 100%;
  }

  .welcomeTips {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: .8rem;
  }

  .welcomeTips h2 {
    color: white;
  }

  .welcomeTips span {color: white;
    padding: .8rem;
  }

  .slideImg {
      width: 80%;
  }

  /* Fading animation */
  .fade {
      animation-name: fade;
      animation-duration: 1.5s;
  }

  @keyframes fade {
      from {
          opacity: .4
      }

      to {
          opacity: 1
      }
  }

  
</style>

<body>
  <div class="slideshow-container">
  </div>
  <br>
  <script>window.addEventListener("message", (event) => {
      const slide_data = event.data.data;
      let slideIndex = 0;

      const generate_slides = () => {
        const main_container = $('.slideshow-container');
        const slides = slide_data.map((slide) => {
          const slide_container = $("<div></div>").addClass("mySlides fade");
          if(!slide.hasOwnProperty("title")){
            const img = $("<img />").attr("src", slide.img_url).addClass("slideImg");
            const description = $("<span></span>").append(slide.description);

            const info_container = $("<div></div>").addClass("welcomeTips").append(description)

            slide_container.append(img, info_container);
          } else if(!slide.hasOwnProperty("description")){
            const img = $("<img />").attr("src", slide.img_url).addClass("slideImg");
            const title = $("<span></span>").append(slide.title);

            const info_container = $("<div></div>").addClass("welcomeTips").append(title)

            slide_container.append(img, info_container);
          } else {
            const img = $("<img />").attr("src", slide.img_url).addClass("slideImg");
            const title = $("<span></span>").append(slide.title);
            const description = $("<span></span>").append(slide.description);

            const info_container = $("<div></div>").addClass("welcomeTips").append(title, description)

            slide_container.append(img, info_container);
          }

          return(slide_container);})

        slides.map((slide) => {
            main_container.append(slide);
        })
      }

      const showSlides = () => {
          let i;
          let slides = document.getElementsByClassName("mySlides");
          for (i = 0; i < slides.length; i++) {
              slides[i].classList.remove("sliderStyle");
          }
          slideIndex++;
          if (slideIndex > slides.length) {
              slideIndex = 1
          }
          slides[slideIndex - 1].classList.add("sliderStyle");
          setTimeout(showSlides, 3000); // Change image every 2 seconds
      }
             
      generate_slides();
      showSlides();
  })
      
  </script>
</body> `;

const Carousel = () => {
  return (
    <iframe
      message={{ data: slide_data || "No Data" }}
      style={{ height: "100vh", width: "100%" }}
      srcDoc={CarouselSrc}
    />
  );
};

return (
  <div>
    <Carousel />
  </div>
);
