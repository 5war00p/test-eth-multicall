import { Multicall } from 'ethereum-multicall';
import { EtherscanProvider } from 'ethers';
import erc20Abi from '../abi/erc20.json' assert { type: 'json' };
import { ETHERSCAN_API_KEY } from '../secretEnv.js';

  
  let provider = new EtherscanProvider('mainnet', ETHERSCAN_API_KEY);
  
  // you can use any ethers provider context here this example is
  // just shows passing in a default provider, ethers hold providers in
  // other context like wallet, signer etc all can be passed in as well.
  const multicall = new Multicall({ ethersProvider: provider, tryAggregate: true });
  
  const contractCallContext = [
      {
          reference: 'testContract1',
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          abi: erc20Abi,
          calls: [{ reference: 'testContract1', methodName: 'balanceOf', methodParameters: ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045"] }]
      },
      {
          reference: 'testContract2',
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          abi: erc20Abi,
          calls: [{ reference: 'testContract2', methodName: 'balanceOf', methodParameters: ["0x028171bCA77440897B824Ca71D1c56caC55b68A3"] }]
      }
  ];
  
  const results = await multicall.call(contractCallContext);
  console.log(results);
  
  // results:
//   {
//     results: {
//         testContract: {
//             originalContractCallContext:  {
//               reference: 'testContract',
//               contractAddress: '0x6795b15f3b16Cf8fB3E56499bbC07F6261e9b0C3',
//               abi: [ { name: 'foo', type: 'function', inputs: [ { name: 'example', type: 'uint256' } ], outputs: [ { name: 'amounts', type: 'uint256' }] } ],
//               calls: [{ reference: 'fooCall', methodName: 'foo', methodParameters: [42] }]
//             },
//             callsReturnContext: [{
//                 returnValues: [{ amounts: BigNumber }],
//                 decoded: true,
//                 reference: 'fooCall',
//                 methodName: 'foo',
//                 methodParameters: [42],
//                 success: true
//             }]
//         },
//         testContract2: {
//             originalContractCallContext:  {
//               reference: 'testContract2',
//               contractAddress: '0x66BF8e2E890eA0392e158e77C6381b34E0771318',
//               abi: [ { name: 'fooTwo', type: 'function', inputs: [ { name: 'example', type: 'uint256' } ], outputs: [ { name: 'amounts', type: 'uint256[]' ] } ],
//               calls: [{ reference: 'fooTwoCall', methodName: 'fooTwo', methodParameters: [42] }]
//             },
//             callsReturnContext: [{
//                 returnValues: [{ amounts: [BigNumber, BigNumber, BigNumber] }],
//                 decoded: true,
//                 reference: 'fooCall',
//                 methodName: 'foo',
//                 methodParameters: [42],
//                 success: true
//             }]
//         }
//     },
//     blockNumber: 10994677
//   }