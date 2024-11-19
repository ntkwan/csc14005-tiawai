import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import pg from 'pg';
import { AuthModule } from './auth/auth.module';
import { VectorStoreModule } from './vector-store/vector-store.module';
import { ChatModule } from './chat/chat.module';
import { User } from './users/entities/user.entity';
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
                models: [User],
                dialectOptions: {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false,
                    },
                },
            }),
            inject: [ConfigService],
        }),
        AuthModule,
        ChatModule,
        VectorStoreModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
