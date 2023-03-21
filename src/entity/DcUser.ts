import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn} from 'typeorm';

@Entity()
export class DcUser {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    user_id!:string;

    @Column()
    access_token!:string

    @Column()
    refresh_token!:string

    @CreateDateColumn()
    create?: number;

    @UpdateDateColumn()
    update?: number;

    @VersionColumn()
    version?: number;
}
