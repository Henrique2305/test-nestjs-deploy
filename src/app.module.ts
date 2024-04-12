import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmeModule } from './filme/filme.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CacheModule } from '@nestjs/cache-manager';
import { HealthModule } from './health/health.module';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    FilmeModule,
    AuthModule,
    UsersModule,
    CacheModule.register({ 
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
      no_ready_check: true,
    }),
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
