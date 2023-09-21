const handleDrop = (e) => {
  let imageUrl = e.dataTransfer.getData("text");

  let image = document.createElement("img");
  image.src = imageUrl;

  document.body.appendChild(image);
};

return (
  <>
    <div onDrop="handleDrop()">
      <p>Drop your Kudos images here.</p>
    </div>
  </>
);
