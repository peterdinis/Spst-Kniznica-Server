import { AdminLoginRequestDto } from './dto/admin-login-request.dto';
import {
    Controller,
    Get,
    Post,
    Body,
    Delete,
    Req,
    UseGuards,
    Put,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin.dto';
import { ApiTags, ApiOkResponse, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AdminLoginResponseDto } from './dto/admin-login-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './admin.entity';

@Controller('admin')
@ApiTags('Admin Part')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @ApiOperation({
        summary: "Register New Admin"
    })
    @Post('register')
    @ApiOkResponse({ type: AdminLoginResponseDto })
    register(
        @Body() createAdminDto: CreateAdminDto,
    ): Promise<AdminLoginResponseDto> {
        return this.adminService.create(createAdminDto);
    }

    @ApiOperation({
        summary: "Login Admin"
    })
    @Post('login')
    @ApiOkResponse({ type: AdminLoginResponseDto })
    login(
        @Body() adminLoginRequestDto: AdminLoginRequestDto,
    ): Promise<AdminLoginResponseDto> {
        return this.adminService.login(adminLoginRequestDto);
    }

    @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: [AdminDto] })
    @ApiOperation({
        summary: "Find all users"
    })
    findAll(): Promise<AdminDto[]> {
        return this.adminService.findAll();
    }

    @Get('me')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({
        summary: "Profile"
    })
    @ApiOkResponse({ type: Admin })
    async getUser(@Req() request){
        return this.adminService.getAdmin(request.user.id);
    }

    @Put('me')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: AdminDto })
    @ApiOperation({
        summary: "Update user"
    })
    update(
        @Body() updateAdminDto: UpdateAdminDto,
        @Req() request,
    ){
        return this.adminService.update(request.user.id, updateAdminDto);
    }

    @Delete('me')
    @ApiBearerAuth()
    @ApiOperation({
        summary: "Delete user"
    })
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: AdminDto })
    delete(@Req() request) {
        return this.adminService.delete(request.user.id);
    }
}