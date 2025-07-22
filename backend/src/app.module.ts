import { Module } from '@nestjs/common';
import { AiService } from './ai/ai.service';
import { ProductModule } from './product/product.module';
import { ChatModule } from './chat/chat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfigManager } from './config/db.config';
import { AiModule } from './ai/ai.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...typeormConfigManager.getTypeOrmConfig()
    }),
    ProductModule,
    ChatModule,
    AiModule
  ],
  controllers: [],
  providers: [AiService],
})
export class AppModule {}
