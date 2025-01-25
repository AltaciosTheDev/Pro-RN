import {useState } from "react";
import { MAX_CHARACTERS } from "../../lib/constants";
import { useFeedbackItemsContext } from "../../lib/hooks";

export default function FeedbackForm() {
  //context usage
  const {handleAddToList: onAddToList} = useFeedbackItemsContext()

  //states
  const [text, setText] = useState("");
  const charCount = MAX_CHARACTERS - text.length; //derived state
  const [showValidIndicator, setShowValidIndicator] = useState(false)
  const [showInvalidIndicator, setShowInvalidIndicator] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //guard statement
    
    const newText = e.target.value;
    if (newText.length > MAX_CHARACTERS) {
      return;
    }
    setText(newText);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(text.includes("#") && text.length>5){
      setShowValidIndicator(true)
      setTimeout(() => setShowValidIndicator(false),2000)
    }
    else{
      setShowInvalidIndicator(true)
      setTimeout(() => setShowInvalidIndicator(false),2000)
      return
    }

    onAddToList(text)
    setText("")
  }

  return (
    <form className={`form ${showValidIndicator ? 'form--valid': ""} ${showInvalidIndicator? "form--invalid" : ""}`} onSubmit={handleSubmit}>
      <textarea
        id="feedback-textarea"
        placeholder="hello"
        onChange={handleChange}
        spellCheck={false}
        value={text}
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company
      </label>
      <div>
        <p className="u-italic">{charCount}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
