import * as bcrypt from 'bcrypt';

export async function generateAndHashPassword(length = 12) {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
  let plainPassword = '';

  for (let i = 0; i < length; i++) {
    plainPassword += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  return { plain: plainPassword, hashed: hashedPassword };
}
