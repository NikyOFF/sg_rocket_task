import { Algorithm } from 'jsonwebtoken';

export interface TokenDataInterface {
  value: string;
  algorithm: Algorithm;
  expiresIn: number;
  jwtid: string;
}
