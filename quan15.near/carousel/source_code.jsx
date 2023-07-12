const Carousel = () => {
  const slide_data = [
    {
      img_url:
        "https://user-images.githubusercontent.com/93423666/240480322-7ae64756-e31e-4c3f-b776-fac8719ddca0.png",
      title: "The Rundown",
    },
    {
      img_url:
        "https://user-images.githubusercontent.com/93423666/240481674-dd55212c-caba-4024-803c-a07c0f5c0463.png",
      title: "Main Menu",
      description:
        "In the main menu, we see 3 available characters — knight, mage and ranger. To open access to the character, click on the “+” above the class name. Three icons will appear above the hero — inventory (armor icon), a dungeon window (axe icon) and a potions window (bottle icon)",
    },
    {
      img_url:
        "https://user-images.githubusercontent.com/93423666/240483000-4e39f317-8308-4b94-b443-0d9eef0f93a5.png",
      title: "Inventory",
      description:
        "In the inventory window, you can see the characteristics of your character, equipment and backpack, as well as the “sell item” and “drop item” functions.",
    },
    {
      img_url:
        "https://user-images.githubusercontent.com/93423666/240483392-d94db44b-2f75-4f77-99c7-1c2d549bff44.png",
      title: "Hero Equipment",
      description:
        "As you progress in the game, you will receive new equipment, hovering over which will show the characteristics of the item. To equip an item on a character, drag the item to the appropriate slot. Dungeons",
    },
    {
      img_url:
        "https://user-images.githubusercontent.com/93423666/240483779-70046f15-1a3b-43ea-bd74-29ba0ce8fa8e.png",

      title: "Dungeon Window",
      description:
        "The dungeon window shows 4 dungeons with different difficulty — easy, medium, hard and hell. Each dungeon also has its own characteristics. You will need one key for the hike. At the start, you are given 25 keys (i.e. 25 dungeon trips). After the start keys run out, you can buy more of them. (100 keys for 0.2 NEAR).",
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
