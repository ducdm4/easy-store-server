import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateReceipt1746584134328 implements MigrationInterface {
    name = 'UpdateReceipt1746584134328'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipt-promo\` DROP FOREIGN KEY \`FK_1d5a83c08fbee417ca37b94536e\``);
        await queryRunner.query(`ALTER TABLE \`receipt-promo\` DROP FOREIGN KEY \`FK_a20401b2673d8480f12c762b51e\``);
        await queryRunner.query(`ALTER TABLE \`receipt-products\` DROP COLUMN \`priceDiscounted\``);
        await queryRunner.query(`ALTER TABLE \`receipt-products\` DROP COLUMN \`discounted\``);
        await queryRunner.query(`ALTER TABLE \`receipt-product-topping\` DROP COLUMN \`priceDiscounted\``);
        await queryRunner.query(`ALTER TABLE \`receipt-promo\` DROP COLUMN \`discountType\``);
        await queryRunner.query(`ALTER TABLE \`receipt-promo\` DROP COLUMN \`discountAmount\``);
        await queryRunner.query(`ALTER TABLE \`receipt-promo\` DROP COLUMN \`receiptItemId\``);
        await queryRunner.query(`ALTER TABLE \`receipt-promo\` DROP COLUMN \`receiptToppingItemId\``);
        await queryRunner.query(`ALTER TABLE \`receipt-promo\` ADD \`discountedAmount\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipt-promo\` DROP COLUMN \`discountedAmount\``);
        await queryRunner.query(`ALTER TABLE \`receipt-promo\` ADD \`receiptToppingItemId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`receipt-promo\` ADD \`receiptItemId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`receipt-promo\` ADD \`discountAmount\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`receipt-promo\` ADD \`discountType\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`receipt-product-topping\` ADD \`priceDiscounted\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`receipt-products\` ADD \`discounted\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`receipt-products\` ADD \`priceDiscounted\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`receipt-promo\` ADD CONSTRAINT \`FK_a20401b2673d8480f12c762b51e\` FOREIGN KEY (\`receiptItemId\`) REFERENCES \`receipt-products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`receipt-promo\` ADD CONSTRAINT \`FK_1d5a83c08fbee417ca37b94536e\` FOREIGN KEY (\`receiptToppingItemId\`) REFERENCES \`receipt-product-topping\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
