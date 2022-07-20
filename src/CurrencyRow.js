import React from 'react'

const CurrencyRow = (props) => {
    const {currencyOption,selectedCurrency,changeCurrency,amount,changeAmount}=props;
  return (
    <>
        <input type='number' className='input' value={amount} onChange={changeAmount}></input>
        <select value={selectedCurrency} onChange={changeCurrency}>
            {currencyOption.map((option)=>
                <option key={Math.random()*170} value={option}>{option}</option>
            )}
            
        </select>
    </>
  )
}

export default CurrencyRow