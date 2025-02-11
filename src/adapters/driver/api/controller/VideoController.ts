import { Body, Controller, Delete, Get, Path, Post, Put, Query, Route, Tags } from 'tsoa';
import { IVideoService } from '../../../../core/applications/ports/services/IVideoService';
import { CreateVideoDto } from './dto/VideoDto';
import { IVideo } from '../../../../core/domain/Video';

@Route('videos')
@Tags('Videos')
export class VideoController extends Controller {
  private videoService: IVideoService;

  constructor(videoService: IVideoService) {
    super();
    this.videoService = videoService;
  }

  /**
   * Create a new product
   * @param createUploadDto The product data to create
   */
  // @Post()
  // public async create(@Body() createUploadDto: CreateUploadDto): Promise<IPUpload> {
  //   return this.uploadService.create(createUploadDto);
  // }

  // @Post()
  // public async create(@Body() createVideoDto: CreateVideoDto): Promise<IVideo> {
  //   return this.videoService.create(createVideoDto);
  // }

  @Post()
  public async extractFrames(@Body() createVideoDto: CreateVideoDto): Promise<IVideo> {
    return this.videoService.create(createVideoDto);
  }

  /**
   * Update an existing product by ID
   * @param id The ID of the product to update
   * @param updateProductDto The product data to update
   */
  // @Put('{id}')
  // public async update(@Path() id: number, @Body() updateProductDto: UpdateProductDto): Promise<IProduct | null> {
  //   return this.uploadService.update(id, updateProductDto);
  // }

  // /**
  //  * Delete a product by ID
  //  * @param id The ID of the product to delete
  //  */
  // @Delete('{id}')
  // public async delete(@Path() id: number): Promise<void> {
  //   await this.uploadService.delete(id);
  // }

  // /**
  //  * Get a product by ID
  //  * @param id The ID of the product to retrieve
  //  */
  // @Get('{id}')
  // public async getById(@Path() id: number): Promise<IProduct | null> {
  //   return this.uploadService.getById(id);
  // }

  /**
   * Get all products, optionally filtered by category
   * @param category The category to filter products by
   */
  // @Get()
  // public async getAll(@Query() category?: string): Promise<IProduct[]> {
  //   return this.uploadService.getAll({ category });
  // }
}
