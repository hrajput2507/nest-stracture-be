import { CacheModule, Global, Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from "@nestjs/config";
import * as redisStore from "cache-manager-redis-store";
import { ConfigurationModule } from 'src/config/config.module';
import { ConfigurationService } from 'src/config/config.service';
import { CacheService } from './cache.service';
@Global()
@Module({
    imports: [
        CacheModule.registerAsync({
            imports: [ConfigurationModule],
            useFactory: async (config: ConfigurationService) => ({
                isGlobal: true,
                store: redisStore,
                host: config.get('REDIS_HOST'),
                port: config.get('REDIS_PORT'),
                auth_pass: config.get('REDIS_PASSWORD')
            }),
            inject: [ConfigurationService],
        })
    ],
    providers: [CacheService],
    exports: [CacheModule, CacheService]
})

export class CachingModule {}