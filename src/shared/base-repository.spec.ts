import { Test } from '@nestjs/testing';
import { BaseModel } from './base-model.abstract';
import { BaseRepository } from './base-repository.abstract';
import { INestApplication, Inject, Injectable } from '@nestjs/common';
import { MONGO_CLIENT } from '../constants';
import { Db, MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

const TEST_BD_COLLECTION = 'TestCollection';
class TestModel extends BaseModel {
  private _data: string;

  constructor(data: string);
  constructor(data: string, id: string, createdAt: Date, updatedAt: Date);
  constructor(data: string, id?: string, createdAt?: Date, updatedAt?: Date) {
    super(id, createdAt, updatedAt);
    this._data = data;
  }

  get data(): string {
    return this._data;
  }

  set data(value: string) {
    this._data = value;
  }
}
@Injectable()
class TestRepository extends BaseRepository<TestModel> {
  constructor(@Inject(MONGO_CLIENT) db: Db) {
    super(db, TEST_BD_COLLECTION);
  }

  async countNumberOFDocuments(): Promise<number> {
    return this.collection.countDocuments();
  }
}

// ToDo: The test does not terminate after run , something is still active even though I kill everything in the afterAll() + does not look like Repository is working as expected, no data is return in the findById() test
describe.skip('BaseRepository test', () => {
  let testApp: INestApplication;
  let testRepository: TestRepository;
  let mongoClient: Db;
  let mongodb: MongoMemoryServer;

  beforeAll(async () => {
    mongodb = await MongoMemoryServer.create();
    const mongoUri = mongodb.getUri();

    const module = await Test.createTestingModule({
      providers: [
        TestRepository,
        {
          provide: MONGO_CLIENT,
          useFactory: async () => {
            const client = await MongoClient.connect(mongoUri);
            return client.db('test');
          },
        },
      ],
    }).compile();

    testRepository = module.get<TestRepository>(TestRepository);
    mongoClient = module.get<Db>(MONGO_CLIENT);

    testApp = module.createNestApplication();
    await testApp.init();
  });

  afterEach(async () => {
    await mongoClient.collection(TEST_BD_COLLECTION).drop();
  });

  afterAll(async () => {
    await testApp.close();
    await mongodb.stop();
  });

  describe('GIVEN a valid object of TestModel', () => {
    const testModel = new TestModel('test');
    describe('WHEN calling insert()', () => {
      it('THEN should not throw an exception', () => {
        expect(
          async () => await testRepository.insert(testModel),
        ).not.toThrow();
      });
    });
  });

  // describe('GIVEN one document exists in collection', () => {
  //   describe('WHEN calling count()', () => {
  //     it('THEN should not throw an exception', async () => {
  //       await testRepository.insert(new TestModel('test'));
  //       const result = await testRepository.countNumberOFDocuments();
  //       expect(result).toBe(1);
  //     });
  //   });

  // describe('WHEN calling findById()', () => {
  //   it('THEN should return an object of instance TestModel', async () => {
  //     const testModel = new TestModel('test');
  //     await testRepository.insert(testModel);
  //     const result1 = await testRepository.countNumberOFDocuments();
  //     expect(result1).toBe(1);
  //     const result = await testRepository.findById(testModel.xxid);
  //     expect(result).toBeDefined();
  //     console.log(JSON.stringify(result));
  //     expect(result).toBeInstanceOf(TestModel);
  //   });
  // });
  // });
});
