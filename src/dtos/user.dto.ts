import { IsEmail, IsString, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;
  
  @IsNotEmpty()
  @IsString()
  public password: string;
}