import React, { useEffect, useState } from 'react';

function Erc20SendTokenModal({
	amount,
	setAmount,
	sendToken,
	isModalOpen,
	setIsModalOpen,
	setTo,
	to,
}) {
	useEffect(() => {
		if (modalAddressInput) {
			sendToken(to);
		}
	}, [to, amount]);
	const [modalAddressInput, setModalAddressInput] = useState('');
	const [modalAmountInput, setModalAmountInput] = useState(0);

	const changeAddressInputHandler = (e) => {
		setModalAddressInput(e.target.value);
	};

	const changeAmountInputHandler = (e) => {
		setModalAmountInput(e.target.value);
	};

	const clickSendTokenButtonHandler = () => {
		setTo(modalAddressInput);
		setAmount(modalAmountInput);
		sendToken();
	};

	return (
		<div
			className='modal_container'
			onClick={(e) => {
				e.stopPropagation();
				setIsModalOpen(!isModalOpen);
			}}>
			<div className='modal' onClick={(e) => e.stopPropagation()}>
				<div className='modal__title'>
					<h2>{`Send ERC Tokens`}</h2>
				</div>
				<div className='modal__input' onClick={(e) => e.stopPropagation()}>
					<input
						type='text'
						value={modalAddressInput}
						onChange={(e) => changeAddressInputHandler(e)}
						placeholder='recipient address...'
					/>
					<input
						type='number'
						value={modalAmountInput}
						onChange={(e) => changeAmountInputHandler(e)}
						placeholder='amount...'
					/>
				</div>
				<div
					className='modal__button__container'
					onClick={(e) => e.stopPropagation()}>
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
							setIsModalOpen(false);
						}}>
						<i className='fas fa-ban'></i>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Erc20SendTokenModal;
