import { IsUUID } from 'class-validator';

export class LaunchFindDto {

    @IsUUID()
    uuid!: string

}