import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn} from 'typeorm';

@Entity()
export class ValidationRules {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    guild_id!: string;

    @Column()
    role_id!: string;

    @Column()
    description!: string;

    @Column()
    chain_type!: string;

    @Column()
    token_type!: string;

    @Column()
    smart_contract_address!: string;

    @Column()
    min_token_amount!: string;

    @Column()
    max_token_amount!: string;

    @CreateDateColumn()
    create?: number;

    @UpdateDateColumn()
    update?: number;

    @VersionColumn()
    version?: number;
}
