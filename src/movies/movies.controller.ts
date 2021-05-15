import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @Get()
  getAll() {
    return this.moviesService.getAll();
  }

  @Get('search')
  searchMovie(@Query('year') searchedYear: string) {
    return `This will return a movie with a searched term: ${searchedYear}`;
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.moviesService.getOne(id);
  }

  @Post()
  create(@Body() createMovie: CreateMovieDto) {
    return this.moviesService.create(createMovie);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMovie: UpdateMovieDto) {
    return this.moviesService.udpate(id, updateMovie);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.moviesService.deleteOne(id);
  }
}
