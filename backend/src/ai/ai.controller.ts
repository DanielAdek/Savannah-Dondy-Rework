import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  /**
   *
   */
  constructor(
    private readonly aiService: AiService
  ) {}

  @Post("/message")
  public async getSimilarSearch(@Body() param: { message: string }) {
    return this.aiService.getSimilarDocuments(param.message);
  }
}
