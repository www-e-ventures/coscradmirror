import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Term } from '../../domain/models/term/entities/term.entity';
import { TermService } from '../../domain/services/term.service';
import { PartialDTO } from '../../types/partial-dto';

@Controller('terms')
export class TermController {
  constructor(private readonly termService: TermService) {}

  @Post()
  create(@Body() createTermDto: PartialDTO<Term>) {
    return this.termService.create(createTermDto);
  }

  @Post('many')
  createMany(@Body() createTermDtos: PartialDTO<Term>[]) {
    return this.termService.createMany(createTermDtos);
  }

  @Get()
  findAll() {
    try {
      return this.termService.findAll();
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.termService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTermDto: PartialDTO<Term>) {
    return this.termService.update(id, updateTermDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.termService.remove(id);
  }
}
