import { Injectable, Inject, HttpService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class UsersService {
    users: User[];
    constructor(@InjectRepository(User) private usersRepository: Repository<User>, private http: HttpService) { }

    async getAllUsers(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    // tslint:disable-next-line:variable-name
    async getUser(_id: number): Promise<User[]> {
        return await this.usersRepository.find({
            select: ['fullName', 'birthday', 'isActive'],
            where: [{ id: _id }],
        });
    }

    async  createUser(user: User): Promise<User> {
        return await this.usersRepository.save(user);
    }
    async updateUser(user: User): Promise<UpdateResult> {
       return await  this.usersRepository.update(user.id, user);
    }

    async deleteUser(id): Promise<DeleteResult> {
      return await  this.usersRepository.delete(id);
    }
    async getUserApi() {
      return await this.http.get('https://5dd1f78015bbc2001448d511.mockapi.io/thang/api/v1/users').pipe( map( response => response.data) );
    }
    // async getApi() {
    //     return  this.http.get('https://5dd1f78015bbc2001448d511.mockapi.io/thang/api/v1/users').pipe ( map ((res:Response) =><users[]>res.json()))
    // }
}
