import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDelivery1747987648450 implements MigrationInterface {
    name = 'UpdateDelivery1747987648450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipts\` ADD \`deliveryAddress\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`receipts\` ADD \`deliveryName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`receipts\` ADD \`deliveryPhone\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`receipts\` ADD \`deliveryFee\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipts\` DROP COLUMN \`deliveryFee\``);
        await queryRunner.query(`ALTER TABLE \`receipts\` DROP COLUMN \`deliveryPhone\``);
        await queryRunner.query(`ALTER TABLE \`receipts\` DROP COLUMN \`deliveryName\``);
        await queryRunner.query(`ALTER TABLE \`receipts\` DROP COLUMN \`deliveryAddress\``);
    }

}
