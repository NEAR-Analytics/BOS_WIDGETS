const handleDrop = (e) => {
  e.preventDefault();

  const droppedImageUrl = e.dataTransfer.getData("text");

  if (droppedImageUrl) {
    setImage(droppedImageUrl);
  }
};

const handleDragOver = (e) => {
  e.preventDefault();
};

return (
  <>
    <div ondrop="handleDrop(event)" ondragover="handleDragOver(event)">
      <h4>
        <span>Drop an image here, desktop experience</span>
      </h4>
    </div>
  </>
);
