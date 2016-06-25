import crypto from 'crypto';

function gen(password) {
  const randomSalt = crypto.randomBytes(16).toString('base64');
  const bufferSalt = new Buffer(randomSalt, 'base64');
  const hashPassword = crypto.pbkdf2Sync(password, bufferSalt, 10000, 64).toString('base64');
  console.log('salt:  ', randomSalt);
  console.log('password:  ', hashPassword);
  return (randomSalt, hashPassword);
}

const password = process.argv[2];

gen(password);
