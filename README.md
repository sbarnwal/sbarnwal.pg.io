# Secure Password Generator

A secure password generator that creates strong passwords based on a key and phrase combination. The application uses cryptographic hashing to generate passwords without storing them, ensuring that the same key and phrase will always generate the same password.

## Features

- Generate secure passwords using a key and phrase combination
- Customizable password options:
  - Length (8-32 characters)
  - Include uppercase letters
  - Include numbers
  - Include special symbols
- Copy password to clipboard with one click
- No password storage - passwords are generated on-demand
- Secure password generation using SHA-256 hashing

## Security

The password generator uses the following security measures:
- Passwords are never stored
- Uses cryptographic hashing (SHA-256) for password generation
- The password generation logic is obfuscated in the compiled code
- Key input is masked

## Usage

1. Enter your secret key (this should be something you remember but don't share)
2. Enter a unique phrase (this can be related to the service you're creating the password for)
3. Customize password options as needed
4. Click "Generate Password"
5. Use the "Copy" button to copy the password to your clipboard

## Development

To run the project locally:

```bash
npm install
npm run dev
```

## Building for Production

To create a production build:

```bash
npm run build
```
```
