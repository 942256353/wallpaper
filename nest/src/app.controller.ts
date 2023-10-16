import { Controller, Get, Param, Query, Res, } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getImage(@Query('tags') tags: string){
    return this.appService.getImage(tags);
  }
  @Get('tag')
  async getTag() {
    return this.appService.getTag();
  }
  @Get('start')
  async getStart() {
    return this.appService.getStart();
  }
}
