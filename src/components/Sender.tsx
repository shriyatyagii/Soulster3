import React, { useState } from "react";
import { sendMoney } from "../helpers/wallet";
import "./Sender.css";

interface SenderProps {
  didSendMoney: () => void;
}

const Sender: React.FC<SenderProps> = ({ didSendMoney }) => {
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState("0");
  const [timeA, setTime] = useState(0);
//>>>
  const [intervals, setIntervals] = useState(0);

  
  var timeforstop:number;
  var intervalsInMilSec: number;
  var timeInMil: number;
  timeforstop=0;

  timeInMil = timeA * 60000; //converting days into miliseconds
  intervalsInMilSec = timeInMil/intervals;
// eslint-disable-next-line
  const amountperInterval = (amount/timeInMil)*intervalsInMilSec;


  
  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value ? Number(e.target.value) : 0);
  };

  const onChangeTimeA = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value ? Number(e.target.value) : 0);
  };

  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value ? e.target.value.toString() : "");
  };
//>>>.
  const onChangeIntervals = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIntervals(e.target.value ? Number(e.target.value) : 0);
  };
//>>>


const onClickStop = async (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
  timeforstop=1;
  e.preventDefault();
  

};



const onClickSendMoney = async (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
  e.preventDefault();


  
    
  var varCounter = 0;
  var varName = async function(){
     
        
        if(varCounter < timeInMil && timeforstop!==1) {

           varCounter = varCounter+intervalsInMilSec;
            await sendMoney(address, amountperInterval);
            didSendMoney();
        }
        else {
         clearInterval(intervalId);
        }
      
       
  };
  var intervalId = setInterval(varName, intervalsInMilSec);
  
};


return (
  <div className="main">
      <div className="text" >
        <div className="text-sub">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
      </div>
      </div>
      <div className="rating">
    <div className="rating-sub">
    <div><button onClick={onClickStop} className="button-pr"><span>Stop Stream</span></button></div>
    <label>Performance Rating: </label><label className="label">{intervals}</label>
    <div className="pr"><input type="range" min="1" max="100" onChange={onChangeIntervals} value={intervals} className="slider"></input></div>
    </div>
    </div>
    <div className="form">
      <div className="form-sub">
      <form className="wrapper">
      <label>Amount: </label>
      <div className="form-row"><input type="text" onChange={onChangeAmount} value={amount} placeholder="Amount" className="form-control" ></input></div>
      <label>Address: </label>  
      <div className="form-row"><input type="text" onChange={onChangeAddress} value={address} className="form-control"></input></div>
      <label>Time: </label>
      <div className="form-row"><input type="text" onChange={onChangeTimeA} value={timeA} className="form-control"></input></div>
      <label>Interval: </label><label className="label">{intervals}</label>
      <div className="form-row"><input type="range" min="1" max="100" onChange={onChangeIntervals} value={intervals} className="slider"></input></div>
      <label></label>
      <div><button  onClick={onClickSendMoney} className="button"><span>Create Stream</span></button></div></form> </div></div></div>
);
};

export default Sender;
