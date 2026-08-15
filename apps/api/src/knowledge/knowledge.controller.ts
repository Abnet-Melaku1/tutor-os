import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('knowledge')
export class KnowledgeController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCurriculum(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    
    // In the next step we will pass this to the BullMQ worker
    return {
      message: 'File received for processing',
      filename: file.originalname,
      size: file.size,
    };
  }
}
