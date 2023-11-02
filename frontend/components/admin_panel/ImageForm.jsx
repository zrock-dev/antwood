import imgStyle from "./shoes_image_form.module.css";
import Button from "../Button";
const focusedImageStyle = (url) => {
  return {
    backgroundImage: `url(${url})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
};

function ImageForm({ className }) {
  return (
    <div className={`${imgStyle.img_form_ctn} ${className}`}>
      <div
        className={imgStyle.shoe_form_images}
        style={focusedImageStyle("default-image.png")}
      ></div>
      <div className={imgStyle.shoe_image_variant_ctn}>
        <Button btnStyle="second_btn" className={imgStyle.shoe_image_add_btn}>
          Updalod New Image
          <i className="fa-solid fa-upload"></i>
        </Button>
      </div>
    </div>
  );
}

export default ImageForm;
