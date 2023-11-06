import imgStyle from "styles/stylecomponents/adminPanel/shoes_image_form.module.css";
import ShoesGalery from "./ShoesGalery";
import ShoesColorDetailsForm from "./ShoesColorDetailsForm";
import useShoeColorForm from "../../hooks/useShoeColorForm";

import { focusedImageStyle } from "utils/ImageFormUtils";
import { useEffect } from "react";

function ShoeColorForm(params) {
  const {
    colorForm,
    newImages,
    colorSelected,
    isSaved,
    className,
    addImage,
    onRemoveNewImage,
    onRemoveProductImage,
    handleChange,
    onSubmitShoeColor,
    onDeleteShoeColor,
    uploadColor,
    onAddSizes,
    onRemoveSize,
  } = useShoeColorForm(params);

  useEffect(() => {
    uploadColor();
  }, [colorSelected]);



  return (
    <>
      <div className={`${imgStyle.img_form_ctn} ${className}`}>
        <div
          className={imgStyle.shoe_form_images}
          style={focusedImageStyle("default-image.png")}
        ></div>
        <ShoesGalery
          imageProducts={colorForm.images}
          newImages={newImages}
          onRemoveNewImage={onRemoveNewImage}
          onRemoveProductImage={onRemoveProductImage}
          addImage={addImage}
        />
      </div>
      <ShoesColorDetailsForm
        colorForm={colorForm}
        isSaved={isSaved}
        colorSelected={colorSelected}
        handleChange={handleChange}
        onSubmitShoeColor={onSubmitShoeColor}
        onAddSizes={onAddSizes}
        onRemoveSize={onRemoveSize}
        onDeleteShoeColor={onDeleteShoeColor}
      />
    </>
  );
}

export default ShoeColorForm;
