import React, { useEffect, useState } from 'react';
import './AddNewTokenAddrModal.css';
function AddNewTokenAddrModal({
	tokenType = '',
	addNewErc721Token,
	addNewErc20Token,
	setNewErc20addr,
	setNewErc721addr,
	newErc20addr,
	newErc721addr,
	setIsModalOpen,
}) {
	const [modalInput, setModalInput] = useState('');
	const changeModalInputHandler = (e) => {
		setModalInput(e.target.value);
	};

	useEffect(() => {
		if (newErc20addr) {
			addNewErc20Token();
		}
	}, [newErc20addr]);

	useEffect(() => {
		if (newErc721addr) {
			addNewErc721Token();
		}
	}, [newErc721addr]);

	const clickSubmitHandler = async () => {
		if (tokenType === 'erc20') {
			setNewErc20addr(modalInput);
			await addNewErc20Token();
			setIsModalOpen();
		} else {
			setNewErc721addr(modalInput);
			await addNewErc721Token();
			setIsModalOpen();
		}
	};

	return (
		<div
			className='modal_container'
			onClick={(e) => {
				e.stopPropagation();
				setIsModalOpen();
			}}>
			<div className='modal' onClick={(e) => e.stopPropagation()}>
				<div className='modal__title'>
					<h1>{`Add new ${tokenType.toUpperCase()} Address`}</h1>
				</div>
				<div className='modal__input' onClick={(e) => e.stopPropagation()}>
					<input
						type='text'
						value={modalInput}
						onChange={changeModalInputHandler}
					/>
				</div>
				<div
					className='modal__button__container'
					onClick={(e) => e.stopPropagation()}>
					<div
						className='modal__submit__button'
						onClick={(e) => {
							e.stopPropagation();
							clickSubmitHandler();
						}}>
						<i className='far fa-check-circle'></i>
					</div>
					<div
						className='modal__cancel__button'
						onClick={(e) => {
							e.stopPropagation();
							setIsModalOpen();
						}}>
						<i className='fas fa-ban'></i>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddNewTokenAddrModal;
