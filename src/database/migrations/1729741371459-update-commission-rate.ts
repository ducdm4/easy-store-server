import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCommissionRate1729741371459 implements MigrationInterface {
    name = 'UpdateCommissionRate1729741371459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`combos\` ADD \`commissionRate\` decimal(11,2) NULL`);
        await queryRunner.query(`ALTER TABLE \`combos\` ADD \`commissionType\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`packages\` ADD \`commissionRate\` decimal(11,2) NULL`);
        await queryRunner.query(`ALTER TABLE \`packages\` ADD \`commissionType\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`packages\` DROP COLUMN \`commissionType\``);
        await queryRunner.query(`ALTER TABLE \`packages\` DROP COLUMN \`commissionRate\``);
        await queryRunner.query(`ALTER TABLE \`combos\` DROP COLUMN \`commissionType\``);
        await queryRunner.query(`ALTER TABLE \`combos\` DROP COLUMN \`commissionRate\``);
    }

}
