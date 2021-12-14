import { useState } from 'react';
import erc721Abi from '../erc721Abi';

function Erc721({ web3, account, erc721list, updateToken }) {
	const erc721addr = '0xEC48354e0D1A24F7adB820F93fAC7bF7DC5a40fb';
	const [to, setTo] = useState('');
	const sendToken = async (tokenAddr, tokenId) => {
		// 컨트랙트 객체를 가져옴
		// 어디서 tokenAddr을 가져와야할까
		// web3.eth.Contract(abi, addr) returns contract object
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
								// mod by dongmoon token.address => erc721addr
								onClick={sendToken.bind(this, erc721addr, token.tokenId)}>
								send token
							</button>
						</div>
						{JSON.stringify(token)}
					</div>
				);
			})}
		</div>
	);
}

export default Erc721;
