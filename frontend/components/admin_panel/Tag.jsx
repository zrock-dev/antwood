import Button from "../Button";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import tagStyle from "./color_picker.module.css";

function Tag({ className, tagParams = [], prompt = "Tag", onAddTag }) {
  const [tags, setTags] = useState(tagParams);
  const [openPopup, setOpenPopup] = useState(false);
  const [newTag, setNewTag] = useState("");
  const popupRef = useRef();
  const tagBtnRef = useRef();
  useEffect(() => {
    setTags((tag) => {
      return tagParams;
    });
  }, [tagParams]);

  useEffect(() => {
    let handler = (e) => {
      console.log(e);
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
    setOpenPopup(!openPopup);
  };

  const addNewTag = (tag) => {
    if (tag === "") return;
    if (!tags.includes(tag)) {
      onAddTag(tag);
    }
    togglePopup();
  };

  const hadleOnChange = (e) => {
    setNewTag(e.target.value);
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className={`${tagStyle.color_picker}  ${className}`}>
      <div className={tagStyle.popup_btn}>
        <div ref={tagBtnRef}>
          <label htmlFor="">{prompt}</label>
          <Button
            btnStyle="second_btn"
            onClick={togglePopup}
            className="btn_ref"
          >
            <i className="fa-solid fa-plus"></i>
          </Button>
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
            <input type="text" value={newTag} onChange={hadleOnChange} />
            <Button
              onClick={() => {
                addNewTag(newTag);
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </div>

      <div className={tagStyle.color_picker_ctn}>
        {tags.map((tag) => (
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
