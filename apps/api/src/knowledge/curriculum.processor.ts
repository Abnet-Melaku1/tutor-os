import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';

@Processor('curriculum')
export class CurriculumProcessor extends WorkerHost {
  private readonly logger = new Logger(CurriculumProcessor.name);

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`Processing job ${job.id} for file ${job.data.filename}`);
    
    // TODO: read the file, chunk it, and pass to embedding model
    // Simulating the processing for now
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    this.logger.log(`Finished processing job ${job.id}`);
    return { success: true, chunksProcessed: 5 };
  }
}
