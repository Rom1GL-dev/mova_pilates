import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { LegalController } from './legal.controller';
import { LegalService } from './legal.service';

@Module({
  imports: [SharedModule],
  providers: [LegalService],
  controllers: [LegalController],
})
export class LegalModule {}
