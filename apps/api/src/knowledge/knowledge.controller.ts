import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Express } from 'express';

@Controller('knowledge')
export class KnowledgeController {
  constructor(@InjectQueue('curriculum') private curriculumQueue: Queue) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCurriculum(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    
    // Add file to the BullMQ processing queue
    const job = await this.curriculumQueue.add('process-file', {
      filename: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    });
    
    return {
      message: 'File queued for processing',
      jobId: job.id,
      filename: file.originalname,
    };
  }
}
