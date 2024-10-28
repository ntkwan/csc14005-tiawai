import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { CreateDto } from '../users/dtos/user-signup.dto';
import { UserLoginDto } from '../users/dtos/user-login.dto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            return null;
        }

        const isValidPassword = await this.usersService.validatePassword(
            password,
            user,
        );

        if (!isValidPassword) {
            return null;
        }

        return user;
    }

    public async signIn(user: UserLoginDto): Promise<any> {
        try {
            const payloadAccessToken = {
                id: user.id,
                email: user.email,
            };

            const accessToken =
                await this.jwtService.signAsync(payloadAccessToken);

            const payloadRefreshToken = {
                sub: user.id,
                username: user.username,
            };

            const refreshToken = await this.jwtService.signAsync(
                payloadRefreshToken,
                {
                    secret: this.configService.get('RT_SECRET'),
                    expiresIn: '7d',
                },
            );

            await this.usersService.updateRefreshToken(user.id, refreshToken);

            return {
                refreshToken,
                accessToken,
            };
        } catch (error) {
            throw new InternalServerErrorException('Error signing in', {
                cause: error.message,
            });
        }
    }

    public async signUp(user: CreateDto): Promise<User> {
        try {
            const newUser = await this.usersService.create(user);
            return newUser;
        } catch (error) {
            throw new InternalServerErrorException('Error signing up', {
                cause: error.message,
            });
        }
    }

    public async logOut(user: any): Promise<void> {
        try {
            await this.usersService.updateRefreshToken(user.id, null);
        } catch (error) {
            throw new InternalServerErrorException('Error logging out', {
                cause: error.message,
            });
        }
    }

    public async getNewTokens(id: string, refreshToken: string): Promise<any> {
        try {
            const user = await this.usersService.findById(id);
            if (!user) {
                throw new BadRequestException('User not found');
            }

            if (user.refreshToken !== refreshToken) {
                throw new UnauthorizedException('Invalid refresh token');
            }
            const payloadAccessToken = {
                id: user.id,
                email: user.email,
            };

            const newAT = await this.jwtService.signAsync(payloadAccessToken);

            const payloadRefreshToken = {
                sub: user.id,
                username: user.username,
            };

            const newRT = await this.jwtService.signAsync(payloadRefreshToken, {
                secret: this.configService.get('RT_SECRET'),
                expiresIn: '7d',
            });

            await this.usersService.updateRefreshToken(user.id, newRT);

            return {
                refreshToken: newRT,
                accessToken: newAT,
            };
        } catch (error) {
            throw new InternalServerErrorException('Error refreshing token', {
                cause: error.message,
            });
        }
    }
}
