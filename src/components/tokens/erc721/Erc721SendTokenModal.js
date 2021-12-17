import React, { useEffect, useState } from 'react';
import './Erc721SendTokenModal.css';
function Erc721SendTokenModal({
	setTo,
	to,
	sendToken,
	erc721addr,
	tokenId,
	setIsModalOpen,
	isModalOpen,
}) {
	useEffect(() => {
		if (to) {
			sendToken(erc721addr, tokenId);
		}
	}, [to]);

	const [modalAddrInput, setModalAddrInput] = useState('');

	const changeModalInputHandler = (e) => {
		setModalAddrInput(e.target.value);
	};

	const clickSendTokenButtonHandler = () => {
		setTo(modalAddrInput);
	};

	return (
		<div
			className='modal_container'
			onClick={(e) => {
				e.stopPropagation();
			}}>
			<div className='modal' onClick={(e) => e.stopPropagation()}>
				<div className='modal__title'>
					<h2>{`Sending ERC721 Token`}</h2>
				</div>
				<div className='modal__input' onClick={(e) => e.stopPropagation()}>
					<input
						type='text'
						placeholder="Recipient's Address"
						value={modalAddrInput}
						onChange={(e) => changeModalInputHandler(e)}
					/>
				</div>
				<div
					className='modal__button__container'
					onClick={(e) => {
						e.stopPropagation();
						setIsModalOpen(!isModalOpen);
					}}>
					<div
						className='modal__submit__button'
						onClick={(e) => {
							e.stopPropagation();
							clickSendTokenButtonHandler();
						}}>
						<i className='far fa-check-circle'></i>
					</div>
					<div
						className='modal__cancel__button'
						onClick={(e) => {
							e.stopPropagation();
							setIsModalOpen(!isModalOpen);
						}}>
						<i className='fas fa-ban'></i>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Erc721SendTokenModal;
