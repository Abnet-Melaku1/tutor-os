import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KnowledgeService } from '../knowledge/knowledge.service';
import OpenAI from 'openai';

export interface ProcessTurnDto {
  sessionId: string;
  learnerId: string;
  message: string;
}

@Injectable()
export class TutorService {
  private readonly logger = new Logger(TutorService.name);
  private openai: OpenAI | null = null;

  // Inject KnowledgeService to use our RAG pipeline
  constructor(
    private readonly knowledgeService: KnowledgeService,
    private readonly configService: ConfigService
  ) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (apiKey) {
      this.openai = new OpenAI({ apiKey });
    } else {
      this.logger.warn('OPENAI_API_KEY is missing. LLM calls will fail until configured.');
    }
  }

  /**
   * The core agentic loop for processing a student's message.
   */
  async processTurn(dto: ProcessTurnDto) {
    this.logger.log(`Processing turn for session ${dto.sessionId}: "${dto.message}"`);

    // 1. Semantic Retrieval
    const relevantContext = await this.knowledgeService.retrieveRelevantConcepts(dto.message);
    const contextString = relevantContext.map(c => `- ${c.name}: ${c.description}`).join('\n');

    // 2. LLM Call
    let reply = 'This is a simulated tutor response. (LLM integration pending - OPENAI_API_KEY not set)';
    if (this.openai) {
      try {
        const response = await this.openai.chat.completions.create({
          model: 'gpt-4o', // Or gpt-4o-mini
          messages: [
            {
              role: 'system',
              content: `You are an adaptive AI tutor. Answer the student's question clearly and concisely.
Use the following relevant curriculum concepts as context:
${contextString}

Do not simply give away the direct answer. Ask guiding questions to lead the student to understanding.`
            },
            {
              role: 'user',
              content: dto.message
            }
          ],
          temperature: 0.7,
        });
        reply = response.choices[0].message.content || 'I encountered an error forming a response.';
      } catch (err) {
        this.logger.error('Failed to call OpenAI API', err);
        throw new InternalServerErrorException('LLM generation failed.');
      }
    }
    
    // 3. Memory Mutations (Stubbed for now)
    // TODO: Parse LLM response for KnowledgeState updates and Misconceptions

    return {
      reply,
      conceptsDiscussed: relevantContext.map(c => c.name),
      memoryMutations: []
    };
  }
}
