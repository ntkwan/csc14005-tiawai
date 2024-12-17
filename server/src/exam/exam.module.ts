import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { Submission, TestEntity } from './entities/exam.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubmissionController } from './submission/submission.controller';
import { SubmissionService } from './submission/submission.service';
import { AccessControlService } from 'src/shared/shared.service';

@Module({
    imports: [SequelizeModule.forFeature([TestEntity, Submission])],
    controllers: [ExamController, SubmissionController],
    providers: [ExamService, SubmissionService, AccessControlService],
    exports: [SubmissionService],
})
export class ExamModule {}
