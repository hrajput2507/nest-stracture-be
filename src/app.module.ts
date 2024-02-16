import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CachingModule } from './common/cache/cache.module';
import { HealthCheckModule } from './common/healthcheck/healthcheck.module';
import { MongodbModule } from './config/database/mongodb.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from './common/guards/auth.guard';



@Module({
  imports: [
    MongodbModule, CachingModule, HealthCheckModule,  TypeOrmModule.forFeature()],
  controllers: [AppController],
  providers: [AppService, JwtAuthGuard],
})
export class AppModule { }
