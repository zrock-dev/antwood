import Button from "../Button";
import styleButton from "styles/stylecomponents/button.module.css";
import shoeFormStyle from "styles/stylecomponents/adminPanel/color_picker.module.css";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import tagStyle from "styles/stylecomponents/adminPanel/color_picker.module.css";

function Tag({
  className,
  tagParams = [],
  prompt = "Tag",
  onAddTag,
  onRemove,
  verifyInput,
}) {
  const [openPopup, setOpenPopup] = useState(false);
  const [newTag, setNewTag] = useState("");
  const popupRef = useRef();
  const tagBtnRef = useRef();
  const uuid = uuidv4();

  useEffect(() => {
    let handler = (e) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        !tagBtnRef.current.contains(e.target)
      ) {
        setOpenPopup(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const togglePopup = () => {
    setNewTag("");
    setOpenPopup(!openPopup);
  };

  const addNewTag = () => {
    if (!(newTag === "") && !tagParams.includes(newTag)) {
      onAddTag(newTag);
    }
    togglePopup();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && openPopup) {
      addNewTag();
    }
  };

  const hadleOnChange = (e) => {
    let value = e.target.value;
    if (!verifyInput(value)) {
      return;
    }
    setNewTag(value);
  };

  const removeTag = (tag) => {
    onRemove(tag);
  };

  return (
    <div
      className={`${tagStyle.color_picker}  ${shoeFormStyle.shoe_form_inputs}  ${className}`}
    >
      <div className={`${tagStyle.popup_btn}`}>
        <div ref={tagBtnRef}>
          <label>{prompt}</label>
          <label
            onClick={togglePopup}
            className={`${styleButton.btn} ${styleButton.second_btn}`}
            htmlFor={uuid}
          >
            <i className="fa-solid fa-plus"></i>
          </label>
        </div>
      </div>
      <div
        className={`${tagStyle.color_picker_popup} ${
          openPopup ? tagStyle.open : tagStyle.close
        } `}
        ref={popupRef}
      >
        <div className={tagStyle.color_custome_ctn}>
          <label>Write a new {prompt}</label>
          <div>
            <input
              type="text"
              value={newTag}
              onChange={hadleOnChange}
              id={uuid}
              onKeyDown={handleKeyPress}
            />
            <Button onClick={addNewTag}>Save</Button>
          </div>
        </div>
      </div>

      <div className={tagStyle.color_picker_ctn}>
        {tagParams.map((tag) => (
          <div
            key={uuidv4()}
            className={tagStyle.tag}
            onClick={() => removeTag(tag)}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tag;
