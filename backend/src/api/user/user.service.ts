import { ForbiddenException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import UserInfoDto from './dto/userinfo.dto'
import sendEmail from 'src/handlres/email.global';
import Redis from 'ioredis';
import { PrismaService } from 'src/prisma/prisma.service';
import handleErrors from 'src/handlres/handleErrors.global';
import { exec } from 'child_process';
import { promisify } from 'util';
import { TaskDto } from './dto/task.dto';

const execPromise = promisify(exec);

@Injectable()
export class UserService {
  constructor (
    private prisma: PrismaService,
    @Inject('REDIS') private redisClient: Redis,
  ) {}

  getHello(): string {
    return 'Hello World in user!';
  }
  
  async sendVerificationCode(
    email: string,
    subject: string,
    text: string,
  ): Promise<boolean> {
    try {
      const res = await sendEmail(email, subject, text);
      return res;
    } catch (error) {
      return false;
    }
  }

  async register(body:UserInfoDto) {

    const { name, email, password } = body;

    if(!name || !email ||!password) {
      throw new ForbiddenException('Missing required fields');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      throw new ForbiddenException('Invalid email format');
    }

    let user = await this.prisma.user
    .create({
      data: {
        name,
        email,
        password,
      },
    })
    .catch((error) => {
      handleErrors(error);
    });

    const verificationCode = Math.random().toString(8).substring(2,6);

    try {
      await this.redisClient.set(email, verificationCode);
    } catch (error) {
      return error;
    } finally {
      const subject = 'Email Verification';
      const text = `Your verification code is ${verificationCode}`;
      await this.sendVerificationCode(email, subject, text);
    }
    return user;
  }

  async checkUserExists(body: { email: string }) {
  const user = await this.prisma.user.findUnique({
    where: { email: body.email },
  });

  return { exists: !!user };
}


  async verifyEmail(body: { email: string; token: string }, response) {
    const verificationCode = await this.redisClient.get(body.email);
    
    if (verificationCode != body.token) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    await this.redisClient.del(body.email);

    let user = await this.prisma.user.update({
      where: {
        email: body.email,
      },
      data: {
        isVerified: true,
      },
    });
    return { message: 'Email verified successfully' };
  }
  async Login(body :{email:string; password:string}) {
    let user = await this.prisma.user.findUnique({
      where: {
        email:body.email,
      },
    })
    if(!user) {
      throw new HttpException('user not found',HttpStatus.NOT_FOUND);
    }
    if(!user.isVerified) {
      throw new HttpException('user not verified', HttpStatus.UNAUTHORIZED);
    }
    if(user?.password!=body.password) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

async checkVerificationStatus(email: string) {
  const user = await this.prisma.user.findUnique({
    where: { email },
    select: { isVerified: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return { verified: user.isVerified };
}


  async fetchdetails({email}) {
  const user = await this.prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const details = await this.prisma.userDetails.findUnique({
    where: {
      userid: user.id,
    },
  })

  return details;
}

async addAcademicDetails(body: {
  email: string;
  Rollno: number;
  Year: number;
  Course: string;
  Branch: string;
  Department: string;
}) {
  const user = await this.prisma.user.findUnique({
    where: { email: body.email },
  });

  if (!user || !user.isVerified) {
    throw new Error('User not found or not verified');
  }

  const userDetails = await this.prisma.userDetails.upsert({
    where: { userid: user.id },
    update: {
      Rollno: body.Rollno,
      Year: body.Year,
      Course: body.Course,
      Branch: body.Branch,
      Department: body.Department,
    },
    create: {
      userid: user.id,
      Rollno: body.Rollno,
      Year: body.Year,
      Course: body.Course,
      Branch: body.Branch,
      Department: body.Department,
    },
  });

  return userDetails;
}


async updateGeneralDetails(body: {
  email: string;
  Gender: string;
  isVegetarian: boolean;
}) {
  const user = await this.prisma.user.findUnique({
    where: { email: body.email },
  });

  if (!user || !user.isVerified) {
    throw new Error('User not found or not verified');
  }

  const userDetails = await this.prisma.userDetails.update({
    where: { userid: user.id },
    data: {
      Gender: body.Gender,
      isVegetarian: body.isVegetarian,
    },
  });

  return userDetails;
}


async TaskinHand(body:{email}) {
  const user = await this.prisma.user.findUnique({
    where : {
      email : body.email
    },
    select: {
      id: true,
    },
  })

  if (!user) {
    throw new Error('User not found');
  }

  const tasks = await this.prisma.tasks.findMany({
    where: {
      userid: user.id,
      Finished: false,
      OR: [
        { Repeating: true },
        {
          Deadline: {
            gte: new Date()
          }
        }
      ]
    },
    orderBy: {
      Deadline: 'asc',
    }
  });
  
  return tasks;
}

async addTask(body: TaskDto) {
  const user = await this.prisma.user.findUnique({
    where: { email: body.email },
    select: { id: true },
  });

  if (!user) throw new Error('User not found');

  const task = await this.prisma.tasks.create({
    data: {
      title: body.title,
      description: body.description,
      userid: user.id,
      Deadline: body.Deadline ? new Date(body.Deadline) : undefined,
      Finished: body.Finished,
      Repeating: body.Repeating,
      RepeatedDays: body.RepeatedDays,
    },
  });

  return task;
}


}
