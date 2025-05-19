import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { generateHash } from '../../common/utils';
import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsEnum,
  IsOptional,
  IsDate,
} from 'class-validator';

import { RoleType } from '../../constants/role-type';
export type UserDocument = User & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class User {
  id: string;

  @IsString()
  @MinLength(1)
  @MaxLength(20)
  @ApiProperty()
  @Prop({ type: 'string', required: true, trim: true })
  name: string;

  @IsEmail()
  @ApiProperty()
  @Prop({
    type: 'string',
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  })
  email: string;

  @IsString()
  @MinLength(5)
  @ApiProperty()
  @Prop({ type: 'string', trim: true })
  password: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @ApiProperty()
  @Prop({ type: 'string', trim: true })
  avatar: string;

  @IsString()
  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'Role' })
  roleId: Types.ObjectId;

  @Prop({ type: 'boolean', required: true, default: true })
  isActive: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty()
  @Prop({ type: 'string', trim: true })
  surname: string;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  @Prop({ type: 'Date' })
  birth: Date;

  @IsOptional()
  @IsString()
  @ApiProperty()
  @Prop({ type: 'string', trim: true })
  description: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  @Prop({ type: 'string', trim: true })
  address: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  @Prop({ type: 'string', trim: true })
  inchargeperson: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  @Prop({ type: 'string', trim: true })
  vat: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  @Prop({ type: 'string', trim: true })
  pec: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  @Prop({ type: 'string', trim: true })
  job: string;

  @ApiProperty()
  @Prop({ type: Number, default: 0 })
  donatedAmount: number; // Total donated amount
  @ApiProperty()
  @Prop({ type: Number, default: 0 })
  receivedAmount: number; // Total donated amount

  @IsOptional()
  @IsString()
  @ApiProperty()
  @Prop({ type: 'string', trim: true })
  iban: string;

  @Prop({ type: String, default: null }) // Store Stripe Account ID
  stripeAccountId: string | null;

  @Prop({ default: true })
  isOnboarded: boolean;
  @Prop({ required: true, default: true })
  isPublic: boolean;
  @Prop()
  passwordResetOtp?: number;

  @Prop()
  passwordResetOtpExpires?: Date;
}

const UserSchema = SchemaFactory.createForClass(User);

// Hooks
UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = generateHash(this.password);
  next();
});

UserSchema.virtual('id').get(function (this: UserDocument) {
  return this._id.toString();
});

export { UserSchema };
function Column(arg0: {
  default: boolean;
}): (target: User, propertyKey: 'isOnboarded') => void {
  throw new Error('Function not implemented.');
}
