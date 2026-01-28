export class ResponseDto {
  status: 'success' | 'error';
  code: number;
  message: string;
  data?: any;
}
