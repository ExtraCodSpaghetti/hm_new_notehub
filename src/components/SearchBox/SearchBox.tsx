import { useState } from "react";
import css from "./SearchBox.module.css"
import toast from "react-hot-toast";

interface SearchBoxProps{
  onChange: (value: string) => void
}

export default function SearchBox({onChange}:SearchBoxProps) {
  const [value, setValue] = useState("")
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  const inputValue = event.target.value;

  setValue(inputValue);
  onChange(inputValue);

  if (inputValue.trim() === "") {
    toast.error("Input value");
  }
}
  return <input className={css.input} type="text" value={value} onChange={handleChange} placeholder="Search notes" />;
}
