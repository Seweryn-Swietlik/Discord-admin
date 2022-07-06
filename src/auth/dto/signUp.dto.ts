import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password length should be between four and twenty. Password should contain at least one upper case letter, one lower case letter and one number or special character',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  botToken: string;

  @IsNotEmpty()
  @IsString()
  clientId: string;
}
