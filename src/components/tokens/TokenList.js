import Erc721 from './erc721/Erc721';
import Erc20 from './erc20/Erc20';

// TokenList.js
function TokenList({
	web3,
	account,
	erc721list,
	newErc721addr,
	setErc721list,
	erc20list,
	newErc20addr,
	setErc20list,
	updateErc20TokenBalance,
}) {
	return (
		<div className='tokenlist'>
			<Erc20
				web3={web3}
				account={account}
				erc20list={erc20list}
				newErc20addr={newErc20addr}
				setErc20list={setErc20list}
				updateErc20TokenBalance={updateErc20TokenBalance}
			/>

			<Erc721
				web3={web3}
				account={account}
				erc721list={erc721list}
				erc721addr={newErc721addr}
				setErc721list={setErc721list}
			/>
		</div>
	);
}

export default TokenList;
