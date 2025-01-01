// paraphrase.module.ts
import { Module } from '@nestjs/common';
import { AIController } from './ai.controller';
import { AIService } from './ai.service';
import { AccessControlService } from 'src/shared/shared.service';

@Module({
    controllers: [AIController],
    providers: [AIService, AccessControlService],
})
export class AIModule {}
