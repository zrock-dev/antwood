import { useState, useRef, useEffect } from "react";
import Button from "../Button";
import "@/styles/admin_panel/tag_selector.css";
import { TAGS } from "@/utils/Suggestions";
const TagSelector = ({ tags = [], addTags, removeTags, reset = false,  tagError ,addTagError}) => {
  const [tag, setTag] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    let handler = (e) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target)
      ) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  useEffect(() => {
      if (reset) {
        setTag("");
        setSuggestions([]);
      }
  },[reset])


  const handleChange = (e) => {
    let value = e.target.value;
    if (value.trim().length > 15) {
      return;
    }

    if (value.length == 0) {
      setTag("");
      setSuggestions([]);
      return;
    }

    if (!/^[a-zA-Z0-9\s]+$/.test(value)){
      return;
    }
    

    let currentSuggestions = TAGS.filter((t) => t.startsWith(value) && tags.indexOf(t)==-1);
    setSuggestions(currentSuggestions); 
    setTag(value.toLowerCase());
  };

  const onClickSuggestion = (suggestion) => {
    setTag(suggestion);
    setSuggestions([]);
  };

  const isValidTag = (tag) => {
    return /[a-zA-Z]/.test(tag);
  };

  const handleAddTag = () => {
    if (tag === "") {
      addTagError("* Tag cannot be empty");
      return;
    }

    if (tags.length >= 30) {
      addTagError("* Can't add more than 30 tags");
      return;
    }
    if (!isValidTag(tag)) {
      addTagError("* Tag must contain at least one non-numeric character");
      return;
    }

    let index = tags.findIndex((t) => t === tag);
    if (index >= 0) {
      addTagError("* Tag already exists");
      return;
    }
   setSuggestions([]);
    addTags(tag.trim());
    setTag("");
  };

  const handleRemoveTag = (tag) => {
    removeTags(tag);
  };
const handleOnKeyDown = (e) => {
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    e.preventDefault();
    if (suggestions.length === 0) {
      return;
    }

    const currentIndex = suggestions.indexOf(tag);
    let newIndex;

    if (e.key === "ArrowDown") {
      newIndex = (currentIndex + 1) % suggestions.length;
    } else {
      newIndex = (currentIndex - 1 + suggestions.length) % suggestions.length;
    }

    const listItems = suggestionsRef.current.childNodes;
    const previousIndex = currentIndex >= 0 ? currentIndex : 0;
    listItems[previousIndex].classList.remove("hovered");
    listItems[newIndex].classList.add("hovered");

     listItems[newIndex].scrollIntoView({
       behavior: "smooth",
       block: "nearest",
       inline: "start",
     });
    setTag(suggestions[newIndex]);
  } else if (e.key === "Enter") {
    handleAddTag();
  }
};

  return (
    <div className="tag-form-ctn admin-panel-form-item">
      <div className="tag-selector-ctn">
        <input
          type="text"
          name="tags"
          value={tag}
          placeholder="Tags"
          onChange={handleChange}
          onKeyDown={handleOnKeyDown}
          autoComplete="off"
        />
        <Button onClick={handleAddTag}>
          <i className="fa-solid fa-plus"></i>
        </Button>
      </div>
      <div className="tags-ctn">
        {tags.map((tag) => (
          <div className="tag" key={tag}>
            {tag}
            <i
              className="fa-solid fa-x"
              onClick={() => handleRemoveTag(tag)}
            ></i>
          </div>
        ))}
      </div>

      {suggestions && (
        <ul className="tags-form-suggestions" ref={suggestionsRef}>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => onClickSuggestion(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <span>{tagError}</span>
    </div>
  );
};

export default TagSelector;
