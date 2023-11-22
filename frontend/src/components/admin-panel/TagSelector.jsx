import { useState, useRef, useEffect } from "react";
import Button from "../Button";
import "@/styles/admin_panel/tag_selector.css";

let TAGS = [
  "adidas",
  "animal print",
  "basketball",
  "black",
  "blue",
  "breathable",
  "buckles",
  "buttons",
  "canvas",
  "classic",
  "comfortable",
  "converse",
  "cushioned",
  "durable",
  "extra large",
  "floral",
  "flyknit",
  "gray",
  "green",
  "grippy",
  "grommets",
  "high-top",
  "jordan",
  "laces",
  "large",
  "leather",
  "lifestyle",
  "lightweight",
  "low-top",
  "medium",
  "men",
  "mid-top",
  "new balance",
  "nike",
  "nubuck",
  "orange",
  "pink",
  "plaid",
  "pockets",
  "puma",
  "purple",
  "red",
  "reebok",
  "retro",
  "rivets",
  "running",
  "saucony",
  "small",
  "solid",
  "straps",
  "striped",
  "studs",
  "suede",
  "supportive",
  "under armour",
  "unisex",
  "vans",
  "waterproof",
  "white",
  "women",
  "yellow",
  "zippers",
];

const TagSelector = ({ tags = [], addTags, removeTags, reset = false }) => {
  const [tag, setTag] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const suggestionsRef = useRef(null);
  const [tagError, setTagError] = useState("");

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

  const addTagError = (message) => {
    setTagError(message);
    setTimeout(() => {
      setTagError("");
    }, 3000);
  };

  const handleChange = (e) => {
    let value = e.target.value.trim();
    if (value.length > 18) {
      return;
    }
    let currentSuggestions = TAGS.filter((t) => t.startsWith(value));
    setTag(value.toLowerCase());
    if (value == "") {
      setSuggestions([]);
      return;
    }
    setSuggestions(currentSuggestions);
  };

  const onClickSuggestion = (suggestion) => {
    setTag(suggestion);
    setSuggestions([]);
  };

  const handleAddTag = () => {
    if (tag === "") {
      addTagError("* Tag cannot be empty");
      return;
    }

    if (tags.length >= 20) {
      addTagError("* Can't add more than 20 tags");
      return;
    }

    let index = tags.findIndex((t) => t === tag);
    if (index >= 0) {
      addTagError("* Tag already exists");
      return;
    }

    addTags(tag);
    setTag("");
  };

  const handleRemoveTag = (tag) => {
    removeTags(tag);
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
        />
        <Button onClick={handleAddTag}>
          <i className="fa-solid fa-plus"></i>
        </Button>
      </div>
      <div className="tags-ctn">
        {tags.map((tag) => (
          <div className="tag" key={tag}>
            {tag}{" "}
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
