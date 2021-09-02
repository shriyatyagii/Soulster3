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
  <div>
  <form className="wrapper">
  <div id="wizard">
    <label>Amount: </label>
    <div className="form-row"><input type="text" onChange={onChangeAmount} value={amount} className="form-control" ></input></div>
    <label>Address: </label>  
    <div className="form-row"><input type="text" onChange={onChangeAddress} value={address} className="form-control"></input></div>
    <label>Time: </label>
    <div className="form-row"><input type="text" onChange={onChangeTimeA} value={timeA} className="form-control"></input></div>
    <label>Interval: </label>
    <div className="form-row"><input type="range" min="1" max="100" onChange={onChangeIntervals} value={intervals} className="form-control"></input></div>
    <label></label>
    <div><button  onClick={onClickSendMoney}  className="button"><span>Create Stream</span></button></div>  
    <div><button  onClick={onClickStop}  className="button"><span>Stop Stream</span></button></div>  </div>
  </form>
  </div>
);
};

export default Sender;
