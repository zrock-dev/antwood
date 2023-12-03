import Button from "../Button";
import { useRef, useState, useEffect } from "react";

import colorPickerStyle from "@/styles/admin_panel/color_picker.module.css";

import { availableColors } from "@/utils/color-picker";

function ColorPicker({ className, colors = [], onSelectColor }) {
  const [openPopup, setOpenPopup] = useState(false);
  const popupRef = useRef();
  const popupBtnRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let handler = (e) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        !popupBtnRef.current.contains(e.target)
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
    if (openPopup) {
      setErrorMessage("");
      setOpenPopup(false);
    }else{
      setOpenPopup(true);
    }
  };

  const addNewColor = (color) => {
    if (color === "") {
      onSetMessage("* Color is required");
      return;
    }
    if (!isValidColor(color)) {
      onSetMessage("* Invalid color");
      return;
    }

    if (colors.length >= 10) {
      onSetMessage("* Maximum 10 colors allowed");
      return;
    }


    const index = colors.findIndex((c) => c.color === color)
        
        if (index !== -1) {
          onSetMessage("* Color already exists");
          return;
        }
    
        onSelectColor({
          color: color,
          _id: "",
        });
    
    togglePopup();
  };


  const onSetMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    },3000)
  }

  function isValidColor(color) {
    const s = new Option().style;
    s.color = color;
    return s.color === color;
  }

  return (
    <div className={`${colorPickerStyle.color_picker}  ${className}`}>
      <div className={colorPickerStyle.popup_btn}>
        <div className={colorPickerStyle.color_picker_ctn}>
          <div ref={popupBtnRef}>
            <Button btnStyle="third_btn" onClick={togglePopup}>
              NEW COLOR <i className="fa-solid fa-plus"></i>
            </Button>
          </div>
          {colors.map((c) => (
            <Color name={c.color} key={c._id} onClick={() => onSelectColor(c)} />
          ))}
        </div>
      </div>
      <ColorPickerPopup
        className={
          openPopup ? colorPickerStyle.active : colorPickerStyle.inactive
        }
        addColor={addNewColor}
        popupRef={popupRef}
        errorMessage={errorMessage}
      />
    </div>
  );
}

function ColorPickerPopup({ className, addColor, popupRef , errorMessage}) {
  const [customeColor, setCustomeColor] = useState("");


  const addCustomeColor = (color) => {
  const regex = /^[a-zA-Z]+$/;
    if (regex.test(color) || color == "") {
      addColor(color);
    }
  };

const hadleOnChange = (e) => {
  let value = e.target.value;

  if (value.length < 14) {
    setCustomeColor(value.toLowerCase());
  }
};


const handelOnKeyDown = (e) => {
  if (e.key === "Enter") {
    addCustomeColor(customeColor);
  }
}
  return (
    <div
      className={`${colorPickerStyle.color_picker_popup} ${className} `}
      ref={popupRef}
    >
      <div>
        <label>Select a color</label>
        <div className={colorPickerStyle.color_picker_ctn}>
          {availableColors.map((color) => (
            <Color
              name={color}
              key={color}
              onClick={() => {
                addColor(color);
              }}
            />
          ))}
        </div>
      </div>
      <div className={colorPickerStyle.color_custome_ctn}>
        <div>
          <label>Custom Color</label> <span className={colorPickerStyle.error}>{errorMessage}</span>
        </div>
        <div>
          <input type="text" value={customeColor} onChange={hadleOnChange} onKeyDown={handelOnKeyDown}/>
          <Button
            onClick={() => {
              addCustomeColor(customeColor);
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

function Color({ name, onClick }) {
  return (
    <div
      className={colorPickerStyle.color}
      style={{ backgroundColor: name }}
      onClick={onClick}
    >
      <span className={colorPickerStyle.color_prompt}>{name}</span>
    </div>
  );
}

export default ColorPicker;
