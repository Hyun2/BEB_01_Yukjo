import { useState } from 'react';
import erc20Abi from '../../../erc20Abi.js';

import './Erc20.css';

function Erc20({
	web3,
	account,
	erc20list,
	newErc20addr,
	setErc20list,
	updateErc20TokenBalance,
}) {
	// TODO: 하드 코딩된 토큰 컨트랙트 주소
	const [to, setTo] = useState('');
	const [amount, setAmount] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const sendToken = async (tokenAddr) => {
		console.log(tokenAddr);
		console.log(account, to, parseInt(amount));
		console.log(typeof account, typeof to, typeof parseInt(amount));
		setIsLoading(true);
		try {
			const tokenContract = await new web3.eth.Contract(erc20Abi, tokenAddr, {
				from: account,
			});
			if (amount > 0) {
				tokenContract.methods
					.transfer(to, web3.utils.toWei(amount, 'ether'))
					.send({
						from: account,
					})
					.on('receipt', (receipt) => {
						setTo('');
						// TODO: Token 전송 후 잔액 수정하는 부분
						updateErc20TokenBalance(tokenAddr);
						setIsLoading(false);
					});
			}
		} catch (e) {
			setIsLoading(false);
			console.log(e);
		}
	};
	return (
		// test
		<div className='erc20list__container'>
			{erc20list.map((token) => {
				const { symbol, name, balance } = token;
				const tokenIdentifier = symbol + name;
				return (
					<div className='erc20__token__card' key={tokenIdentifier}>
						<div className='erc20__token__profile'>
							<h1 className='erc20__token__profile__name'>{`${name} (${symbol})`}</h1>
							<h2 className='erc20__token__profile__balance'>{balance}</h2>
						</div>
						<div className='erc20__token__transfer'>
							<label htmlFor='token__transfer__to'>To</label>
							<input
								className='erc20__token'
								type='text'
								id='token__transfer__to'
								onChange={(e) => {
									setTo(e.target.value);
								}}></input>
							<label htmlFor='token__transfer__amount'>Amount</label>
							<input
								id='token__transfer__amount'
								type='number'
								onChange={(e) => setAmount(e.target.value)}
							/>
							<button
								className='sendErc20Btn'
								onClick={() => {
									sendToken(newErc20addr);
								}}>
								send token
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Erc20;
