import * as bcrypt from 'bcryptjs';

const hashCripto = (password: string) => bcrypt.hashSync(password, 10);

export default hashCripto;
