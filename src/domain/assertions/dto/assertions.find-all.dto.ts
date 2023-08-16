import { IsUUID } from "class-validator";

export class AssertionsFindAllDto {
    @IsUUID()
    launch_uuid!: string
}