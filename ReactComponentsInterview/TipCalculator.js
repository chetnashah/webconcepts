import React from 'react';

export default function TipCalculator() {
  // Write your code here.

  const [bill, setBill] = useState(50);
  const [tipPercentage, setTipPercentage] = useState(18);
  const [numPeople, setNumPeople] = useState(1);
  const totalTip = parseInt(bill) * parseInt(tipPercentage) / 100;
  const tipPerPerson = totalTip/parseInt(numPeople);
  
  return (
    <>
      <label for="Bill">Bill</label>
      <input value={bill} onChange={(ev) => setBill(ev.target.value)} name="Bill" id="Bill" type="number" />
      <label for="tipPercentage">Tip Percentage</label>
      <input value={tipPercentage} onChange={(ev) => setTipPercentage(ev.target.value)} type="number" id="tipPercentage" name="tipPercentage" />
      <label for="numberOfPeople">Number of People</label>
      <input value={numPeople} onChange={(ev) => setNumPeople(ev.target.value)} type="number" id="numberOfPeople" name="numberOfPeople"/>
      <p>{`Total Tip: ${totalTip ? "$"+totalTip.toFixed(2) : "-"}`}</p>
      <p>{`Tip Per Person: ${tipPerPerson ? "$"+tipPerPerson.toFixed(2) : "-"}`}</p>
    </>
  );
}