'use client';

import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link"
import { SetStateAction, useState } from "react";
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

  const handleChange = (event: { target: { value: SetStateAction<number>; }; }) => {
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

const Human1 = "When I was a child, I had an adorable little hamster named Bob Jr. He was larger than most hamsters, and gray with a dark black stripe running down his back. His fur looked soft, and I would sometimes run my finger softly over it before quickly withdrawing my hand. He wasn’t a mean hamster, but he had bitten one of my friends once. I too would likely bite a giant if it tried to pick me up. Or at the very least, punch it. I wasn’t allowed to hold him though. My parents, much to their dismay, had reluctantly followed up on their promise to buy me a hamster, and regarded him with horror. I don’t remember exactly what I had done to warrant the reward. Perhaps a promising elementary school test school, or an athletic achievement. Either way, I loved Bob Jr., and I hoped he loved me. I won’t go into what happened to Bob Jr., except to say that I believe that all children should be banned from having hamsters until they are proven to be responsible individuals. Fear not though, he didn’t meet a terrible demise. I just didn’t clean his cage enough, and I feel guilty a decade later. Either way, I’ve recently been weighing whether I should get a pet or not. It feels odd to be researching different pets, a mirror image of the way I was a decade ago, but this time with a bit more money and responsibility. I find myself weighing the different commitments of getting a dog, a cat, or maybe even a bunny."
const AI1 = "When I was a kid, I had a lopsided little goldfish named Marble, though I’m not sure the name ever really fit him. He wasn’t especially colorful, just a pale orange with one cloudy eye that made him look permanently confused. His bowl sat on the corner of my desk, and I used to tap the glass lightly to get his attention, even though I’d been told not to. He would drift over slowly, as if considering whether I was worth the effort, then hover there for a moment before losing interest again. I liked to think he recognized me, which is probably generous. My parents treated him less like a pet and more like a fragile science experiment, always reminding me not to overfeed him, which I definitely did anyway. Marble lived longer than anyone expected, which felt like a quiet victory at the time. Looking back, I’m not sure if I took good care of him or just got lucky, but either way, I still remember that small, quiet presence sitting beside me while I did my homework."

const localStorage = [
  [Human1, AI1, 'Pets'],
  ['Human 2', 'AI 2', 'Friends'],
  ['Human 3', 'AI 3', 'Family'],
  ['Human 4', 'AI 4', 'Romantic Love'],
  ['Human 5', 'AI 5', 'Hobby Passion'],
  ['Human 6', 'AI 6', 'Career Passion']
]