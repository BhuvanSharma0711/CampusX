import { IsString, IsNumber } from 'class-validator';

export class UserdetailsDto {
  @IsString()
  Course: string;

  @IsString()
  Department: string;

  @IsString()
  Branch: string;

  @IsNumber()
  Year: number;

  @IsString()
  Gender: string;
}