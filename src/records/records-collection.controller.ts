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
  ApiBadRequestResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RecordsCollectionResponse } from './dto/records-collection.response';
import { RecordsCollectionMapper } from './records-collection.mapper';
import { CreateCollectionRequest } from './dto/create-collection.request';
import { AddRecordRequest } from './dto/add-record.request';
import { ChangeCollectionNameRequest } from './dto/change-collection-name.request';
import { UpdateRecordRequest } from './dto/update-record.request';

@ApiTags('Records')
@ApiConsumes('application/json')
@Controller('records-collections')
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
  @ApiBadRequestResponse()
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

  @ApiOperation({
    description: 'Endpoint to add new vinyl record to a collection',
  })
  @ApiCreatedResponse({ type: RecordsCollectionResponse })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Post(':collectionId/records')
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

  @ApiOperation({
    description: 'Endpoint to update a vinyl record in a collection',
  })
  @ApiOkResponse({ type: RecordsCollectionResponse })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Patch(':collectionId/records/:recordId')
  async updateRecordInCollection(
    @Param('collectionId') collectionId: string,
    @Param('recordId') recordId: string,
    @Body() request: UpdateRecordRequest,
  ): Promise<RecordsCollectionResponse> {
    const collection = await this.recordService.updateRecordInCollection(
      collectionId,
      recordId,
      request,
    );
    return RecordsCollectionMapper.modelToDto(collection);
  }

  @ApiOkResponse({ type: RecordsCollectionResponse })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Patch(':collectionId/name')
  async changeName(
    @Param('collectionId') collectionId: string,
    @Body() request: ChangeCollectionNameRequest,
  ): Promise<RecordsCollectionResponse> {
    const collection = await this.recordService.changeCollectionName(
      collectionId,
      request.newName,
    );
    return RecordsCollectionMapper.modelToDto(collection);
  }
}
