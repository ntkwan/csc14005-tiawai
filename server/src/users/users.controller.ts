import { Controller, UseGuards, Request, Res, Get } from '@nestjs/common';
import { Response } from 'express';
import { ATAuthGuard } from '../auth/guards/at-auth.guard';
import { ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProfileEntity } from '../auth/entities/creds.entity';
import { UsersService } from './users.service';
import { UserStatsEntity } from './entities/user-stats.entity';
import { UserStatsDto } from './dtos/user-stat.dto';

@Controller('user')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @ApiOperation({ summary: 'Get profile with credentials [USER]' })
    @ApiBearerAuth('access-token')
    @Get()
    @ApiResponse({
        status: 200,
        description: 'Get profile successfully',
        type: ProfileEntity,
    })
    @UseGuards(ATAuthGuard)
    async getMyProfile(@Request() req: any, @Res() res: Response) {
        const foundUser = await this.userService.getMyProfile(req.user);
        res.send({
            email: foundUser.email,
            username: foundUser.username,
            id: foundUser.id,
        });
    }

    @ApiOperation({
        summary: 'Get profile study stats with credentials [USER]',
    })
    @ApiBearerAuth('access-token')
    @Get('exam')
    @ApiResponse({
        status: 200,
        description: 'Get user study stats successfully',
        type: UserStatsEntity,
    })
    @UseGuards(ATAuthGuard)
    async getUserStudyStats(@Request() req: any, @Res() res: Response) {
        const stats: UserStatsDto = await this.userService.getProfileStudyStats(
            req.user,
        );
        res.send({
            examPracticeCount: stats.examPracticeCount,
            specializedExamPracticeCount: stats.specializedExamPracticeCount,
            vocabsPracticeCount: stats.vocabsPracticeCount,
        });
    }
}
