import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnowledgeModule } from './knowledge/knowledge.module';
import { TutorModule } from './tutor/tutor.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    }),
    KnowledgeModule,
    TutorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
