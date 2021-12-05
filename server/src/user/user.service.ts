import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.usersRepo.create(createUserInput);
    return this.usersRepo.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }

  async findOne(id: number): Promise<User | null> {
    if (typeof id !== `number`) return null;
    return this.usersRepo.findOneOrFail(id);
  }

  async update(updateUserInput: UpdateUserInput): Promise<User | null> {
    if (!updateUserInput.id) return null;
    return this.usersRepo.save(updateUserInput);
  }

  async delete(id: number): Promise<boolean> {
    return true;
  }
}
