const value = props.value || "no-name button";
const handleButtonClick =
    props.handleButtonClick || (() => console.log("button clicked"));

return (
    <div class="card-footer">
        <div className="centered-container">
            <button class="btn btn-primary"
                style={{ borderRadius: "20px", width: "300px" }}
                onClick={handleButtonClick}>
                {value}
            </button>
        </div>
    </div>

);
