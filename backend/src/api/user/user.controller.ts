import { Body, Controller, Get, Post,Res, Param, BadRequestException, Query } from '@nestjs/common';
import { UserService } from './user.service';
import UserInfoDto from './dto/userinfo.dto';
import { TaskDto } from './dto/task.dto';

@Controller('user')
export class UserController {
  
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @Post('register')
  register(@Body() body:UserInfoDto) {
    return this.userService.register(body)
  }

  @Post('login')
  login(@Body() body:{email:string; password:string}) {
    return this.userService.Login(body)
  }

  @Post('verify')
  verifyEmail(
    @Body() body: { email: string; token: string },
    @Res({ passthrough: true }) response,
  ) {
    return this.userService.verifyEmail(body,response)
  }
  @Post('exists')
  async checkUserExists(@Body() body: { email: string }) {
    try {
      return await this.userService.checkUserExists(body);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post('is-verified')
  async checkVerification(@Body() body: { email: string }) {
    try {
      return await this.userService.checkVerificationStatus(body.email);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }


  @Post('details')
  async fetchdetails(@Body() body: { email: string }) {
    try {
      return await this.userService.fetchdetails(body);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post('add-academic-details')
  async addAcademicDetails(@Body() body: {
    email: string;
    Rollno: number;
    Year: number;
    Course: string;
    Branch: string;
    Department: string;
  }) {
    try {
      const details = await this.userService.addAcademicDetails(body);
      return details;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post('add-general-details')
  async addGeneralDetails(@Body() body: {
    email: string;
    Gender: string;
    isVegetarian: boolean;
  }) {
    try {
      const details = await this.userService.updateGeneralDetails(body);
      return details;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post('add-tasks')
  async addTask(@Body() body: TaskDto) {
    try {
      return await this.userService.addTask(body);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post('tasks-in-hand')
  async getTasksInHand(@Body() body: { email: string }) {
    try {
      return await this.userService.TaskinHand(body);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

}
