import { prisma } from "@/lib/prisma";
import { UsersRepository } from "@/repositories/users-repository";
import { Prisma, User } from "@prisma/client";

export class PrismaUsersRepository implements UsersRepository {

  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data
    })
  }
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } })

  }

}