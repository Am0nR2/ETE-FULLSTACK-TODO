import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTeamDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsOptional()
  @IsNumber()
  add_user: number;
  @IsOptional()
  @IsNumber()
  delete_user: number;
}
