import { IsNotEmpty } from 'class-validator';

export class CreateBannerDto {
  @IsNotEmpty({ message: 'Category name is required' })
  name: string;
  upload_img: string;
}
