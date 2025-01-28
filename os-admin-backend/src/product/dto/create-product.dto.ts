import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
  IsBoolean,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Product name is required.' })
  @IsString({ message: 'Product name must be a string.' })
  name: string;

  @IsNotEmpty({ message: 'Price is required.' })
  @IsNumber({}, { message: 'Price must be a number.' })
  price: number;

  @IsNotEmpty({ message: 'Stock is required.' })
  @IsNumber({}, { message: 'Stock must be a number.' })
  stock: number;

  @IsOptional()
  @IsString({ message: 'Description must be a string.' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'Upload image must be a string.' })
  upload_img?: string;

  @IsOptional()
  @IsBoolean({ message: 'Active must be a boolean value.' })
  active?: boolean;

  @IsNotEmpty({ message: 'Category ID is required.' })
  @IsNumber({}, { message: 'Category ID must be a number.' })
  categoryId: number;
}
