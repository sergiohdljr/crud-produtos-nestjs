import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { ProductService } from './service/product.service';
import { PrismaService } from './service/prisma.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [ProductService, PrismaService],
})
export class AppModule {}
