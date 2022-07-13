import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RecordsCollectionResponse } from './dto/records-collection.response';
import { RecordsCollectionMapper } from './records-collection.mapper';
import { CreateCollectionRequest } from './dto/create-collection.request';
import { AddRecordRequest } from './dto/add-record.request';

@ApiTags('records')
@ApiConsumes('application/json')
@Controller('records-collection')
export class RecordsCollectionController {
  logger = new Logger(RecordsCollectionController.name);
  constructor(private readonly recordService: RecordsService) {}

  @ApiOkResponse({ type: RecordsCollectionResponse })
  @ApiNotFoundResponse()
  @Get(':collectionId')
  async getRecordsCollection(
    @Param('collectionId') collectionId: string,
  ): Promise<RecordsCollectionResponse> {
    const collection = await this.recordService.getCollection(collectionId);
    return RecordsCollectionMapper.modelToDto(collection);
  }

  @ApiCreatedResponse({ type: RecordsCollectionResponse })
  @Post()
  async createCollection(
    @Body() request: CreateCollectionRequest,
  ): Promise<RecordsCollectionResponse> {
    const collection = await this.recordService.createCollection(
      request.userId,
      request.name,
    );
    return RecordsCollectionMapper.modelToDto(collection);
  }

  @ApiOkResponse({ type: RecordsCollectionResponse })
  @ApiNotFoundResponse()
  @Patch(':collectionId')
  async addRecordToCollection(
    @Param('collectionId') collectionId: string,
    @Body() request: AddRecordRequest,
  ): Promise<RecordsCollectionResponse> {
    const collection = await this.recordService.addRecordToCollection(
      collectionId,
      {
        name: request.name,
        artist: request.artist,
        imageUrl: request.imageUrl,
        productionYear: request.productionYear,
        printedYear: request.printedYear,
      },
    );
    return RecordsCollectionMapper.modelToDto(collection);
  }
}
