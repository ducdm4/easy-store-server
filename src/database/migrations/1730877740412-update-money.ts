import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMoney1730877740412 implements MigrationInterface {
    name = 'UpdateMoney1730877740412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`money-transactions\` CHANGE \`amount\` \`amount\` decimal(14,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`money-balance-daily\` CHANGE \`balance\` \`balance\` decimal(14,2) NOT NULL DEFAULT '0.00'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`money-balance-daily\` CHANGE \`balance\` \`balance\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`money-transactions\` CHANGE \`amount\` \`amount\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
    }

}
