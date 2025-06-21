
import './App.css';
import React from 'react';
import { useState } from 'react';

function App() {

  const [datas,setdatas]=useState({
    amount:"",
    descr:"",
    type:""
  })

  const [lists,setlists]=useState([])


  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  const [error, setError] = useState("");



  function addfunction(){

    if (!datas.type) {
      setError("Please select Income or Expense");
      return;
    }

    const amt = Number(datas.amount);
    setlists([...lists,datas])

    if (datas.type === "income") {
    setIncome(prev => prev + amt);
    setBalance(prev => prev + amt);
    } 

    else if (datas.type === "expense") {
      setExpense(prev => prev + amt);
      setBalance(prev => prev - amt);
    }

    setdatas({ amount: "", descr: "", type: "" })
    setError(""); // ✅ clear error after success
  }



  function deletefunction(deleteindex)
  {

    const item = lists[deleteindex];
    const amt = Number(item.amount);

    if(item.type==="income")
    {
      setBalance(prev=>prev-amt)
      setIncome(prev => prev - amt);
    }

    else if (item.type === "expense") 
    {
      setExpense(prev => prev -amt);
      setBalance(prev => prev + amt);
    }

    setlists(lists.filter((_, index) => index !== deleteindex))

  }



  return (
    <div className="App">

      <h1 id="main-heading">Expense Tracker</h1>

      <h3><span id="totalbalanceheading">Total Balance</span>&nbsp;&nbsp;&nbsp;${balance} </h3>




      <h3 id="cashflowheading">Cash Flow</h3>
      <div className="cashflow">

        <div id="income">
          <span className="head">Income </span> 
          <span style={{ color: 'green' }}>${income}</span>
        </div>

        <div id="expense">
          <span className="head">Expense </span> <span style={{ color: "red" }}>${expense}</span> <br/>
        </div>
      </div> 




      <h3>
        Add Transaction
      </h3>

      <div id="transactionSection">
        
        <div id="labels">

          <label style={{ color: 'green' }}>
            <input type="radio" name="type" value="income" checked={datas.type === "income"}
            onChange={e=>setdatas({ ...datas, type: e.target.value })}/>
            Income
          </label>

          <label style={{ color: 'red' }}>
            <input type="radio" name="type" value="expense" checked={datas.type === "expense"} 
            onChange={e=>setdatas({ ...datas, type: e.target.value })}/>
            Expense
          </label>

        </div> <br/> 


        <div id="amountandDescr">

          <div>
            Amount: 
            <input id="amt" type='number' value={datas.amount} onChange={e=>setdatas({ ...datas, amount: e.target.value })}/> 
          </div>


          <div>
            Description: 
            <input id="desc" type='text' value={datas.descr} onChange={e=>setdatas({ ...datas, descr: e.target.value })} /> 
          </div>

        </div><br/>


        {error && <p style={{ color: "red" }}>{error}</p>}


        <div id="addDiv"> 
          <button id="add" onClick={addfunction} >Add</button>
        </div>

      </div>




      <h3>
        Transactions List
      </h3>

      <div id="transactionList">

        <ul id="list">


          {lists.map((list,index) => 
          {
            const amountColor = list.type === "income" ? "green" : "red";
            
            return (
            <li id="item" key={index}>
              <span>{list.descr}</span>  
              <span style={{ color: amountColor }}>${list.amount}</span> 
              <span><button id="delete" onClick={() => deletefunction(index)}>Delete</button> </span>
            </li>)
              
          })}
        </ul>
      </div>
    </div>
  );  
}


export default App;
