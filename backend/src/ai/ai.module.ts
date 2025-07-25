import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KbEntity } from './kb.entity';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([KbEntity])
  ],
  providers: [AiService],
  controllers: [AiController]
})
export class AiModule {}
