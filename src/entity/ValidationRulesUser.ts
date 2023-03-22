import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn} from 'typeorm';

@Entity()
export class ValidationRulesUser {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    guild_id!: string;

    @Column()
    role_id!: string;

    @Column()
    user_id!: string

    @CreateDateColumn()
    create?: number;

    @UpdateDateColumn()
    update?: number;

    @VersionColumn()
    version?: number;
}
