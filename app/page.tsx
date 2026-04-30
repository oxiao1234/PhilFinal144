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

  const handleChange = (event: any) => {
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
      <p>Can you tell the difference between AI-generated and human-written text? The following quiz consists of 6 questions. Each question has two pieces of text, one of which is human written and one of which is Chat-GPTed. 6 different writers were drafted in this endeavour. Some details were blurred for anonymity. Each question has a topic that is designed to relate to an essential part of the human experience. Choose whichever text one you think is AI-generated!</p>
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


      <div className = "row container" style={{ whiteSpace: "pre-line" }}>
        <div className="col-sm flex container items-center mb-4">
            <input id="default-radio-1" type="radio" value="0" name="default-radio" className="!w-4 !h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none" onClick = {handleChange}/>
            <label htmlFor="default-radio-1" className="select-none ms-2 text-sm font-medium text-heading">{questions[0]}</label>
        </div>
        <div className="!ml-10 col-sm container flex items-center">
            <input id="default-radio-2" type="radio" value="1" name="default-radio" className="!w-4 !h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none" onClick = {handleChange}/>
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

const Human1 = "When I was a child, I had an adorable little hamster named Bob Jr. He was larger than most hamsters, and gray with a dark black stripe running down his back. His fur looked soft, and I would sometimes run my finger softly over it before quickly withdrawing my hand. He wasn’t a mean hamster, but he had bitten one of my friends once. I too would likely bite a giant if it tried to pick me up. Or at the very least, punch it. I wasn’t allowed to hold him though. My parents, much to their dismay, had reluctantly followed up on their promise to buy me a hamster, and regarded him with horror. I don’t remember exactly what I had done to warrant the reward. Perhaps a promising elementary school test school, or an athletic achievement. \n\nEither way, I loved Bob Jr., and I hoped he loved me. I won’t go into what happened to Bob Jr., except to say that I believe that all children should be banned from having hamsters until they are proven to be responsible individuals. Fear not though, he didn’t meet a terrible demise. I just didn’t clean his cage enough, and I feel guilty a decade later. Either way, I’ve recently been weighing whether I should get a pet or not. It feels odd to be researching different pets, a mirror image of the way I was a decade ago, but this time with a bit more money and responsibility. I find myself weighing the different commitments of getting a dog, a cat, or maybe even a bunny."
const AI1 = "I had a parrot named Miso that I ended up with by accident, the kind of situation where you agree to “just watch it for a week” and suddenly it has been three years. He came with a scratched cage and a habit of tilting his head like he was always trying to solve a puzzle I was too slow to understand. Miso did not talk much at first, just a few awkward whistles, but he was observant in a way that made me feel like I was the one being studied. He would sit on the curtain rod while I cooked, silently judging my every decision like adding too much garlic was a personal offense. \n\nOne winter morning, the power went out and the apartment got so quiet I could hear him breathing, and for the first time he said my name clearly. It startled me enough that I dropped my coffee, and he immediately started laughing, or at least that is what it sounded like. After that, he picked up words quickly, but only the ones he seemed to find useful or amusing. By the time I moved out of that apartment, Miso would greet me at the door with a clipped “hey” and a whistle that sounded almost like approval. I still do not know if he understood what any of it meant, or if he was just repeating patterns, but sometimes I swear he timed his responses too perfectly for it to be coincidence."

const Human2 = ""
const AI2 = ""

const Human3 = ""
const AI3 = ""

const Human4 = "One of my favorite stories about my family is the way my grandpa and grandma (or as I call them, Nonno and Nonna) got married. They were from a small town in Italy, called Moschiano, and my Nonna’s family sold lumber. My Nonno’s family sold chestnuts, but of course, chestnuts grow on trees— so one day my Nonno’s family had a business idea. Cut down some of the trees and sell lumber! Naturally, my Nonna’s family was pissed, and instead of handling this like adults, they decided to be sworn enemies. Their families hated each other— but when my Nonno saw my Nonna overlooking her balcony, it was all over. He couldn’t hate the family anymore, because he loved her. A modern day Romeo and Juliet story was born (but with a much happier ending, thank god). \n\nAt first their meetings were secretive, he would walk under her balcony everyday to see her. But as things grew serious, their parent’s didn’t seem to be willing to budge. So, one day, my grandpa left to immigrate to NY. A few years later, my grandma made up her mind to leave too, to go marry my grandfather, but it wasn’t as simple for her to leave as it had been for him. She had my great aunt, her younger sister, put on one of her bright dresses and hats and sit on her balcony, so if their father— who worked in town— looked towards home (it was a REALLY small town) he would figure she was on the balcony and that nothing was amiss. Meanwhile, while my great aunt read, my great uncle took my grandma to the next town to get a passport and get her on a train, the first transportation in what would be a long trip to America. \n\nOut of her 7 siblings and many other family members, only my great aunt and uncle knew she was leaving. By the time her father got home later, it was too late. She was gone. About 10 years later, they arranged to come back and started talking to their families again. There is still some hatred amongst them— just a few years ago one of my cousins on my Nonno’s side promised to marry another one from my Nonna’s side, and he got her pregnant then refused to marry her. Apparently my Nonno almost got stabbed over that, when he couldn’t convince the boy to go through with the marriage. But at least on this side of the Atlantic, the Giovanis and the Pacoulis now get along quite nicely :)"
const AI4 = "One of my favorite stories is how my aunt met her husband. It sounds almost too simple now, but at the time it felt like the kind of coincidence people pretend they do not believe in until it happens to them. They met in an airport in Atlanta, during one of those travel days where everything feels slightly off. My aunt was coming back from a work trip to Denver, exhausted and carrying a coffee she had already forgotten to drink. Her flight home was delayed, of course, and she ended up sitting near Gate 22 just scrolling through her phone with no real intention of doing anything else. \n\n He was already there when she arrived, sitting a few seats away with his backpack between his feet like he was guarding it from disappearing. He was supposed to be flying to Chicago for a conference, but his plane had been pushed back twice. At some point he looked over and noticed she was quietly laughing at something on her screen. He asked what it was, and she told him it was just a video of a raccoon stealing someone’s sandwich from a park bench. That was basically it at first. Just small conversation that did not feel important enough to remember, except that neither of them stopped talking. Delays have a way of making people softer around the edges, like there is suddenly time to be human with strangers. When his flight was finally called, he stood up and hesitated like he was debating whether it mattered. Then he asked for her number in a way that sounded casual but clearly was not. She gave it to him. They texted before he even boarded, and kept texting after the plane took off like nothing had ended. \n\nA few months later, they realized they kept ending up in the same cities for work. A year after that, they stopped calling it coincidence and just started planning around it. Now they always say they met because of a delay. But I think it is more than that. It is the kind of story that only works because both of them stayed sitting long enough to notice each other."

const Human5 = "I understand why people don’t enjoy running - it’s painful, long, and tiring. I sometimes question why I even go on runs. I feel aches and pains I haven’t felt since I was a wee 17 year old after completing a long run. I would love to say that I run because of the self-reflection it allows me. However, most of my runs are spent imagining myself in a TikTok edit when a Doja Cat song comes on. \n\nI think one of the main reasons I actually enjoy running is the sense of completion I get after a run. I could have done nothing all day, but the completion of a run helps me feel a little self gratification. The Tarheel Ten which I just completed is a great example of this. It was painful, long, and tiring, but all of that felt worth it when I completed the ten miles. It was enough to know that I can do hard things."
const AI5 = "I never thought woodworking would be this much second guessing. I usually start with a simple idea, like a small table or a wall shelf, and somehow it always turns into me staring at a crooked line trying to convince myself it is “character” and not just a mistake I do not want to fix. \n\nThe shop I use smells like old pine and metal that has been left outside too long. My hands are usually a mix of dry dust and tiny cuts I only notice when I wash them later. There is always one measurement I swear I got right the first time, and then I check it again and it is off by just enough to matter. \n\nStill, I keep going back. Not because it is relaxing, it really is not, but because there is a point where the pieces start to resemble what I had in my head. It is usually imperfect and a little stubborn, but it holds together. And for some reason that feels like enough to come back and try again."

const Human6 = ""
const AI6 = ""

const localStorage = [
  [Human1, AI1, 'Pets'],
  ['Human 2', 'AI 2', 'Friends'],
  ['Human 3', 'AI 3', 'Family'],
  [Human4, AI4, 'Romantic Love'],
  [Human5, AI5, 'Hobby Passion'],
  ['Human 6', 'AI 6', 'Career Passion']
]