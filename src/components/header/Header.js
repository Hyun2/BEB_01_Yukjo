import React from 'react';

import './Header.css';

function Header() {
	return (
		<div className='header'>
			<div className='header__logo'>
				<img src='img/opensea.svg' alt='' className='header__logo__img' />
				<h3 className='header__logo__title'>YukJO</h3>
			</div>
			<div className='header__account'>
				<div className='header__account__user-icon'>
					<i className='fas fa-user'></i>
				</div>
			</div>
		</div>
	);
}

export default Header;
