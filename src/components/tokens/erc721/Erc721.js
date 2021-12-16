import { useState } from 'react';
import erc721Abi from '../../../erc721Abi';

import './Erc721.css';

function Erc721({ web3, account, erc721list, erc721addr, setErc721list }) {
	const [to, setTo] = useState('');
	const sendToken = async (tokenAddr, tokenId) => {
		const tokenContract = await new web3.eth.Contract(erc721Abi, tokenAddr, {
			from: account,
		});
		tokenContract.methods
			.transferFrom(account, to, tokenId)
			.send({
				from: account,
			})
			.on('receipt', (receipt) => {
				setTo('');
				// TODO
				setErc721list(erc721list.filter((token) => token.tokenId !== tokenId));
			});
	};
	return (
		<div className='erc721list__container'>
			{erc721list.map((token) => {
				const { symbol, name, tokenId } = token;
				return (
					<div className='erc721__token__card' key={token.tokenId}>
						{/* TODO */}
						<img src={token.tokenURI} width={300} alt='' />
						Name: <span className='name'>{name}</span>(
						<span className='symbol'>{symbol}</span>)
						<div className='nft'>id: {tokenId}</div>
						<div className='tokenTransfer'>
							To:{' '}
							<input
								type='text'
								onChange={(e) => {
									setTo(e.target.value);
								}}></input>
							<button
								className='sendErc20Btn'
								onClick={sendToken.bind(this, erc721addr, token.tokenId)}>
								send token
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Erc721;
