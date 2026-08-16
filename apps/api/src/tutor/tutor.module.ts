import { Module } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { KnowledgeModule } from '../knowledge/knowledge.module';
import { TutorController } from './tutor.controller';

@Module({
  imports: [KnowledgeModule],
  providers: [TutorService],
  exports: [TutorService],
  controllers: [TutorController]
})
export class TutorModule {}
