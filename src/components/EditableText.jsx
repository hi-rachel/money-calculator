import React, { useState } from "react";
import PropTypes from "prop-types";

export const EditableText = ({ initialText, id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const [, setEditId] = useState(0);
  const origin = JSON.parse(localStorage.getItem("spending"));

  const updateOrigin = origin.map((item) => {
    return item.id === id ? { ...item, text } : item;
  });
  localStorage.setItem("spending", JSON.stringify(updateOrigin));

  const handleDoubleClick = (id) => {
    setIsEditing(true);
    setEditId(id);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    <div className="w-full break-all" onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <input
          className="w-full"
          autoFocus
          type="text"
          value={text}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
      ) : (
        <span className="block w-fit">{text}</span>
      )}
    </div>
  );
};

EditableText.propTypes = {
  initialText: PropTypes.string,
  id: PropTypes.number,
};
