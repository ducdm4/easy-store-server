import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePackagePurchase1745743992781 implements MigrationInterface {
    name = 'UpdatePackagePurchase1745743992781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`package-purchased\` ADD \`timeCanUseTotal\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`package-purchased\` DROP COLUMN \`timeCanUseTotal\``);
    }

}
