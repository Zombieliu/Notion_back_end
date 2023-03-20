import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn} from 'typeorm';

@Entity()
export class Guildbot {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    guild_id!: string;

    @Column()
    permissions!:string

    @CreateDateColumn()
    create?: number;

    @UpdateDateColumn()
    update?: number;

    @VersionColumn()
    version?: number;
}
