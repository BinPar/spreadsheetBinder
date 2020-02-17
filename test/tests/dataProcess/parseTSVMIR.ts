import dataFromMIR from '../../data/dataFromMIR';
import processDataText from '../../../src/processDataText';

export default test('Test data From MIR', (): void => {
  const data = processDataText(dataFromMIR);  
  expect(data.headers.length).toBe(11);
  expect(data.body.length).toBe(16176);
});
