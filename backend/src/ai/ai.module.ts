import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KbEntity } from './kb.entity';
import { AiService } from './ai.service';

@Module({
  imports: [TypeOrmModule.forFeature([KbEntity])],
  providers: [AiService]
})
export class AiModule {}
