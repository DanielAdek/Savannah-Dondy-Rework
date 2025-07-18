import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModel } from './chat.schema';

@Module({
  imports: [TypeOrmModule.forFeature([ChatModel])],
  providers: [ChatService],
  controllers: [ChatController]
})
export class ChatModule {}
