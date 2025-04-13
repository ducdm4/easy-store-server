import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePackagePurchased1743906398409 implements MigrationInterface {
    name = 'UpdatePackagePurchased1743906398409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`package-purchased\` ADD \`validUntil\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`package-purchased\` ADD \`timeCanUseLeft\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`package-purchased\` DROP COLUMN \`timeCanUseLeft\``);
        await queryRunner.query(`ALTER TABLE \`package-purchased\` DROP COLUMN \`validUntil\``);
    }

}
