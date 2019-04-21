import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { UserModule } from './../src/user/user.module';
import { IUserUpdateInfoPayload } from 'src/user/user.interface';

describe('UserController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user/sing-up (POST)', () => {
    return request(app.getHttpServer())
      .post('/user/sign-up')
      .send({ phone_number: '0', password: '1234' })
      .expect(201)
      .expect(JSON.stringify({ err: false }));
  });

  it('/user/login (POST)', () => {
    return request(app.getHttpServer())
        .post('/user/login')
        .send({ phone_number: '0', password: '1234' })
        .expect(201)
        .then(res => {
            expect(res.body.err).toBeFalsy();
            expect(res.body).toHaveProperty('data');
            expect(res.body.data).toHaveProperty('token');
        });
  });

  it('/user/update-info (PUT)', () => {
    const payload: IUserUpdateInfoPayload = {
        old_password: '',
        new_password: '',
        first_name: 'john',
        last_name: 'doe',
        address: 'Tehran, Iran',
        telephone: '021-77889900',
        postal_code: '000',
    };

    return request(app.getHttpServer())
        .put('/user/update-info')
        .send(payload)
        .expect(200)
        .then(res => {
            expect(res.body.err).toBeFalsy();
            expect(res.body).toHaveProperty('data');
            expect(res.body.data).toHaveProperty('token');
        });
    });
});
