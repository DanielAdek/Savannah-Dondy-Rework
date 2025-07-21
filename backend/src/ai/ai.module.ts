import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KbModel } from './kb.schema';
import { AiService } from './ai.service';

@Module({
  imports: [TypeOrmModule.forFeature([KbModel])],
  providers: [AiService]
})
export class AiModule {}
