import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET_KEY || 'secret',
        signOptions: { expiresIn: process.env.JWT_EXP || '3600s' },
      }),
    }),
  ],
  providers: [AuthService, JwtGuard, JwtStrategy, RolesGuard],
  controllers: [AuthController],
})
export class AuthModule {}
