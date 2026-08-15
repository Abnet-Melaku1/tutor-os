import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnowledgeModule } from './knowledge/knowledge.module';

@Module({
  imports: [KnowledgeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
