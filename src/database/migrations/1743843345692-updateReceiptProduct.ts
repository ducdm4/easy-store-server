import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateReceiptProduct1743843345692 implements MigrationInterface {
    name = 'UpdateReceiptProduct1743843345692'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipt-products\` ADD \`packagePurchasedId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`receipt-products\` ADD CONSTRAINT \`FK_30559ef4cc916084823cfef0dd7\` FOREIGN KEY (\`packagePurchasedId\`) REFERENCES \`package-purchased\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipt-products\` DROP FOREIGN KEY \`FK_30559ef4cc916084823cfef0dd7\``);
        await queryRunner.query(`ALTER TABLE \`receipt-products\` DROP COLUMN \`packagePurchasedId\``);
    }

}
