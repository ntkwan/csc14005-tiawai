import {
    Body,
    Controller,
    HttpCode,
    Post,
    UseGuards,
    Request,
    Res,
    Get,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ATAuthGuard } from './guards/at-auth.guard';
import { CreateDto } from '../users/dtos/user-signup.dto';
import { RTAuthGuard } from './guards/rt-auth.guard';
import { ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';
import { TokensEntity } from './entities/tokens.entity';
import { CredEntity } from './entities/creds.entity';
import { AuthLoginDto } from './dtos/auth-login.dto';
import { AuthSignUpDto } from './dtos/auth-signup.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Login using credentials' })
    @ApiBody({ type: AuthLoginDto })
    @ApiResponse({
        status: 200,
        description: 'Login successful',
        type: TokensEntity,
    })
    @UseGuards(LocalAuthGuard)
    @HttpCode(200)
    @Post('sign-in')
    async signIn(@Request() req: any, @Res() res: Response): Promise<void> {
        const { refreshToken, accessToken } = await this.authService.signIn(
            req.user,
        );
        res.cookie('refresh_token', refreshToken, { httpOnly: true });
        res.send({
            accessToken,
            refreshToken,
            message: 'User has been signed in successfully',
        });
    }

    @ApiOperation({ summary: 'Get profile with credentials' })
    @Get('get-my-profile')
    @ApiResponse({
        status: 200,
        description: 'Get profile successfully',
        type: CredEntity,
    })
    @UseGuards(ATAuthGuard)
    async getMyProfile(@Request() req: any, @Res() res: Response) {
        res.send({
            user: req.user,
        });
    }

    @ApiOperation({ summary: 'Sign-up to login' })
    @ApiBody({ type: AuthSignUpDto })
    @ApiResponse({
        status: 200,
        description: 'Sign-up successful',
        type: CredEntity,
    })
    @Post('sign-up')
    @HttpCode(200)
    async signUp(
        @Body() req: AuthSignUpDto,
        @Res() res: Response,
    ): Promise<void> {
        const newUser = await this.authService.signUp(req);
        res.send({
            newUser,
            message: 'User has been created successfully',
        });
    }

    @ApiOperation({ summary: 'Sign-out and clear credentials' })
    @ApiResponse({
        status: 200,
        description: 'Sign-out successful',
    })
    @Post('sign-out')
    @UseGuards(ATAuthGuard)
    @HttpCode(200)
    async signOut(@Request() req: any, @Res() res: Response): Promise<void> {
        await this.authService.logOut(req.user);
        res.clearCookie('refresh_token');
        res.send({
            message: 'User has been signed out successfully',
        });
    }

    @ApiOperation({ summary: 'Refresh tokens with credentials' })
    @Get('refresh-token')
    @UseGuards(RTAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Refresh tokens successfully',
        type: TokensEntity,
    })
    @HttpCode(200)
    async refreshToken(
        @Request() req: any,
        @Res() res: Response,
    ): Promise<void> {
        const id = req.user.id;
        const oldRefreshToken = req
            .get('Authorization')
            .replace('Bearer', '')
            .trim();

        const { refreshToken, accessToken } =
            await this.authService.getNewTokens(id, oldRefreshToken);
        res.cookie('refresh_token', refreshToken, { httpOnly: true });

        res.send({
            accessToken,
            message: 'Token has been refreshed successfully',
        });
    }
}
