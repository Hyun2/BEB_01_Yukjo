import React, { useEffect, useState } from 'react';
import './AddNewTokenAddrModal.css';
function AddNewTokenAddrModal({
	tokenType,
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
		} else {
			setNewErc721addr(modalInput);
			await addNewErc721Token();
		}
	};

	return (
		<div className='modal_container'>
			<div className='modal'>
				<div className='modal__title'>Modal</div>
				<div className='modal__input'>
					<input
						type='text'
						value={modalInput}
						onChange={changeModalInputHandler}
					/>
					<button onClick={clickSubmitHandler}>submit addr</button>
				</div>
			</div>
		</div>
	);
}

export default AddNewTokenAddrModal;
