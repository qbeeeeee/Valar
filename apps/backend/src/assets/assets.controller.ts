import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  Inject,
} from '@nestjs/common';
import { AssetsService } from './assets.service.js';
import { JwtAuthGuard } from '../auth/jwt.guard.js';
import { AssetCategory } from '@prisma/client';

@Controller('assets')
@UseGuards(JwtAuthGuard)
export class AssetsController {
  constructor(
    @Inject(AssetsService) private readonly assetsService: AssetsService,
  ) {}

  @Post()
  async addAsset(
    @Request() req: { user: { sub: string } },
    @Body() body: { name: string; ticker: string; category: AssetCategory },
  ) {
    return this.assetsService.createAsset(req.user.sub, body);
  }

  @Get()
  async getAssets(@Request() req: { user: { sub: string } }) {
    return this.assetsService.getUserAssets(req.user.sub);
  }
}
