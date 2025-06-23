import { useState } from 'react';
import { generatePassword } from '../utils/passwordGenerator';
import type { PasswordOptions } from '../utils/passwordGenerator';

const PasswordGenerator = () => {
  const [key, setKey] = useState('');
  const [phrase, setPhrase] = useState('');
  const [password, setPassword] = useState('');
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeNumbers: true,
    includeSymbols: true,
    includeUppercase: true,
  });
  const [copied, setCopied] = useState(false);

  const handleGeneratePassword = () => {
    if (key && phrase) {
      const generatedPassword = generatePassword(key, phrase, options);
      setPassword(generatedPassword);
      setCopied(false);
    }
  };

  const handleCopyPassword = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="password-generator">
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>
        Secure Password Generator
      </h2>
      
      <div className="input-group">
        <label className="input-label">Key</label>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="input-field"
          placeholder="Enter your key"
        />
      </div>

      <div className="input-group">
        <label className="input-label">Phrase</label>
        <input
          type="text"
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          className="input-field"
          placeholder="Enter your phrase"
        />
      </div>

      <div className="input-group">
        <label className="input-label">Options</label>
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={options.includeUppercase}
              onChange={(e) => setOptions({ ...options, includeUppercase: e.target.checked })}
            />
            Uppercase
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={options.includeNumbers}
              onChange={(e) => setOptions({ ...options, includeNumbers: e.target.checked })}
            />
            Numbers
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={options.includeSymbols}
              onChange={(e) => setOptions({ ...options, includeSymbols: e.target.checked })}
            />
            Symbols
          </label>
        </div>
        <div className="input-group">
          <label className="input-label">Length</label>
          <input
            type="number"
            value={options.length}
            onChange={(e) => setOptions({ ...options, length: Math.max(8, Math.min(32, parseInt(e.target.value) || 16)) })}
            onKeyDown={(e) => {
              if (e.key === 'ArrowUp') {
                e.preventDefault();
                setOptions({ ...options, length: Math.min(32, (options.length || 16) + 1) });
              } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setOptions({ ...options, length: Math.max(8, (options.length || 16) - 1) });
              } else {
                e.preventDefault(); // Prevent manual input
              }
            }}
            className="input-field"
            style={{ width: '6rem', cursor: 'default' }}
            min="8"
            max="32"
            inputMode="none"
          />
        </div>
      </div>

      <button
        onClick={handleGeneratePassword}
        disabled={!key || !phrase}
        className="button"
      >
        Generate Password
      </button>

      {password && (
        <div className="password-display">
          <div>{password}</div>
          <button
            onClick={handleCopyPassword}
            className="copy-button"
          >
            {copied ? '✓ Copied!' : 'Copy'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;
