import { getDefaultProvider } from 'ethers';
import { Provider } from 'ethcall';
import { ETHERSCAN_API_KEY } from '../secretEnv.js';

const run = async () => {
  const provider = getDefaultProvider('mainnet', { etherscan: ETHERSCAN_API_KEY});
  const ethcallProvider = new Provider(1, provider);

  const accounts = [
    '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    '0x22d8432cc7aA4f8712a655fC4cdfB1baEC29FCA9',
  ];

  const calls = accounts.map((account) =>
    ethcallProvider.getEthBalance(account),
  );
  const balances = await ethcallProvider.tryAll(calls);
  console.log(balances);
}

run()