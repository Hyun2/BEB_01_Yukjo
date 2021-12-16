import React from 'react';

import './NoAccount.css';

function NoAccount({ clickWallet }) {
	return (
		<div className='card--no-account'>
			<h1>Connect your Wallet!</h1>
			<div
				className='wallet'
				title='connect with wallet'
				onClick={() => clickWallet()}>
				<img src='img/metamask.png' alt='' />
			</div>
		</div>
	);
}

export default NoAccount;
