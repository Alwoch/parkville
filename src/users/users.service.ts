import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: createUserDto,
    });
    delete user.password;
    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.prisma.user.update({
      where: { id: id },
      data: updateUserDto,
    });
    return updatedUser;
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id: id },
    });
  }
}
