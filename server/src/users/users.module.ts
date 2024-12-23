import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserSignUpDto } from './dtos/user-signup.dto';
import { UsersController } from './users.controller';
import { SubmissionService } from '../exam/submission/submission.service';
import { Submission } from '../exam/entities/exam.entity';
@Module({
    imports: [SequelizeModule.forFeature([User, Submission]), UserSignUpDto],
    controllers: [UsersController],
    providers: [UsersService, SubmissionService],
    exports: [UsersService, UserSignUpDto],
})
export class UsersModule {}
