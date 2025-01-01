import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FlashcardEntity } from './entities/flashcard.entity';
import { FlashcardController } from './flashcard.controller';
import { FlashcardService } from './flashcard.service';
import { AccessControlService } from 'src/shared/shared.service';

@Module({
    imports: [SequelizeModule.forFeature([FlashcardEntity])],
    controllers: [FlashcardController],
    providers: [FlashcardService, AccessControlService],
    exports: [FlashcardService],
})
export class FlashcardModule {}
