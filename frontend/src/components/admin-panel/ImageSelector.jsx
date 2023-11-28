import { focusedImageStyle } from "@/utils/ImageFormUtils";
import uuid4 from "uuid4";
const ImageSelector = ({
  form,
  addImage,
  editable,
  onDeleteUploadedImage,
  openImageDropdown,
  toggleImageDropdown,
  colorSelected,
  onDeleteImage,
  imageAdded,
}) => {
  return (
    <>
      <div className="admin-panel-colors-form-droopdown-ctn">
        <div
          className={`admin-panel-colors-form-droopdown ${
            !colorSelected.color || colorSelected?.name === ""
              ? "admin-panel-droopdown-disabled"
              : ""
          }`}
        >
          {!openImageDropdown ? (
            <span>Images</span>
          ) : (
            <div className="admin-panel-colors-form-uploaded-button">
              <label htmlFor="file-upload">
                <i className="fa-solid fa-upload"></i>
              </label>
              <input
                type="file"
                accept="image/*"
                name="image"
                id="file-upload"
                onChange={addImage}
                multiple
              />
            </div>
          )}
          <i
            onClick={toggleImageDropdown}
            className={`fa-solid fa-chevron-down ${
              openImageDropdown ? "fa-rotate-180" : ""
            }`}
          ></i>
        </div>
        {openImageDropdown && (
          <ul className="admin-panel-colors-droopdown-list">
            {form.images.map((image) => {
              return (
                <li
                  key={uuid4()}
                  className="admin-panel-colors-droopdown-image-item"
                  style={focusedImageStyle(image.url)}
                >
                  <i
                    className="fa-solid fa-x"
                    onClick={() => onDeleteImage(image.id)}
                  ></i>
                </li>
              );
            })}
            {imageAdded.map((image, i) => {
              return (
                <li
                  key={uuid4()}
                  className="admin-panel-colors-droopdown-image-item"
                  style={focusedImageStyle(image.url)}
                >
                  <i
                    className="fa-solid fa-x"
                    onClick={() => onDeleteUploadedImage(i)}
                  ></i>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default ImageSelector;
