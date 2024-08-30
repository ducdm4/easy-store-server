import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NotificationsService } from 'src/notification/notifications.service';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly userService: UsersService,
    private readonly notificationService: NotificationsService,
  ) {}
}
