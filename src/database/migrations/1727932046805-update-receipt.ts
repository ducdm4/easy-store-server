import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateReceipt1727932046805 implements MigrationInterface {
    name = 'UpdateReceipt1727932046805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`receipts_promo_code_list_promo-codes\` (\`receiptsId\` int NOT NULL, \`promoCodesId\` int NOT NULL, INDEX \`IDX_5a0bef702ee5c5a1da811d5e6f\` (\`receiptsId\`), INDEX \`IDX_d31d384af5b9ea914ee74d6b49\` (\`promoCodesId\`), PRIMARY KEY (\`receiptsId\`, \`promoCodesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`receipts_promo_code_list_promo-codes\` ADD CONSTRAINT \`FK_5a0bef702ee5c5a1da811d5e6f9\` FOREIGN KEY (\`receiptsId\`) REFERENCES \`receipts\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`receipts_promo_code_list_promo-codes\` ADD CONSTRAINT \`FK_d31d384af5b9ea914ee74d6b492\` FOREIGN KEY (\`promoCodesId\`) REFERENCES \`promo-codes\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipts_promo_code_list_promo-codes\` DROP FOREIGN KEY \`FK_d31d384af5b9ea914ee74d6b492\``);
        await queryRunner.query(`ALTER TABLE \`receipts_promo_code_list_promo-codes\` DROP FOREIGN KEY \`FK_5a0bef702ee5c5a1da811d5e6f9\``);
        await queryRunner.query(`DROP INDEX \`IDX_d31d384af5b9ea914ee74d6b49\` ON \`receipts_promo_code_list_promo-codes\``);
        await queryRunner.query(`DROP INDEX \`IDX_5a0bef702ee5c5a1da811d5e6f\` ON \`receipts_promo_code_list_promo-codes\``);
        await queryRunner.query(`DROP TABLE \`receipts_promo_code_list_promo-codes\``);
    }

}
