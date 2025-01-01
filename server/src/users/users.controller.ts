import {
    Controller,
    UseGuards,
    Request,
    Res,
    Get,
    HttpCode,
} from '@nestjs/common';
import { Response } from 'express';
import { ATAuthGuard } from '../auth/guards/at-auth.guard';
import { ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProfileEntity } from '../auth/entities/creds.entity';
import { UsersService } from './users.service';
import { UserStatsEntity } from './entities/user-stats.entity';
import { UserStatsDto } from './dtos/user-stat.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';

@Controller('user')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @ApiOperation({ summary: 'Get all profiles [ADMIN]' })
    @ApiBearerAuth('access-token')
    @Get('users')
    @ApiResponse({
        status: 200,
        description: 'Get all profiles successfully',
        type: [ProfileEntity],
    })
    @UseGuards(ATAuthGuard, RolesGuard)
    @ApiBearerAuth('access-token')
    @Roles(Role.ADMIN)
    @HttpCode(200)
    async getAllProfiles(@Request() req: any, @Res() res: Response) {
        const foundUsers: {
            email: string;
            username: string;
            id: string;
        }[] = await this.userService.getAllProfiles();
        res.send(foundUsers);
    }

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
