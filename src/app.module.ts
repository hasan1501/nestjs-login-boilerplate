import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { parse } from 'pg-connection-string';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = parse(configService.get('DATABASE_URL'));

        return {
          dialect: 'postgres',
          host: config.host,
          port: +config.port,
          username: config.user,
          password: config.password,
          database: config.database,
          autoLoadModels: true,
          // TODO: REMEMBER TO DELETE THIS
          synchronize: true,
        };
      },
    }),
  ],
})
export class AppModule {}
