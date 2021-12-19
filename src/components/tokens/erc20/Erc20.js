import { useState } from 'react';
import { useStore } from '../../../store.js';
import erc20Abi from '../../../erc20Abi.js';

import Erc20SendTokenModal from './Erc20SendTokenModal';

import './Erc20.css';
import Loading from '../../loading/Loading.js';

function Erc20({ web3, account, erc20list, updateErc20TokenBalance }) {
	// TODO: 하드 코딩된 토큰 컨트랙트 주소
	const [to, setTo] = useState('');
	const [amount, setAmount] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedTokenAddr, setSelectedTokenAddr] = useState('');

	const [isLoading, setIsLoading] = useStore((state) => [
		state.isLoading,
		state.setIsLoading,
	]);

	const sendToken = async () => {
		console.log('SendToken20 called');
		setIsLoading(true);
		try {
			const tokenContract = await new web3.eth.Contract(
				erc20Abi,
				selectedTokenAddr,
				{
					from: account,
				}
			);
			if (amount > 0) {
				await tokenContract.methods
					.transfer(to, web3.utils.toWei(amount, 'ether'))
					.send({
						from: account,
					})
					.on('confirmation', (receipt) => {
						setTo('');
						// TODO: Token 전송 후 잔액 수정하는 부분
						updateErc20TokenBalance(selectedTokenAddr);
						setIsLoading(false);
						setIsModalOpen(false);
					});
			}
		} catch (e) {
			// console.log('catch called');

			switch (e.code) {
				case 4001:
					alert('user denied');
					break;

				default:
					alert(e);
					break;
			}

			setIsLoading(false);
			setIsModalOpen(false);
		}
	};
	return (
		// test
		<div className='erc20list__container'>
			{isLoading && <Loading />}
			{isModalOpen && (
				<Erc20SendTokenModal
					amount={amount}
					setAmount={setAmount}
					sendToken={sendToken}
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
					setTo={setTo}
					to={to}
				/>
			)}
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
							<div
								className='token__send__button'
								onClick={() => {
									setIsModalOpen(!isModalOpen);
									setSelectedTokenAddr(token.addr);
								}}
								title='send erc20 token'>
								<i className='fas fa-arrow-alt-circle-right'></i>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Erc20;
