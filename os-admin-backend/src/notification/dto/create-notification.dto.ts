import { IsNotEmpty } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty({ message: 'Notification title is required' })
  title: string;

  @IsNotEmpty({ message: 'Notification description is required' })
  description: string;

  upload_img: string;
}
