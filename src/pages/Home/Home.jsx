import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import './Home.css';

const Home = () => {
    const { allCoin, currency } = useContext(CoinContext);
    const [displayCoin, setDisplayCoin] = useState([]);
    const [input, setInput] = useState('');

    const inputHandler = (event) => {
        setInput(event.target.value);
        if (event.target.value === "") {
            setDisplayCoin(allCoin);
        }
    }

    const searchHandler = async (event) => {
        event.preventDefault();
        const coins = await allCoin.filter((item) => {
            return item.name.toLowerCase().includes(input.toLowerCase())
        })
        setDisplayCoin(coins)
    }

    const [currentPage, setCurrentPage] = useState(1);
    const coinsPerPage = 10; // Number of coins per page

    useEffect(() => {
        setDisplayCoin(allCoin);
    }, [allCoin]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getVisibleCoins = () => {
        const startIndex = (currentPage - 1) * coinsPerPage;
        const endIndex = startIndex + coinsPerPage;
        return displayCoin.slice(startIndex, endIndex);
    };

    const renderPagination = () => {
        const totalPages = Math.ceil(displayCoin.length / coinsPerPage);
        if (totalPages <= 1) return null; // No pagination needed for 1 page or less

        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="pagination">
                {currentPage !== 1 && (
                    <button onClick={() => handlePageChange(currentPage - 1)}>
                        Previous
                    </button>
                )}
                {pageNumbers.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        className={pageNumber === currentPage ? 'active' : ''}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}
                {currentPage !== totalPages && (
                    <button onClick={() => handlePageChange(currentPage + 1)}>
                        Next
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className='home'>
            <div className='hero'>
                <h1>Largest <br />Crypto Marketplace</h1>
                <p>Welcome to the world's largest cryptocurrency marketplace. Sign Up to explore more about cryptos.</p>
                <form onSubmit={searchHandler}>


                    <input onChange={inputHandler} value={input} type="text" placeholder='Search crypto..' required />
                    <button type='submit' onSubmit={onsubmit}>Search</button>

                    {/* <datalist id='coinlist'>
                        {allCoin.map((item, index) => (<option key={index} value={itemm.name} />))}
                    </datalist> */}


                </form>
            </div>

            {renderPagination()}

            <div className="crypto-table">
                <div className="table-layout">
                    <p>#</p>
                    <p>Coins</p>
                    <p>Price</p>
                    <p style={{ textAlign: "center" }}>24Hr Change</p>
                    <p className="market-cap">Market Cap</p>
                </div>
                {getVisibleCoins().map((item, index) => (
                    <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
                        <p>{item.market_cap_rank}</p>
                        <div>
                            <img src={item.image} alt="" />
                            <p>{item.name + " - " + item.symbol}</p>
                        </div>
                        <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
                        <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>{Math.floor(item.price_change_percentage_24h * 100)}</p>
                        <p className='market_cap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
                    </Link>
                ))}
            </div>


        </div>
    );
};

export default Home;
