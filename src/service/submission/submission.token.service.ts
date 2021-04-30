import { Injectable } from '@nestjs/common'

@Injectable()
export class SubmissionTokenService {
  async hash(token: string): Promise<string> {
    return token
  }

  async verify(token: string, hash: string): Promise<boolean> {
    return token == hash
  }
}
