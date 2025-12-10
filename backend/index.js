// Esegui nel terminale del progetto (Linux)
const jwt = require('jsonwebtoken');

require('dotenv').config();

// sostituisci con i valori reali presi dallo stesso punto di lettura usato in runtime
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OTBjYWE3NDA0MDdkOTIzOWUyNmFkMGMiLCJpYXQiOjE3NjI2MDEyNDUsImV4cCI6MTc2MjYwMjE0NX0.1VK8vx4IQDX83uDcfeMxCIbUfAQTV2BmKmQu7r7QZyc'; // copia qui il token completo
const secretFromAuthService = process.env.SECRET; // o dove leggi il secret per sign
const secretFromStrategy = process.env.SECRET_REFRESH; // o dove leggi il secret per verify

console.log(
  'len/sign prefix:',
  typeof secretFromAuthService,
  secretFromAuthService?.length,
  secretFromAuthService?.slice(0, 8),
);
console.log(
  'len/verify prefix:',
  typeof secretFromStrategy,
  secretFromStrategy?.length,
  secretFromStrategy?.slice(0, 8),
);
console.log(
  'bytes sign (first 16):',
  Array.from(Buffer.from(String(secretFromAuthService || ''), 'utf8')).slice(
    0,
    16,
  ),
);
console.log(
  'bytes verify (first 16):',
  Array.from(Buffer.from(String(secretFromStrategy || ''), 'utf8')).slice(
    0,
    16,
  ),
);
console.log(
  'exact equal:',
  Buffer.from(String(secretFromAuthService || ''), 'utf8').equals(
    Buffer.from(String(secretFromStrategy || ''), 'utf8'),
  ),
);

try {
  console.log(
    'verify result:',
    jwt.verify(token, secretFromStrategy || secretFromAuthService),
  );
} catch (e) {
  console.error('verify error:', e && e.message);
}
