import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateDto } from './dtos/user-signup.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
        private configService: ConfigService,
    ) {}

    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }

    async findByEmail(email: string): Promise<User> {
        const project = await this.userModel.findOne<User>({
            where: { email },
        });
        if (!project) {
            throw new InternalServerErrorException(
                `User with email ${email} not found`,
            );
        }
        return project.dataValues;
    }

    async findById(id: string): Promise<User> {
        const project = await this.userModel.findOne<User>({ where: { id } });
        if (!project) {
            throw new InternalServerErrorException(
                `User with id ${id} not found`,
            );
        }
        return project.dataValues;
    }

    async validatePassword(password: string, user: User): Promise<boolean> {
        try {
            return await bcrypt.compare(password, user.password);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async hashPassword(password: string): Promise<string> {
        try {
            const salt = await bcrypt.genSalt(+this.configService.get('SALT'));
            return await bcrypt.hash(password, salt);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async create(CreateDto: CreateDto): Promise<User> {
        const { username, email, password } = CreateDto;
        const hashedPassword = await this.hashPassword(password);
        const user = await this.userModel.create({
            id: uuidv4(),
            username: username,
            email: email,
            password: hashedPassword,
        });

        if (!user) {
            throw new InternalServerErrorException(
                'This email or username is already in use',
            );
        }
        return user;
    }

    async updateRefreshToken(id: string, refreshToken: string): Promise<void> {
        try {
            await this.userModel.update(
                { refreshToken: refreshToken },
                { where: { id: id } },
            );
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async removeById(id: string): Promise<void> {
        const user = await this.findById(id);
        if (!user) {
            throw new InternalServerErrorException(
                `User with id ${id} not found`,
            );
        }
        await user.destroy();
    }
}
