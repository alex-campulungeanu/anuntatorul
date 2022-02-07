import { IsEmail, IsString, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateAccountDto {
  @IsNumber()
  public idUserTelegram: number;

  @IsNumber()
  public idChatTelegram: number;
  
  @IsString()
  public name: string;
  
  @IsString()
  public userTelegram: string;
}

export class CreateAccountNotificationDto {
  @IsNumber()
  public accountId: number;
  
  @IsNumber()
  public notificationId: number;
}