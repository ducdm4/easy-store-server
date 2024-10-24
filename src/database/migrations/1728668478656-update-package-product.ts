import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePackageProduct1728668478656 implements MigrationInterface {
    name = 'UpdatePackageProduct1728668478656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`package-product-quantity\` DROP COLUMN \`isActive\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`package-product-quantity\` ADD \`isActive\` tinyint NOT NULL DEFAULT '1'`);
    }

}
