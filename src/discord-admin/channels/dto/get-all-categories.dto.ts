import { IsNotEmpty, IsString } from 'class-validator';

export class GetAllCategoriesDto {
  @IsNotEmpty()
  @IsString()
  guildId: string;
}
