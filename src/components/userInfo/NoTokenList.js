import React, { useState } from 'react';

import AddNewTokenAddrModal from './AddNewTokenAddrModal';

import './NoTokenList.css';

function NoTokenList({
	addNewErc721Token,
	addNewErc20Token,
	setNewErc721addr,
	setNewErc20addr,
}) {
	const [selectedTokenType, setSelectedTokenType] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);

	const selectTokenType = (tokenType) => {
		setSelectedTokenType(tokenType);
	};
	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	return (
		<div className='card--no-token'>
			{isModalOpen && (
				<AddNewTokenAddrModal
					tokenType={selectedTokenType}
					addNewErc721Token={addNewErc721Token}
					addNewErc20Token={addNewErc20Token}
					setNewErc721addr={setNewErc721addr}
					setNewErc20addr={setNewErc20addr}
				/>
			)}

			<div className='add--token--addr--container'>
				<div className='add--token--addr--token__type'>
					<h3>New ERC 20 Address</h3>
					<i
						className='fas fa-donate'
						onClick={() => {
							selectTokenType('erc20');
							toggleModal();
						}}></i>
				</div>
				<div className='add--token--addr--token__type'>
					<h3>New ERC 721 Address</h3>
					<i
						className='fas fa-donate'
						onClick={() => {
							selectTokenType('erc721');
							toggleModal();
						}}></i>
				</div>
			</div>
		</div>
	);
}

export default NoTokenList;
