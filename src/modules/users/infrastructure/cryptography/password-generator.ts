import { Injectable } from '@nestjs/common';
import { GeneratorPassword } from '../providers/generator';
import { randomBytes } from 'node:crypto';

@Injectable()
export class PasswordGenerator implements GeneratorPassword {
  generate(size: number = 10): string {
    return randomBytes(size).toString('hex');
  }
}
