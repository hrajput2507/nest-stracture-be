import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationModule } from 'src/config/config.module';
import { ConfigurationService } from 'src/config/config.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersSchema } from 'src/entities/user.entity';

@Module({
  imports: [
    ConfigurationModule,
    MongooseModule.forFeature([
      { name: 'Users', schema: UsersSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    ConfigurationService,
  ],
})
export class UsersModule { }
