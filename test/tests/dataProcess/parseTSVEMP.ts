import dataFromEMP from '../../data/dataFromEMP';
import processDataText from '../../../src/processDataText';

export default test('Test data From MIR', (): void => {
  const data = processDataText(dataFromEMP);  
  expect(data.headers.length).toBe(7); 
});
