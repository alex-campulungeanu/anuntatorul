import { IsString } from 'class-validator'

export class CreateNotificationDto {
  @IsString()
  public name: string;

  @IsString()
  public description: string;

  @IsString()
  public label: string;
}