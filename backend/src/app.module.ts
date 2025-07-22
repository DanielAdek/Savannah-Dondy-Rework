import { Module } from '@nestjs/common';
import { AiService } from './ai/ai.service';
import { ProductModule } from './product/product.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [ProductModule, ChatModule],
  controllers: [],
  providers: [AiService],
})
export class AppModule {}
