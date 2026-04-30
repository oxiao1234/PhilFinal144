'use client';
const { useCallback } = require("react");

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
  const [checked, checkedState] = useState(null);

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

    const randomInt = getRandomInt(2);
    console.log(randomInt);
    setAITag(randomInt);
    console.log("AITAGSET");
    console.log(aiTag);
    
    // Resetting the values properly
    setSubmit(0);
    setSelectedValue(-1);
    
    setQuestions([(randomInt === 0 ? localStorage[question][1] : localStorage[question][0]) , (randomInt === 1 ? localStorage[question][1] : localStorage[question][0]), localStorage[question][2]]);
    setQuestion(question => question + 1);
    checkedState(null);   
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
        <h1 className = "text-center">Natty or Not?</h1>
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
        <div style = {{backgroundColor: selectedValue === 0 ? "beige" : "#fffefb"}} className="col-sm flex container items-center mb-4" onClick = {() => {setSelectedValue(0)}}>
            <label htmlFor="five">{questions[0]}</label>
        </div>
        <div style = {{backgroundColor: selectedValue === 1 ? "beige" : "#fffefb"}} className="!ml-10 col-sm flex container items-center mb-4" onClick = {() => {setSelectedValue(1)}}>
          <label htmlFor="five">{questions[1]}</label>
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

const Human2 = "One of my favorite stories about my family is the way my grandpa and grandma (or as I call them, Nonno and Nonna) got married. They were from a small town in Italy, called Moschiano, and my Nonna’s family sold lumber. My Nonno’s family sold chestnuts, but of course, chestnuts grow on trees— so one day my Nonno’s family had a business idea. Cut down some of the trees and sell lumber! Naturally, my Nonna’s family was pissed, and instead of handling this like adults, they decided to be sworn enemies. Their families hated each other— but when my Nonno saw my Nonna overlooking her balcony, it was all over. He couldn’t hate the family anymore, because he loved her. A modern day Romeo and Juliet story was born (but with a much happier ending, thank god). \n\nAt first their meetings were secretive, he would walk under her balcony everyday to see her. But as things grew serious, their parent’s didn’t seem to be willing to budge. So, one day, my grandpa left to immigrate to NY. A few years later, my grandma made up her mind to leave too, to go marry my grandfather, but it wasn’t as simple for her to leave as it had been for him. She had my great aunt, her younger sister, put on one of her bright dresses and hats and sit on her balcony, so if their father— who worked in town— looked towards home (it was a REALLY small town) he would figure she was on the balcony and that nothing was amiss. Meanwhile, while my great aunt read, my great uncle took my grandma to the next town to get a passport and get her on a train, the first transportation in what would be a long trip to America. \n\nOut of her 7 siblings and many other family members, only my great aunt and uncle knew she was leaving. By the time her father got home later, it was too late. She was gone. About 10 years later, they arranged to come back and started talking to their families again. There is still some hatred amongst them— just a few years ago one of my cousins on my Nonno’s side promised to marry another one from my Nonna’s side, and he got her pregnant then refused to marry her. Apparently my Nonno almost got stabbed over that, when he couldn’t convince the boy to go through with the marriage. But at least on this side of the Atlantic, the Giovanis and the Pacoulis now get along quite nicely :)"
const AI2 = "One of my favorite stories is how my aunt met her husband. It sounds almost too simple now, but at the time it felt like the kind of coincidence people pretend they do not believe in until it happens to them. They met in an airport in Atlanta, during one of those travel days where everything feels slightly off. My aunt was coming back from a work trip to Denver, exhausted and carrying a coffee she had already forgotten to drink. Her flight home was delayed, of course, and she ended up sitting near Gate 22 just scrolling through her phone with no real intention of doing anything else. \n\n He was already there when she arrived, sitting a few seats away with his backpack between his feet like he was guarding it from disappearing. He was supposed to be flying to Chicago for a conference, but his plane had been pushed back twice. At some point he looked over and noticed she was quietly laughing at something on her screen. He asked what it was, and she told him it was just a video of a raccoon stealing someone’s sandwich from a park bench. That was basically it at first. Just small conversation that did not feel important enough to remember, except that neither of them stopped talking. Delays have a way of making people softer around the edges, like there is suddenly time to be human with strangers. When his flight was finally called, he stood up and hesitated like he was debating whether it mattered. Then he asked for her number in a way that sounded casual but clearly was not. She gave it to him. They texted before he even boarded, and kept texting after the plane took off like nothing had ended. \n\nA few months later, they realized they kept ending up in the same cities for work. A year after that, they stopped calling it coincidence and just started planning around it. Now they always say they met because of a delay. But I think it is more than that. It is the kind of story that only works because both of them stayed sitting long enough to notice each other."

const Human3 = "When one thinks about the best friendships that they would like to have, they likely think towards a friend group that they've seen in a movie or TV show, or perhaps even a book. Groups like Friends, or the Breakfast Club. But an underrated friend group is really the Minions. They've hung out together since the beginning of time, and yet they never get tired of each other. Imagine another friend group that has dozens and dozens of friends that know each other and haven't ever had a massive, friend group imploding fight. \n\nWhile there are some smaller cliques within the friend group, like Bob, Kevin and Stuart, it never feels exclusionary, as it could with other groups. Really, as we study the Minions as an entity, we can gather greater insights into what actually makes friendships and friend groups succeed. Shared goals and interests ensure that they are always aligned in the ways that they act. Even if not perfectly so, they can work out any differences by knowing that they are all part of the same whole, the Minions. If society became more like the Minions, we would all be better for it."
const AI3 = "I think friendships are one of those things you don’t fully notice while they’re forming, and then one day you realize certain people have just become part of your routine. It’s not usually some big moment, more like a bunch of small ones stacked together. Sitting around doing nothing, sending each other things that aren’t even that funny, or having the same conversation over and over without getting tired of it. I have friends I don’t talk to every day, but when we do it feels like no time passed at all, which is a weird kind of comfort. \n\nThere’s also something nice about how low pressure it can be compared to everything else. You can show up a little off, a little tired, not fully put together, and it’s fine. Good friends don’t really need an explanation for that. At the same time, they’re the people who will call you out if you’re being unreasonable, but in a way that doesn’t make you feel judged. I don’t think I’ve ever sat down and thought about why certain friendships last, but I think it has something to do with how easy it is to just exist around each other."

