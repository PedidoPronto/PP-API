import { Injectable } from '@nestjs/common';
import { GeneratorPassword } from '../../domain/ports/generator';
import { randomBytes } from 'node:crypto';

@Injectable()
export class PasswordGenerator implements GeneratorPassword {
  generate(size: number): string {
    return randomBytes(size).toString('hex');
  }
}
