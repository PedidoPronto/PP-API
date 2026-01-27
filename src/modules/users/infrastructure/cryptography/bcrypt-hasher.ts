import { Injectable } from '@nestjs/common';
import { Hasher } from '../providers/hasher';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class BcryptHasher implements Hasher {
  hash(plainPassword: string): Promise<string> {
    return hash(plainPassword, 10);
  }

  compare(plainPassword: string, hash: string): Promise<boolean> {
    return compare(plainPassword, hash);
  }
}
