import { cleanStringForAssociation } from '../../../src/processResult';

export default test('Clean String For Association', (): void => {
  expect(cleanStringForAssociation('Asd', 'string')).toBe('asd');
  expect(cleanStringForAssociation('Ásd', 'string')).toBe('asd');
  expect(cleanStringForAssociation('ásd', 'string')).toBe('asd');
  expect(cleanStringForAssociation('ÁÉÍÓÚÜÑáéíóúüñ', 'string')).toBe('aeiouunaeiouun');
  expect(cleanStringForAssociation('Nacho  Ferro', 'string')).toBe('nacho ferro');
  expect(cleanStringForAssociation('Nacho. |, -Ferro', 'string')).toBe('nacho ferro');
  expect(cleanStringForAssociation(' Nacho. |, -@ binpar ', 'email')).toBe('nacho@binpar');
  expect(cleanStringForAssociation('***1987*R', 'string')).toBe('***1987*r');
  expect(cleanStringForAssociation('***1987*R', 'dni')).toBe('1987r');
});
