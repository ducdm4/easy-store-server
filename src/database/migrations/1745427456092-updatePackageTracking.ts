import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePackageTracking1745427456092 implements MigrationInterface {
    name = 'UpdatePackageTracking1745427456092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`package-purchased\` ADD \`receiptId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`package-tracking\` ADD \`receiptId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`package-purchased\` ADD CONSTRAINT \`FK_87824ba17e9571138c58f87ea5c\` FOREIGN KEY (\`receiptId\`) REFERENCES \`receipts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`package-tracking\` ADD CONSTRAINT \`FK_223d3086507eb54bef8a6a7ef3f\` FOREIGN KEY (\`receiptId\`) REFERENCES \`receipts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`package-tracking\` DROP FOREIGN KEY \`FK_223d3086507eb54bef8a6a7ef3f\``);
        await queryRunner.query(`ALTER TABLE \`package-purchased\` DROP FOREIGN KEY \`FK_87824ba17e9571138c58f87ea5c\``);
        await queryRunner.query(`ALTER TABLE \`package-tracking\` DROP COLUMN \`receiptId\``);
        await queryRunner.query(`ALTER TABLE \`package-purchased\` DROP COLUMN \`receiptId\``);
    }

}
