import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Role } from 'src/auth/enums/role.enum';
@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    const adminInfo = await this.userRepository.findOne({
      where: { username: 'admin' },
    });
    if (!adminInfo) {
      const createUserDto: CreateUserDto = {
        username: 'admin',
        password: 'admin',
        phoneno: '1234567890',
        email: 'admin@example.com',
        upload_img: '',
        active: true,
        role: Role.Admin,
      };

      // Hash the admin password before saving
      const hashedPassword = await this.hashPassword(createUserDto.password);

      // Create the user with hashed password
      const adminUser = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });

      // Save the user in the database
      await this.userRepository.save(adminUser);
      console.log('Admin user created!');
      console.log(`User alread exists with admin role!.`);
    }
  }
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);

    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    return await this.userRepository.remove(user);
  }

  findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
