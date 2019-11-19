
import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private service: UsersService) { }

    @Get()
    index(): Promise<User[]> {
        return this.service.getAllUsers();
    }
    @Get('getUserApi')
    getApi() {
       return this.service.getUserApi();
    }

    @Get(':id')
    get(@Param() params) {
        return this.service.getUser(params.id);
    }
    @Post('create')
    async create(@Body() user: User): Promise<any> {
        return this.service.createUser(user);
    }
    @Put(':id')
    async update(@Param('id') id, @Body() user: User): Promise<any> {
        user.id = Number(id);
        // tslint:disable-next-line:no-console
        console.log('Update #' + user.id);
        return this.service.updateUser(user);
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.deleteUser(params.id);
    }

}
