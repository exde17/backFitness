import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Column } from 'typeorm';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  // @IsString()
  // @MinLength(6)
  // @MaxLength(50)
  // @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message:
  //     'The password must have a Uppercase, lowercase letter and a number',
  // })
  // password: string;

  @Column('text', {
      nullable: false,
      select: false,
    })
    @MinLength(4, { message: 'Password must be at least 4 characters long' })
    password: string;
}
