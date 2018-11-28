import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsController } from './items/items.controller';
import { ItemsService } from './items/items.service';
import { ShoppingCartController } from './shopping-cart/shopping-cart.controller';

@Module({
  imports: [],
  controllers: [AppController, ItemsController, ShoppingCartController],
  providers: [AppService, ItemsService],
})
export class AppModule {}
