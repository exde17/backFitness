import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
  UseFilters,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorator/get-user.decorator';
import { GetRawHeaders } from './decorator/get-rawHeaders.decorator';
import { UseRoleGuard } from './guards/use-role/use-role.guard';
import { RoleProtected } from './decorator/role-protected/role-protected.decorator';
import { ValidRoles } from './interfaces';
import { Auth } from './decorator';
import { HttpExceptionFilter } from 'src/utils/http-exception.filter';
import { CreateMonitorDto } from './dto/create-monitor.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UseFilters(new HttpExceptionFilter())
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  // cambiar contraseña
  @Post('change-password/:id')
  @Auth()
  async changePassword(
    // @GetUser('email') email: string,
    @Param('id') id: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.userService.changePassword(id, newPassword);
  }
  

  @Get()
  @UseGuards(AuthGuard(), UseRoleGuard)
  findAll(
    @GetUser() user: User,
    @GetUser('email') email: string,
    @GetRawHeaders() rawHeaders: string[],
    ) {
    // console.log(user, email);
    return {
      user: user,
      email: email,
      rawHeaders: rawHeaders,
    };
  }

  @Get('private')
  // @SetMetadata('roles', ['admin', 'super-user'])
  @RoleProtected()
  @UseGuards(AuthGuard(), UseRoleGuard)
  privateRoute(
    @GetUser() user: User,
  ) {
    return {
      ok: true,
      user: user,
    };
  }

  @Get('private3')
  @Auth()
  privateRoute3(
    @GetUser() user: User,
  ) {
    return {
      ok: true,
      user: user,
    };
  }

  // traer los usuarios con rol monitor
  @Get('monitor')
  @Auth()
  findMonitores(
    @Query('name') name?: string,
    @Query('documentNumber') documentNumber?: string
  ) {
    const filters: any = {};
    
    if (name) filters.name = name;
    if (documentNumber) filters.documentNumber = documentNumber;
    
    // Si no hay filtros, pasamos undefined para obtener todos los monitores
    return this.userService.findMonitores(
      Object.keys(filters).length > 0 ? filters : undefined
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  // cambiar estado
  @Patch('change-status/:id')
  @Auth(ValidRoles.superUser)
  async changeStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.userService.changeStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  // crear monitor
  @Post('monitor')
  @Auth()
  createMonitor(@Body() createMonitorDto: CreateMonitorDto){
    return this.userService.createMonitor(createMonitorDto);
  }
}
