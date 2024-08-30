import { Inject, Injectable } from '@nestjs/common';
import { NotificationEntity } from 'src/typeorm/entities/notification.entity';
import { Repository } from 'typeorm';
import * as firebaseAdmin from 'firebase-admin';

const firebaseConfig = {
  apiKey: 'AIzaSyD80ARblxY_LnRznwmySo-WExRKx_OdOJc',
  authDomain: 'delivery-system-ccad9.firebaseapp.com',
  projectId: 'delivery-system-ccad9',
  storageBucket: 'delivery-system-ccad9.appspot.com',
  messagingSenderId: '978808956556',
  appId: '1:978808956556:web:1c0221228adc9a98787da9',
  measurementId: 'G-QKTK3XVXGE',
};

firebaseAdmin.initializeApp(firebaseConfig);

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
