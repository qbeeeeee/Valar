import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { TransactionType } from '@prisma/client';

@Injectable()
export class TransactionsService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async createTransaction(
    userId: string,
    data: {
      assetId: string;
      type: TransactionType;
      amount: number;
      price: number;
      date: string;
    },
  ) {
    return this.prisma.transaction.create({
      data: {
        userId,
        assetId: data.assetId,
        type: data.type,
        amount: data.amount,
        price: data.price,
        date: new Date(data.date),
      },
    });
  }

  async getUserTransactions(userId: string) {
    return this.prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
  }
}
