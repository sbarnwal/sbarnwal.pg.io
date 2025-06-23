import { SHA256 } from 'crypto-js';

interface PasswordOptions {
  length?: number;
  includeNumbers?: boolean;
  includeSymbols?: boolean;
  includeUppercase?: boolean;
}

const DEFAULT_OPTIONS: PasswordOptions = {
  length: 16,
  includeNumbers: true,
  includeSymbols: true,
  includeUppercase: true,
};

const generatePassword = (key: string, phrase: string, options: PasswordOptions = DEFAULT_OPTIONS): string => {
  // Combine key and phrase to create a unique seed
  const seed = `${key}:${phrase}`;
  
  // Generate a secure hash using SHA-256
  const hash = SHA256(seed).toString();
  
  // Character sets for password generation
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  // Build character set based on options
  let chars = lowercase;
  if (options.includeUppercase) chars += uppercase;
  if (options.includeNumbers) chars += numbers;
  if (options.includeSymbols) chars += symbols;
  
  // Use the hash to generate the password
  let password = '';
  const length = options.length || DEFAULT_OPTIONS.length!;
  
  // Use different parts of the hash to generate the password
  for (let i = 0; i < length; i++) {
    const index = parseInt(hash.substr(i * 2, 2), 16) % chars.length;
    password += chars[index];
  }
  
  // Ensure password meets requirements
  if (options.includeUppercase) {
    const pos = parseInt(hash.substr(0, 2), 16) % length;
    password = password.substr(0, pos) + uppercase[parseInt(hash.substr(2, 2), 16) % uppercase.length] + password.substr(pos + 1);
  }
  
  if (options.includeNumbers) {
    const pos = parseInt(hash.substr(4, 2), 16) % length;
    password = password.substr(0, pos) + numbers[parseInt(hash.substr(6, 2), 16) % numbers.length] + password.substr(pos + 1);
  }
  
  if (options.includeSymbols) {
    const pos = parseInt(hash.substr(8, 2), 16) % length;
    password = password.substr(0, pos) + symbols[parseInt(hash.substr(10, 2), 16) % symbols.length] + password.substr(pos + 1);
  }
  
  return password;
};

export { generatePassword };
export type { PasswordOptions };
