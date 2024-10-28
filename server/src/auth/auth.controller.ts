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

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-in')
    @UseGuards(LocalAuthGuard)
    @HttpCode(200)
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

    @Get('get-my-profile')
    @UseGuards(ATAuthGuard)
    async getMyProfile(@Request() req: any, @Res() res: Response) {
        res.send({
            user: req.user,
        });
    }

    @Post('sign-up')
    @HttpCode(200)
    async signUp(@Body() body: CreateDto, @Res() res: Response): Promise<void> {
        const newUser = await this.authService.signUp(body);
        res.send({
            newUser,
            message: 'User has been created successfully',
        });
    }

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

    @Get('refresh-token')
    @UseGuards(RTAuthGuard)
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
