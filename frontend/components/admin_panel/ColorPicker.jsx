import Button from "../Button";
import { useRef, useState , useEffect} from "react";

import colorPickerStyle from "./color_picker.module.css";

const availableColors = [
  "white",
  "black",
  "red",
  "blue",
  "green",
  "yellow",
  "gray",
  "orange",
  "pink",
  "purple",
  "brown",
  "cyan",
  "silver",
  "gold",
  "lightblue",
  "lightgreen",
];

function ColorPicker({ className, colorList = [] }) {
  const [colors, setColors] = useState(colorList);
  const [openPopup, setOpenPopup] = useState(false);
  const popupRef = useRef();

    useEffect(() => {
      let handler = (e) => {
        if (
          popupRef.current &&
          !popupRef.current.contains(e.target)
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

  const addNewColor = (color) => {
    if (!isValidColor(color)) return;

    if (!colors.includes(color)) {
      setColors([...colors, color]);
    }
    togglePopup();
  };

  function isValidColor(color) {
    const s = new Option().style;
    s.color = color;
    return s.color === color;
  }

  return (
    <div className={`${colorPickerStyle.color_picker}  ${className}`}>
      <div>
        <label htmlFor="">Color</label>
        <Button btnStyle="second_btn" onClick={togglePopup}>
          <i className="fa-solid fa-plus"></i>
        </Button>
      </div>
      <ColorPickerPopup
        className={openPopup ? colorPickerStyle.open : colorPickerStyle.close}
        addColor={addNewColor}
        popupRef={popupRef}
      />
      <div className={colorPickerStyle.color_picker_ctn}>
        {colors.map((color) => (
          <Color name={color} key={color} />
        ))}
      </div>
    </div>
  );
}

function ColorPickerPopup({ className, addColor, popupRef }) {
  const [customeColor, setCustomeColor] = useState("");

  const addCustomeColor = (color) => {
    addColor(color);
  };

  const hadleOnChange = (e) => {
    setCustomeColor(e.target.value);
  };

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
        <label>Custom Color</label>
        <div>
          <input type="text" value={customeColor} onChange={hadleOnChange} />
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
