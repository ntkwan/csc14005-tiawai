import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    HttpCode,
    UseGuards,
    Request,
} from '@nestjs/common';
import { ExamService } from './exam.service';
import { CreateTestDto } from './dtos/create-test.dto';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiResponse,
} from '@nestjs/swagger';
import { TestEntity } from './entities/exam.entity';
import { ATAuthGuard } from '../auth/guards/at-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/roles.enum';
import { PublicTestQuestionsEntity } from './entities/public-test-questions.entity';
import { PublicTestResultsEntity } from './entities/public-test-results.entity';
import { TestDetailsEntity } from './entities/test-details.entity';
import { PrivateTestQuestionsEntity } from './entities/private-test-questions.entity';

@Controller('exam')
export class ExamController {
    constructor(private readonly examService: ExamService) {}

    @ApiOperation({
        summary: 'Get all exams [ADMIN]',
    })
    @ApiResponse({
        status: 200,
        description: 'Get all tests successfully',
        type: PrivateTestQuestionsEntity,
    })
    @HttpCode(200)
    @UseGuards(ATAuthGuard, RolesGuard)
    @ApiBearerAuth('access-token')
    @Roles(Role.ADMIN)
    @Get('admin/exams')
    async privateFindAll() {
        return this.examService.privateFindAll();
    }

    @ApiOperation({
        summary: 'Create a new test [ADMIN]',
    })
    @ApiBody({
        type: CreateTestDto,
    })
    @ApiResponse({
        status: 201,
        description: 'The test has been successfully created.',
        type: TestEntity,
    })
    @HttpCode(201)
    @UseGuards(ATAuthGuard, RolesGuard)
    @ApiBearerAuth('access-token')
    @Roles(Role.ADMIN)
    @Post()
    async create(@Request() req: any, @Body() createTestDto: CreateTestDto) {
        return this.examService.create(req.user, createTestDto);
    }

    @ApiOperation({
        summary: 'Get test results by id [USER]',
    })
    @ApiResponse({
        status: 200,
        description: 'Get test results successfully',
        type: PublicTestResultsEntity,
    })
    @HttpCode(200)
    @UseGuards(ATAuthGuard, RolesGuard)
    @ApiBearerAuth('access-token')
    @Roles(Role.USER)
    @Get(':id/result/:submissionId')
    async getSubmissionResult(
        @Param('id') id: number,
        @Param('submissionId') submissionId: string,
    ) {
        return this.examService.getSubmissionResult(+id, submissionId);
    }

    @ApiOperation({
        summary: 'Get all exams [USER]',
    })
    @ApiResponse({
        status: 200,
        description: 'Get all tests successfully',
        type: PublicTestQuestionsEntity,
    })
    @HttpCode(200)
    @UseGuards(ATAuthGuard, RolesGuard)
    @ApiBearerAuth('access-token')
    @Roles(Role.USER)
    @Get()
    async publicFindAll() {
        return this.examService.publicFindAll();
    }

    @ApiOperation({
        summary: 'Get all submissions of user by test ID [USER]',
    })
    @ApiResponse({
        status: 200,
        description: 'Get all submissions successfully',
        type: PublicTestResultsEntity,
    })
    @HttpCode(200)
    @UseGuards(ATAuthGuard, RolesGuard)
    @ApiBearerAuth('access-token')
    @Roles(Role.USER)
    @Get(':id/submissions')
    async getSubmissions(@Request() req: any, @Param('id') id: number) {
        return this.examService.getSubmissionsByTestId(req.user, +id);
    }

    @ApiOperation({
        summary: 'Get all practice exams [USER]',
    })
    @ApiResponse({
        status: 200,
        description: 'Get all practice tests successfully',
        type: PublicTestQuestionsEntity,
    })
    @HttpCode(200)
    @UseGuards(ATAuthGuard, RolesGuard)
    @ApiBearerAuth('access-token')
    @Roles(Role.USER)
    @Get('practices')
    async privateFindAllPractice(@Request() req: any) {
        return this.examService.privateFindAllPractice(req.user);
    }

    @ApiOperation({
        summary: 'Get test by ID [USER]',
    })
    @ApiResponse({
        status: 200,
        description: 'Get test successfully',
        type: TestDetailsEntity,
    })
    @HttpCode(200)
    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.examService.findById(+id);
    }

    @ApiOperation({
        summary: 'Delete a test by ID [ADMIN]',
    })
    @ApiResponse({
        status: 204,
        description: 'The test has been successfully deleted.',
    })
    @HttpCode(204)
    @UseGuards(ATAuthGuard, RolesGuard)
    @ApiBearerAuth('access-token')
    @Roles(Role.ADMIN)
    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.examService.removeById(+id);
    }
}
