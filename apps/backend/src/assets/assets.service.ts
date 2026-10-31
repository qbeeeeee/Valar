import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { AssetCategory } from '@prisma/client';

@Injectable()
export class AssetsService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async createAsset(
    userId: string,
    data: { name: string; ticker: string; category: AssetCategory },
  ) {
    return this.prisma.asset.create({
      data: {
        userId,
        name: data.name,
        ticker: data.ticker,
        category: data.category,
      },
    });
  }

  async getUserAssets(userId: string) {
    return this.prisma.asset.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
