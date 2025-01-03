import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserSignUpDto } from './dtos/user-signup.dto';
import { UsersController } from './users.controller';
import { SubmissionService } from '../exam/submission/submission.service';
import { Submission, TestEntity } from '../exam/entities/exam.entity';
import { AccessControlService } from 'src/shared/shared.service';
import { FlashcardModule } from 'src/flashcard/flashcard.module';
import { FlashcardService } from 'src/flashcard/flashcard.service';
import { FlashcardEntity } from 'src/flashcard/entities/flashcard.entity';
import { ExamModule } from 'src/exam/exam.module';
@Module({
    imports: [
        SequelizeModule.forFeature([
            User,
            Submission,
            FlashcardEntity,
            TestEntity,
        ]),
        UserSignUpDto,
        FlashcardModule,
        ExamModule,
    ],
    controllers: [UsersController],
    providers: [
        UsersService,
        SubmissionService,
        AccessControlService,
        FlashcardService,
    ],
    exports: [UsersService, UserSignUpDto],
})
export class UsersModule {}
