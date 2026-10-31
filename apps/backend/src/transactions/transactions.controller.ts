import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  Inject,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service.js';
import { JwtAuthGuard } from '../auth/jwt.guard.js';
import { TransactionType } from '@prisma/client';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(
    @Inject(TransactionsService)
    private readonly transactionsService: TransactionsService,
  ) {}

  @Post()
  async logTransaction(
    @Request() req: { user: { sub: string } },
    @Body()
    body: {
      assetId: string;
      type: TransactionType;
      amount: number;
      price: number;
      date: string;
    },
  ) {
    return this.transactionsService.createTransaction(req.user.sub, body);
  }

  @Get()
  async getTransactions(@Request() req: { user: { sub: string } }) {
    return this.transactionsService.getUserTransactions(req.user.sub);
  }
}
