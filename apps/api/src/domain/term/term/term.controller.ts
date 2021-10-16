import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTermDto } from './dto/create-term.dto';
import { UpdateTermDto } from './dto/update-term.dto';
import { TermService } from './term.service';

@Controller('term')
export class TermController {
  constructor(private readonly termService: TermService) {}

  @Post()
  create(@Body() createTermDto: CreateTermDto) {
    return this.termService.create(createTermDto);
  }

  @Post('many')
  createMany(@Body() createTermDtos: CreateTermDto[]) {
    return this.termService.createMany(createTermDtos);
  }

  @Get()
  findAll() {
    return this.termService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.termService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTermDto: UpdateTermDto) {
    return this.termService.update(+id, updateTermDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.termService.remove(+id);
  }
}
