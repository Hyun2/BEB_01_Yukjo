import Erc721 from './Erc721';

// TokenList.js
function TokenList({ web3, account, erc721list, newErc721addr }) {
	return (
		<div className='tokenlist'>
			<Erc721
				web3={web3}
				account={account}
				erc721list={erc721list}
				erc721addr={newErc721addr}
			/>
		</div>
	);
}

export default TokenList;
