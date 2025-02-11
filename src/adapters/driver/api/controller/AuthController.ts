import { Body, Controller, Delete, Get, Path, Post, Put, Query, Route, Tags } from 'tsoa';
import { CreateAuthDto } from './dto/AuthDto';
import { IAuthService } from '../../../../core/applications/ports/services/IAuthService';
import { IAuth } from '../../../../core/domain/Auth';


@Route('auth')
@Tags('Auth')
export class AuthController extends Controller {
  private authService: IAuthService;

  constructor(authService: IAuthService) {
    super();
    this.authService = authService;
  }

  /**
   * Create a new product
   * @param createAuthDto The product data to create
   */
  // @Post()
  // public async create(@Body() createUploadDto: CreateUploadDto): Promise<IPUpload> {
  //   return this.uploadService.create(createUploadDto);
  // }

  @Post()
  public async create(@Body() createAuthDto: CreateAuthDto): Promise<IAuth> {
    return this.authService.create(createAuthDto);
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
