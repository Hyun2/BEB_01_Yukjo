import { useState } from 'react';
import erc721Abi from '../erc721Abi';

function Erc721({ web3, account, erc721list }) {
	// TODO: 하드 코딩된 토큰 컨트랙트 주소
	const erc721addr = '0xEC48354e0D1A24F7adB820F93fAC7bF7DC5a40fb';
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
			});
	};
	return (
		<div className='erc721list'>
			{erc721list.map((token) => {
				return (
					<div className='erc721token' key={token.tokenId}>
						Name: <span className='name'>{token.name}</span>(
						<span className='symbol'>{token.symbol}</span>)
						<div className='nft'>id: {token.tokenId}</div>
						<img src={token.tokenURI} width={300} alt='' />
						<div className='tokenTransfer'>
							To:{' '}
							<input
								type='text'
								value={to}
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
