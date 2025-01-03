import { Controller, Post, Body } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { CreateSubmissionDto } from './dtos/create-submission.dto';
import { SubmissionDetailsEntity } from './entities/submission-details.entity';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/enums/roles.enum';
import { ATAuthGuard } from '../../auth/guards/at-auth.guard';
import { UseGuards, HttpCode } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiResponse,
} from '@nestjs/swagger';
@Controller('submission')
export class SubmissionController {
    constructor(private readonly submissionService: SubmissionService) {}

    @ApiOperation({
        summary: 'Create a submission for a test [USER]',
    })
    @ApiBody({
        type: CreateSubmissionDto,
    })
    @ApiResponse({
        status: 201,
        description: 'Submitted successfully',
        type: SubmissionDetailsEntity,
    })
    @HttpCode(201)
    @UseGuards(ATAuthGuard, RolesGuard)
    @ApiBearerAuth('access-token')
    @Roles(Role.USER)
    @Post()
    async create(@Body() createSubmissionDto: CreateSubmissionDto) {
        return this.submissionService.create(createSubmissionDto);
    }
}
