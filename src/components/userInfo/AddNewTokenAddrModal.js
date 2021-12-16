import React, { useState } from 'react';

function AddNewTokenAddrModal({
	tokenType,
	addNewErc721Token,
	addNewErc20Token,
	setNewErc20addr,
	setNewErc721addr,
}) {
	const [modalInput, setModalInput] = useState('');
	const changeModalInputHandler = (e) => {
		setModalInput(e.target.value);
	};
	const clickSubmitHandler = async () => {
		if (tokenType === 'erc20') {
			await setNewErc20addr(modalInput);
			await addNewErc20Token();
		} else {
			await setNewErc721addr(modalInput);
			await addNewErc721Token();
		}
	};
	return (
		<div className='modal_container'>
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
	);
}

export default AddNewTokenAddrModal;
