import { Module } from '@nestjs/common';
import { AiService } from './ai/ai.service';
import { ProductModule } from './product/product.module';
import { ChatModule } from './chat/chat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfigManager } from './config/db.config';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...databaseConfigManager.getTypeOrmConfig()
    }),
    ProductModule,
    ChatModule,
    AiModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
