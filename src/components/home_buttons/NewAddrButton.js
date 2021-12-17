import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import AddNewTokenAddrModal from '../userInfo/AddNewTokenAddrModal';
import './NewAddrButton.css';

function NewAddrButton({
	setNewErc20addr,
	setNewErc721addr,
	newErc20addr,
	newErc721addr,
	addNewErc721Token,
	addNewErc20Token,
	isModalOpen,
	setIsModalOpen,
	isNewAddrButtonShown,
	setIsNewAddrButtonShown,
}) {
	const [tokenType, setTokenType] = useState('');
	return (
		<div className='new__addr__button__container'>
			<div
				className='new__addr__close__button'
				onClick={() => setIsNewAddrButtonShown(!isNewAddrButtonShown)}>
				<i className='fas fa-window-close'></i>
			</div>
			{isModalOpen && (
				<AddNewTokenAddrModal
					tokenType={tokenType}
					setIsModalOpen={setIsModalOpen}
					setNewErc20addr={setNewErc20addr}
					newErc20addr={newErc20addr}
					setNewErc721addr={setNewErc721addr}
					newErc721addr={newErc721addr}
					addNewErc721Token={addNewErc721Token}
					addNewErc20Token={addNewErc20Token}
				/>
			)}
			<div className='new__addr__title'>Add New Token Address</div>
			<button
				className='new__addr__button'
				onClick={() => {
					setIsModalOpen(!isModalOpen);
					setTokenType('erc20');
				}}>
				<span>Add ERC20 Token</span>
			</button>

			<button
				className='new__addr__button'
				onClick={() => {
					setIsModalOpen(!isModalOpen);
					setTokenType('erc721');
				}}>
				<span>Add ERC721 Token</span>
			</button>
			<Link to='/mint-nft'>
				<button className='new__addr__button'>
					<span>Go to Mint Page</span>
				</button>
			</Link>
		</div>
	);
}

export default NewAddrButton;
