import React, { useState } from 'react';

import './NoTokenList.css';
function NoTokenList() {
	const [selectedTokenType, setSelectedTokenType] = useState('');

	const selectTokenType = (tokenType) => {
		setSelectedTokenType(tokenType);
	};

	return (
		<div className='card--no-token'>
			<div className='add--token--addr--container'>
				<div className='add--token--addr--token__type'>
					<h3>New ERC 20 Address</h3>
					<i
						className='fas fa-donate'
						onClick={() => selectTokenType('erc20')}></i>
				</div>
				<div className='add--token--addr--token__type'>
					<h3>New ERC 721 Address</h3>
					<i
						className='fas fa-donate'
						onClick={() => selectTokenType('erc721')}></i>
				</div>
			</div>
		</div>
	);
}

export default NoTokenList;
