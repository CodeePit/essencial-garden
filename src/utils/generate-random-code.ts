export function generateRandomCode(length: number): string {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let code = '';
  for (let i = 0; i < length; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}