const Human4 = "Often, people describe love as being driven by fate rather than choice. It’s meant to find you, you can’t help who you love, and sometimes love just fizzles out. I understand why this is easy to believe. After spending countless hours swiping on dating apps to no avail, who wouldn’t want to believe that love is meant to find them as opposed to the other way around? While feeling too attached to leave a relationship that keeps disappointing, who wouldn’t want to believe that this is out of their control? To some extent, I know this is true. Often, our love for people in our lives starts and ends when we least expect it. \n\nHowever, I believe actions are what keep love alive. In my eyes, my love is something I feed every time I spend hours crafting a gift for my girlfriend, call my mom and spill every detail of my day, or initiate plans with my friends so we can laugh together. It may feel intuitive or natural in the moment, but I am still taking steps to nourish the relationships I value the most. It means so much more when I actively participate in the love I feel for people instead of simply passively experiencing it."
const AI4 = "I think love is a lot less dramatic than people make it out to be. It is not always big moments or perfect timing, and most of the time it does not feel like something you can point to and say “there it is.” It shows up in smaller ways, like remembering how someone takes their coffee or noticing when they go quiet and asking why. It is sitting next to someone and not feeling the need to fill every second with conversation, because the silence is not uncomfortable. \n\nI used to think love had to feel intense all the time, like something out of a movie, but it is usually steadier than that. It is choosing to stay when things are a little inconvenient or when the other person is not at their best. It is also being known in a way that feels a little exposing at first, like someone can see all the parts of you that you usually keep to yourself, and deciding you are okay with that. I do not think love solves everything, but it makes things feel more manageable, like you are not carrying everything on your own anymore."

const Human5 = "I understand why people don’t enjoy running - it’s painful, long, and tiring. I sometimes question why I even go on runs. I feel aches and pains I haven’t felt since I was a wee 17 year old after completing a long run. I would love to say that I run because of the self-reflection it allows me. However, most of my runs are spent imagining myself in a TikTok edit when a Doja Cat song comes on. \n\nI think one of the main reasons I actually enjoy running is the sense of completion I get after a run. I could have done nothing all day, but the completion of a run helps me feel a little self gratification. The Tarheel Ten which I just completed is a great example of this. It was painful, long, and tiring, but all of that felt worth it when I completed the ten miles. It was enough to know that I can do hard things."
const AI5 = "I never thought woodworking would be this much second guessing. I usually start with a simple idea, like a small table or a wall shelf, and somehow it always turns into me staring at a crooked line trying to convince myself it is “character” and not just a mistake I do not want to fix. \n\nThe shop I use smells like old pine and metal that has been left outside too long. My hands are usually a mix of dry dust and tiny cuts I only notice when I wash them later. There is always one measurement I swear I got right the first time, and then I check it again and it is off by just enough to matter. \n\nStill, I keep going back. Not because it is relaxing, it really is not, but because there is a point where the pieces start to resemble what I had in my head. It is usually imperfect and a little stubborn, but it holds together. And for some reason that feels like enough to come back and try again."

const Human6 = "As a college student, I frequently think about career. It seems like such a big decision to make because I'll be spending most of my life in that career. Thinking about it, a normal job means you spend around 40 hours a week, or even more if you have to commute. I can't think of many things I do currently that I do for 40 hours, much less anything that I would be happy doing for that long. Except maybe watching TikTok's, but even then I get fatigued after a couple of hours. This brings the big question of, what would I like to do for my career? \n\nEvery job seems to have its tradeoffs. Money, time, stress, etc. I could make a lot of money, but there aren't many jobs where I wouldn't have to dedicate a lot of time to do so. Or, at the very least, a lot of stress. Really, I would love to do a little bit of everything. Maybe I could be working a blue-collar job like construction for one day a week, then work a desk-job for a couple days, then do something fun, like being a writer or artist. Because, as I said before, there's really nothing I'd like to do for 40 hours a week, but there are a lot of things I would like to do for maybe 10 hours a week."
const AI6 = "I think college is one of those things that feels very different depending on the day. Sometimes it feels exciting, like everything is new and slightly unpredictable, and other times it just feels like a lot of walking to places you don’t really want to be. You go from having a loose sense of independence to suddenly being responsible for your own time, which sounds great until you realize how easy it is to waste it. There are days where you feel productive and on top of everything, and then there are days where you skip a class and tell yourself you will catch up later, knowing you probably won’t. \n\nA lot of it ends up being about the people, more than the classes. Sitting around in someone’s room, talking longer than you planned to, or deciding to get food way too late at night for no real reason. Those are the parts that stick. At the same time, there is this quiet pressure running in the background, like you are supposed to be figuring something out even if you are not sure what that is yet. I don’t think college is as put together as it looks from the outside, but maybe that is the point."

const localStorage = [
  [Human1, AI1, 'Pets'],
  [Human2, AI2, 'Family'],
  [Human3, AI3, 'Friends'],
  [Human4, AI4, 'Love'],
  [Human5, AI5, 'Hobby'],
  [Human6, AI6, 'Career']
]