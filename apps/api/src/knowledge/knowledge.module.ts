import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { KnowledgeService } from './knowledge.service';
import { KnowledgeController } from './knowledge.controller';
import { CurriculumProcessor } from './curriculum.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'curriculum',
    }),
  ],
  providers: [KnowledgeService, CurriculumProcessor],
  controllers: [KnowledgeController],
  exports: [KnowledgeService],
})
export class KnowledgeModule {}
