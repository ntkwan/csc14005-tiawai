// paraphrase.module.ts
import { Module } from '@nestjs/common';
import { ParaphraseController } from './paraphrase.controller';
import { ParaphraseService } from './paraphrase.service';
import { AccessControlService } from 'src/shared/shared.service';

@Module({
    controllers: [ParaphraseController],
    providers: [ParaphraseService, AccessControlService],
})
export class ParaphraseModule {}
