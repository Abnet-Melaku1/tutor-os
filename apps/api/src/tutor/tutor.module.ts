import { Module } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { KnowledgeModule } from '../knowledge/knowledge.module';

@Module({
  imports: [KnowledgeModule],
  providers: [TutorService],
  exports: [TutorService]
})
export class TutorModule {}
