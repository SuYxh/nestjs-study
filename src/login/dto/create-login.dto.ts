import { IsNotEmpty, IsString, Length, IsNumber } from 'class-validator';
export class CreateLoginDto {
  @IsNotEmpty() //验证是否为空
  @IsString() //是否为字符串
  @Length(5, 10, {
    message: '不能超过 10 个字符, 不能少于 5 个字符',
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;
}
