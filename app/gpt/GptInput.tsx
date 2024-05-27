import React, { useRef } from "react";

interface GptInputProps {
  onSubmit: (input: string) => void;
}

const GptInput: React.FC<GptInputProps> = ({ onSubmit }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputRef.current) {
      onSubmit(inputRef.current.value);
      inputRef.current.value = ""; // Reset the input field
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        size={50}
        ref={inputRef}
        className="rounded-lg text-lg p-5 w-full text-stone-600"
        placeholder={"Ask Marvin:GPT anything.."}
      />
      {/* <button type="submit">Submit</button> */}
    </form>
  );
};

export default GptInput;
