const Carousel = () => {
  const slide_data = [
    {
      img_url:
        "https://user-images.githubusercontent.com/100770363/250137626-6887c829-b9ac-48fd-aa1a-24dc7337eda0.png",
      title: "Main Menu",
      description:
        "Yay! you're in pixel pets. Now whats all this stuff about? I will go over each element and explain what it does, so you can start breeding pets and fighting in no time.",
    },
    {
      img_url:
        "https://user-images.githubusercontent.com/100770363/239694635-a87d47fd-c323-4124-8957-dd16fb396ea2.png",
      title: "Battles",
      description:
        "Select your 3 pets on the right by either right clicking them, or pressing the Select Pet button.",
    },
    {
      img_url:
        "https://user-images.githubusercontent.com/100770363/239694681-57386625-21c1-4d4b-a0ab-24b53193011d.png",
      title: "Combat System",
      description:
        "The combat is automatic, and the way it works is very simple. Each player attacks within the order of their creatures in crescent order. Being Pet #1 the first attacker on each side, and up to Pet #3. This sequence loops until one of the players has lost all of his pets in combat and the winner is decided..",
    },
    {
      img_url:
        "https://user-images.githubusercontent.com/100770363/239652886-be78f0f3-9d0e-413b-9d1e-7f2d42e884e1.png",
      titel: "Merging Pets",
      description:
        "It's possible to merge two pets of the same type and rarity to enhance the power level of the primary pet and also increase the rarity if the power level is already at 100.",
    },
  ];
  const CarouselSrc = `
  <head>
    <script src="https://code.jquery.com/jquery-3.7.0.slim.min.js" integrity="sha256-tG5mcZUtJsZvyKAxYLVXrmjKBVLd6VpVccqz/r4ypFE=" crossorigin="anonymous"></script>
  </head>

<style>
    * {
        font-family: Arial;
        box-sizing: border-box;
    }

    html, body{
        overflow: hidden;
        width: 100%;
        height: 100%;
        margin: auto;
        background-color: #0e0e1e;
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
        font-size: 18px;
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

    .welcomeTips span {
      color: white;
      padding: .8rem;
    }

    .slideImg {
        width: 70%;
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
    <script>
    window.addEventListener("message", (event) => {
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

            return(slide_container);
          })

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
            setTimeout(showSlides, 7000); // Change image every 2 seconds
        }
               
        generate_slides();
        showSlides();
    })
        
    </script>
</body> `;
  return (
    <iframe
      message={{ data: props || "No Data" }}
      style={{ height: "100vh", width: "100%" }}
      srcDoc={CarouselSrc}
    />
  );
};

return (
  <>
    <Carousel />
  </>
);
