import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { UploadModule } from './upload/upload.module';
import { Category } from './category/entities/category.entity';
import { Product } from './product/entities/product.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BannerModule } from './banner/banner.module';
import { NotificationModule } from './notification/notification.module';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';
import { User } from './user/entities/user.entity';
import { Banner } from './banner/entities/banner.entity';
import { Notification } from './notification/entities/notification.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [Category, Product, User,Banner,Notification],
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    ProductModule,
    CategoryModule,
    UploadModule,
    UserModule,
    BannerModule,
    NotificationModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
