import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

import { HealthCheckController } from './healthcheck.controller';
import { ConfigurationService } from 'src/config/config.service';

@Module({
    imports: [TerminusModule, HttpModule],
    controllers: [HealthCheckController],
    providers: [
        ConfigurationService
    ],
  
})
export class HealthCheckModule {

}
