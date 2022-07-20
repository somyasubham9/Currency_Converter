import React,{useState,useEffect} from 'react'
import CurrencyRow from './CurrencyRow'
import './App.css'
const App = () => {
  const BASE_URL = 'https://api.exchangerate.host/latest';
  const [currencyOption,setCurrencyOption]=useState([]);
  const [fromCurrency,setFromCurrency]=useState();
  const [toCurrency,setToCurrency]=useState();
  const [exchangerate,setExchangeRate]=useState(1);
  const [amount,setAmount]=useState(1);
  const [changeInFrom,setChangeInFrom]=useState(true);
  
  let toAmount,fromAmount;
  if(changeInFrom ){
    fromAmount=amount;
    toAmount=amount*exchangerate;
  }
  else
  {
    toAmount=amount;
    fromAmount=amount/exchangerate;
  }
  useEffect(()=>{
    fetch(BASE_URL).then(res=>res.json()).then(data=>{
      const firstCurrency=Object.keys(data.rates)[0];
      setCurrencyOption([data.base,...Object.keys(data.rates)]);
      setFromCurrency(data.base);
      setToCurrency(firstCurrency);
      setExchangeRate(data.rates[firstCurrency]);
    })
  },[]);


  useEffect(() => {
    if (fromCurrency !== undefined && toCurrency !== undefined) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency]);


  function changeFromAmount(e){
    setAmount(e.target.value);
    setChangeInFrom(true);
  }
  function changeToAmount(e){
    setAmount(e.target.value);
    setChangeInFrom(false);
  }
  // console.log(currencyOption);
  return (
    <section>
  <h1>Convert</h1>
  <CurrencyRow currencyOption={currencyOption} selectedCurrency={fromCurrency} changeCurrency={e=>setFromCurrency(e.target.value)} amount={fromAmount} changeAmount={changeFromAmount} />
  <div className='equals'>=</div>
  <CurrencyRow currencyOption={currencyOption} selectedCurrency={toCurrency} changeCurrency={e=>setToCurrency(e.target.value)} amount={toAmount} changeAmount={changeToAmount} />
    </section>
  )
}

export default App