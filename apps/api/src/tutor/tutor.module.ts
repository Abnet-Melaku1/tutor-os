import { Module } from '@nestjs/common';
import { TutorService } from './tutor.service';

@Module({
  providers: [TutorService]
})
export class TutorModule {}
