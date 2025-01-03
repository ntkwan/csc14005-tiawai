import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PracticeController } from './practice.controller';
import { PracticeService } from './practice.service';
import { TestEntity } from 'src/exam/entities/exam.entity';
import { AccessControlService } from 'src/shared/shared.service';
import { ChatModule } from 'src/chat/chat.module';

@Module({
    imports: [SequelizeModule.forFeature([TestEntity]), ChatModule],
    controllers: [PracticeController],
    providers: [PracticeService, AccessControlService],
    exports: [PracticeService],
})
export class PracticeModule {}
