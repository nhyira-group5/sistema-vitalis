import { useState } from "react";

export function Message({ text, handleChange, handleSubmit}) {
  const [value, setValue] = useState(text);
  const [isEditable, setIsEditable] = useState(true);
  
  function handleChange(e) {
    setValue(e.target.value);
  };

  function handleSubmit(e) {
    if (e.key === 'Enter') {
      console.log("deu certo")
      e.preventDefault();
      setIsEditable(false);
    }
  };
  
  return (
    <div className="rounded-lg bg-white p-4 leading-4 text-sm">
      <input
      className="w-full h-full ring-0 "
      type="text"
      value={text}
      onChange={handleChange}
      onKeyDown={handleSubmit}
      readOnly={!isEditable}
    />
    </div>
  );
}
