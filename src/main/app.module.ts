import { BootstrapModule } from './../../libs/bootstrap/src/bootstrap.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [BootstrapModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
