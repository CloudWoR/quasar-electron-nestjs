import { Module } from '@nestjs/common';
import { BootstrapService } from './bootstrap.service';
import { electronModule } from './bootstrap.electron';

@Module({
  imports: [electronModule],
  providers: [BootstrapService],
  exports: [BootstrapService, electronModule],
})
export class BootstrapModule {}
