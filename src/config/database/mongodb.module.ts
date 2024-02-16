import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                uri: configService.getOrThrow("MONGODB_URI"),
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [],
    providers: [],
})

export class MongodbModule {}
