import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Coin from './Coin';
import './App.css';
import Hero from '../src/assets/hero.mp4'


function App() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=120&page=1&sparkline=false') //aqui usamos o link do site e o AXIOS para pegar os dados
      .then((res => {
        setCoins(res.data); // aqui temos essa arrow function que começa com o método .the, que quer dizer "Pegue os dados (na linha de cima) e ENTÃO, vamos usar a função do useState para request some data"
      })).catch(error => console.log(error)) // aqui, estamos simplesmente falando "Se por acaso o sistema pegar (catch) algum erro, console.log nele"
  }, [])

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLocaleLowerCase()))

  return (
    <div className="App"  >
      <video className="video" autoPlay loop muted>
        <source src={Hero} type={'video/mp4'} />
      </video>
      <div className="Search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input type="text" className="coin-input" spellCheck="false" onChange={handleChange} />
        </form>
      </div>
      <div className='card-container'>
        <div className='card-coins'>
          {filteredCoins.map(coin => {
            return (
              <Coin 
                key={coin.id}
                name={coin.name}
                price={coin.current_price}
                symbol={coin.symbol}
                marketcap={coin.total_volume}
                volume={coin.market_cap}
                image={coin.image}
                priceChange={coin.price_change_percentage_24h}
              />
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
