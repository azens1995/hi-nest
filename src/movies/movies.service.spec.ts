import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be 4', () => {
    expect(2 + 2).toEqual(4);
  });
  describe('getAll', () => {
    it('getAll: should be an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('getOne: should return a movie', () => {
      service.create({
        title: 'Test movie',
        year: 2021,
        genres: ['test1', 'test2'],
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('getOne: should throw 404 error', () => {
      try {
        service.getOne(9999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with id 9999 is not found.');
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'Test movie',
        year: 2021,
        genres: ['test1', 'test2'],
      });

      const allMovies = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(allMovies);
    });

    it('delete returns 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test movie',
        year: 2021,
        genres: ['test1', 'test2'],
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update movie', () => {
      service.create({
        title: 'Test movie',
        year: 2021,
        genres: ['test1', 'test2'],
      });

      service.udpate(1, { title: 'Updated title' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated title');
    });

    it('should throw NotFoundException', () => {
      try {
        service.udpate(999, { title: 'Updated title' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
