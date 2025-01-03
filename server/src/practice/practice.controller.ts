import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ATAuthGuard } from 'src/auth/guards/at-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import {
    Controller,
    HttpCode,
    UseGuards,
    Post,
    Query,
    ValidationPipe,
    Request,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';
import { PracticeService } from './practice.service';
import { TestEntity } from 'src/exam/entities/exam.entity';
import { CategoryDto } from './dtos/practice.dto';
@Controller('practice')
export class PracticeController {
    constructor(private readonly practiceService: PracticeService) {}

    @ApiOperation({ summary: 'Generate practice questions [USER]' })
    @ApiResponse({
        status: 200,
        description: 'Practice questions generated successfully',
        type: TestEntity,
    })
    @HttpCode(200)
    @UseGuards(ATAuthGuard, RolesGuard)
    @ApiBearerAuth('access-token')
    @Roles(Role.USER)
    @Post(':category')
    async generatePracticeQuestions(
        @Request() req: any,
        @Query(new ValidationPipe()) query: CategoryDto,
    ): Promise<TestEntity> {
        return this.practiceService.generatePracticeQuestions(
            req.user,
            query.category,
        );
    }
}
