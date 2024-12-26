import { Inject, Injectable } from '@nestjs/common';
import { NotificationEntity } from 'src/typeorm/entities/notification.entity';
import { Repository } from 'typeorm';
import * as firebaseAdmin from 'firebase-admin';

firebaseAdmin.initializeApp({
  // credential: firebaseAdmin.credential.cert('./firebase.json'),
});

@Injectable()
export class NotificationsService {
  constructor(
    @Inject('NOTIFICATION_REPOSITORY')
    private notificationRepository: Repository<NotificationEntity>,
  ) {}

  async sendPushNotificationForEmployee(
    token: string,
    notification: { title: string; body: string },
  ) {
    await firebaseAdmin
      .messaging()
      .send({
        notification,
        token,
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
}
