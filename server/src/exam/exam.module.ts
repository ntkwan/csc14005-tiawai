import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { Submission, TestEntity } from './entities/exam.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubmissionController } from './submission/submission.controller';
import { SubmissionService } from './submission/submission.service';
import { AccessControlService } from 'src/shared/shared.service';
import { ChatModule } from 'src/chat/chat.module';
import { VectorStoreService } from 'src/vector-store/vector-store.service';

@Module({
    imports: [SequelizeModule.forFeature([TestEntity, Submission]), ChatModule],
    controllers: [ExamController, SubmissionController],
    providers: [
        ExamService,
        SubmissionService,
        AccessControlService,
        VectorStoreService,
    ],
    exports: [SubmissionService, ExamService],
})
export class ExamModule {}
