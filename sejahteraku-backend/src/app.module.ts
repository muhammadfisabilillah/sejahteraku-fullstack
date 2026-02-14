import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AiConsultantModule } from './ai-consultant/ai-consultant.module';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { JobsModule } from './jobs/jobs.module';
import { ApplicationsModule } from './applications/applications.module';
import { AiModule } from './ai/ai.module';
import { CoursesModule } from './courses/courses.module';
import { CertificatesModule } from './certificates/certificates.module';
import { ProfileModule } from './profile/profile.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { MailerModule } from './mailer/mailer.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule, 
    PrismaModule, 
    AiConsultantModule, 
    UsersModule, 
    CompaniesModule, 
    JobsModule, 
    ApplicationsModule, 
    AiModule, 
    CoursesModule, 
    CertificatesModule, ProfileModule, DashboardModule, MailerModule, ChatModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}