import { Algorithm } from 'jsonwebtoken';

export interface TokenOptionsInterface {
  secretKey: string;
  expiresIn: number;
  algorithm?: Algorithm;
}
