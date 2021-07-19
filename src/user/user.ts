import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop()
    login: string;

    @Prop()
    senha: string;

    @Prop()
    favoritos: number[];
}

export const UserSchema = SchemaFactory.createForClass(User);