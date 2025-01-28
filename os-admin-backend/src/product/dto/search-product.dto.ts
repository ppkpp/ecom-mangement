import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class SearchProductDto {
  @IsOptional()
  @Transform(({ value }) => (value?.trim() ? value : undefined)) // Convert empty string to undefined
  @IsString()
  searchTerm?: string;

  @IsOptional()
  @Transform(({ value }) =>
    value && !isNaN(value) ? parseFloat(value) : undefined,
  )
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @Transform(({ value }) =>
    value && !isNaN(value) ? parseFloat(value) : undefined,
  )
  @IsNumber()
  maxPrice?: number;

  @IsOptional()
  @Transform(({ value }) =>
    value && !isNaN(value) ? parseInt(value, 10) : undefined,
  )
  @IsNumber()
  minStock?: number;

  @IsOptional()
  @Transform(({ value }) =>
    value && !isNaN(value) ? parseInt(value, 10) : undefined,
  )
  @IsNumber()
  maxStock?: number;

  @IsOptional()
  @Transform(({ value }) => (value && !isNaN(value) ? parseInt(value, 10) : 1)) // Default to 1 if empty
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @Transform(({ value }) => (value && !isNaN(value) ? parseInt(value, 10) : 8)) // Default to 8 if empty
  @IsNumber()
  @Min(1)
  limit?: number;
}
