import React, { useState } from 'react';

import './Header.css';

function Header({ clickWallet }) {
	const [searchInput, setSearchInput] = useState('');

	const changeInputHandler = (e) => {
		setSearchInput(e.target.value);
	};
	const clickClearSearchInputHandler = () => {
		setSearchInput('');
	};

	return (
		<div className='header'>
			<div className='header__logo'>
				<img src='img/opensea.svg' alt='' className='header__logo__img' />
				<h3 className='header__logo__title'>YukJO</h3>
			</div>
			<div className='search_box'>
				<a
					className='search_box__btn'
					href={`https://etherscan.io/address/${searchInput}`}
					target='_blank'
					rel='noopener noreferrer'>
					<i className='fas fa-search'></i>
				</a>
				<input
					className='search_box__input'
					type='text'
					placeholder='contract address, wallet address....'
					onChange={changeInputHandler}
					value={searchInput}
				/>
				<button
					className='search_box__remove_btn'
					onClick={clickClearSearchInputHandler}>
					<i className='fas fa-backspace'></i>
				</button>
			</div>

			<div className='header__account'>
				<div
					className='header__account__user-icon'
					onClick={() => clickWallet()}
					title='connect to wallet'>
					<i className='fas fa-user'></i>
				</div>
			</div>
		</div>
	);
}

export default Header;
