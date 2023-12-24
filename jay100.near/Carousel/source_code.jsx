const Carousel = () => {
  const slide_data = [
    {
      img_url:
        "https://user-images.githubusercontent.com/100770363/241330819-010617e4-b2b3-4d34-a59c-c1b58bf92d8d.png",
      title: "The Basics",
    },
    {
      img_url:
        "https://user-images.githubusercontent.com/100770363/241331374-56bd3f0c-7ed3-4923-bd48-4aac7367b280.png",
      title: "Main Menu",
      description:
        "From the main menu, you can see all of the main things you can do in the game. Battle, Mint Unit, Check the Leaderboard, Check Active Rooms, and the market. On the right hand side of your image, this is where the troops that you own will be displayed.",
    },
    {
      img_url:
        "https://user-images.githubusercontent.com/100770363/241335354-eaf25884-de02-4d7a-a8f2-3c4e59214d5f.png",
      title: "Battles",
      description:
        "This is what you'll see when you select battle. You will have the option to create a new challenge, or fight against someone's challenge. These matches are best 2 out of 3",
    },
    {
      img_url:
        "https://user-images.githubusercontent.com/100770363/241335498-727bf24d-a65c-4bff-b404-8bcadc558512.png",
      description:
        "This is the challenge you chose to accept. As you can see the opponent already set the field for the first round, and it is your job to assemble your own side so that you can attempt to take the first round.",
    },
    {
      img_url:
        "https://user-images.githubusercontent.com/100770363/241335871-e9c8e5fe-db38-4ada-b1ff-7d895e61f44e.png",
      description:
        "Thanks to the cheeky placement of the warlock, You were able to take the first round. From here, you will have to wait for the opponent to respond before you can attack again.",
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
      message={{ data: slide_data || "No Data" }}
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
