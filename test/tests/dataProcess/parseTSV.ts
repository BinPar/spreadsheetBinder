import dataFromMIR from '../../data/dataFromMIR';
import processDataText from '../../../src/processDataText';

export default test('adds 1 + 2 to equal 3', (): void => {
  const data = processDataText(dataFromMIR);  
  expect(data.headers.length).toBe(11);
  expect(data.body.length).toBe(16176);  
});
