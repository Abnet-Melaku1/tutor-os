import { Controller, Post, Body, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { TutorService, ProcessTurnDto } from './tutor.service';

@Controller('tutor')
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  @Post('chat')
  @HttpCode(HttpStatus.OK)
  async chat(@Body() dto: ProcessTurnDto) {
    if (!dto.sessionId || !dto.learnerId || !dto.message) {
      throw new BadRequestException('Missing required fields: sessionId, learnerId, or message');
    }
    
    const response = await this.tutorService.processTurn(dto);
    return response;
  }
}
