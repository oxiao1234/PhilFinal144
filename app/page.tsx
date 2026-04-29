'use client';

import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link"
import { useState } from "react";
import { getRandomInt } from "./utils";

export default function Home() {
  const [start, setStart] = useState(0);
  const [question, setQuestion] = useState(0);
  const [aiTag, setAITag] = useState(0);
  const [questions, setQuestions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [
        selectedValue,
        setSelectedValue,
    ] = useState(-1);

  const [submitted, setSubmit] = useState(0);
  const [finished, setFinish] = useState(0);
  const [rating, setRating] = useState<string | null>(null);

  function getStarted(){
    setStart(1);
    setQuestion(0);
    getQuestion();
  }

  function reStart(){
    setStart(0);
    setQuestion(0);
    setScore(0);
    setSelectedValue(-1);
    setSubmit(-1);
  }

  function getQuestion(){
    // Fetch question from localStorage
    // Mix up the AI and human texts
    // Set the AI tag
    // Return the newly mixed two pieces of info
    if (question >= 6){
      console.log("FINSIHED")
      setFinish(1);
      return;
    }

    setAITag(getRandomInt(2));
    
    // Resetting the values properly
    setSubmit(0);
    setSelectedValue(-1);
    
    setQuestions([(aiTag === 0 ? localStorage[question][1] : localStorage[question][0]) , (aiTag === 1 ? localStorage[question][1] : localStorage[question][0]), localStorage[question][2]]);
    setQuestion(question => question + 1);
        
  }

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    console.log("change");
  }

  const onSubmit = () => {
    console.log("submitted");
    console.log(selectedValue);
    console.log(aiTag);
    if((selectedValue - aiTag) === 0){
      console.log("Nice");
      setScore((score) => score + 1);
    }

    setSubmit(1);
    
  }

  const gradeScore = () => {
    // 5-6
    if(score >= 5){
      setRating("AI Detector: Professors should hire you")
    }
    // 3-4
    else if(score >= 3)
    {
      setRating("Coin Flipper: About the same as guessing")
    }
    
    // 1-2
    else if (score >= 1){
      setRating("AI Newbie: Hit the training books")
    }
    // 0
    else {
      setRating("Future Roboscam victim: ...")
    }
  }

  return (
    <div className="flex flex-col place-items-center">
      <div className = "container">
        <h1>Natty or Not?</h1>
      </div>

     {!start && 
     <>
     <div className = "container">
      <p>Can you tell the difference between AI-generated and human-written text? This quiz consists of 6 questions. Each question has two pieces of text, one of which is human written and one of which is Chat-GPTed. The questions are designed to relate to essential parts of the human experience. Choose whichever one you think is AI-generated!</p>
     </div>
     <button type="button" className="btn btn-primary btn-lg" onClick={getStarted}>Get Started!</button>
     </>
     }
     {(start && !finished) ? 
     <>
      <div className = "row container items-center">
        <p className = "text-center col-sm">Score: {score}</p>
        <p className = "text-center col-sm">Question {question}/{localStorage.length}</p>
        <p className = "text-center col-sm">Topic: {questions[2]}</p>
      </div>


      <div className = "row container">
        <div className="col-sm flex container items-center mb-4">
            <input id="default-radio-1" type="radio" value="0" name="default-radio" className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none" onClick = {handleChange}/>
            <label htmlFor="default-radio-1" className="select-none ms-2 text-sm font-medium text-heading">{questions[0]}</label>
        </div>
        <div className="!ml-10 col-sm container flex items-center">
            <input id="default-radio-2" type="radio" value="1" name="default-radio" className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none" onClick = {handleChange}/>
            <label htmlFor="default-radio-2" className="select-none ms-2 text-sm font-medium text-heading">{questions[1]}</label>
        </div>
      </div>
      
      <div className = "row mb-10">
      <button disabled = {submitted === 1 || selectedValue === -1} type="button" className="col-sm btn btn-primary btn-lg" onClick = {onSubmit}>Submit</button>
      <button disabled = {submitted === 0} type="button" className="col-sm !ml-10 btn btn-primary btn-lg" onClick = {getQuestion}>Next</button>
      </div>
      <button type="button" className="col-sm !ml-10 btn btn-primary btn-lg" onClick = {reStart}>Restart</button>
    </>
    : ""}
    {finished ? 
    <>
      <div className = "container">
        <h2>Final Score: {score}/{localStorage.length}</h2>
      </div>
      {!rating && 
      <button type="button" className="col-sm !ml-10 btn btn-primary btn-lg" onClick = {gradeScore}>Give me a grade rating</button>
      }
    </>
    : ""}
    {rating ? 
    <div className = "container text-center">
      {rating}
    </div>
    : ""}
    </div>
  );
}


const localStorage = [
  ['Human 1', 'AI 1', 'Pets'],
  ['Human 2', 'AI 2', 'Friends'],
  ['Human 3', 'AI 3', 'Family'],
  ['Human 4', 'AI 4', 'Romantic Love'],
  ['Human 5', 'AI 5', 'Hobby Passion'],
  ['Human 6', 'AI 6', 'Career Passion']
]