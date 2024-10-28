import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import pg from 'pg';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),

        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                dialect: 'postgres',
                dialectModule: pg,
                host: configService.get('DATABASE'),
                port: configService.get('PORT'),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_NAME'),
                autoLoadModels: true,
                synchronize: true,
                dialectOptions: {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false,
                    },
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
