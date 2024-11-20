import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePromotion1731739340126 implements MigrationInterface {
    name = 'UpdatePromotion1731739340126'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`receipt-promo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`discountType\` int NULL, \`discountAmount\` decimal(11,2) NOT NULL DEFAULT '0.00', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`receiptId\` int NULL, \`codeId\` int NULL, \`campaignId\` int NULL, \`receiptItemId\` int NULL, \`receiptToppingItemId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`receipt-product-topping\` DROP COLUMN \`priceDiscount\``);
        await queryRunner.query(`ALTER TABLE \`receipt-product-topping\` DROP COLUMN \`promoDiscount\``);
        await queryRunner.query(`ALTER TABLE \`receipt-products\` DROP COLUMN \`priceDiscount\``);
        await queryRunner.query(`ALTER TABLE \`receipt-products\` DROP COLUMN \`promoDiscount\``);
        await queryRunner.query(`ALTER TABLE \`receipts\` DROP COLUMN \`promoDiscount\``);
        await queryRunner.query(`ALTER TABLE \`receipt-product-topping\` ADD \`priceDiscounted\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`receipt-products\` ADD \`priceDiscounted\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`itemQuantity\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`productId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`comboId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`packageId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`receipt-product-topping\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`receipt-product-topping\` ADD \`price\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`receipt-products\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`receipt-products\` ADD \`price\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`receipts\` DROP COLUMN \`subTotal\``);
        await queryRunner.query(`ALTER TABLE \`receipts\` ADD \`subTotal\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`receipts\` DROP COLUMN \`total\``);
        await queryRunner.query(`ALTER TABLE \`receipts\` ADD \`total\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD CONSTRAINT \`FK_6bbc7a32da0a87f37f093642244\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD CONSTRAINT \`FK_9843df3b87b38c7424f513a8d7d\` FOREIGN KEY (\`comboId\`) REFERENCES \`combos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD CONSTRAINT \`FK_4a2e7e827d7881de2d34e2de6da\` FOREIGN KEY (\`packageId\`) REFERENCES \`packages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`receipt-promo\` ADD CONSTRAINT \`FK_aef9f541f946257ef4f2f995af1\` FOREIGN KEY (\`receiptId\`) REFERENCES \`receipts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`receipt-promo\` ADD CONSTRAINT \`FK_59636cdd11e65847ed6301eacbf\` FOREIGN KEY (\`codeId\`) REFERENCES \`promo-codes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`receipt-promo\` ADD CONSTRAINT \`FK_28ebbd5b4502a5140393e5a49b1\` FOREIGN KEY (\`campaignId\`) REFERENCES \`promo-campaigns\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`receipt-promo\` ADD CONSTRAINT \`FK_a20401b2673d8480f12c762b51e\` FOREIGN KEY (\`receiptItemId\`) REFERENCES \`receipt-products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`receipt-promo\` ADD CONSTRAINT \`FK_1d5a83c08fbee417ca37b94536e\` FOREIGN KEY (\`receiptToppingItemId\`) REFERENCES \`receipt-product-topping\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipt-promo\` DROP FOREIGN KEY \`FK_1d5a83c08fbee417ca37b94536e\``);
        await queryRunner.query(`ALTER TABLE \`receipt-promo\` DROP FOREIGN KEY \`FK_a20401b2673d8480f12c762b51e\``);
        await queryRunner.query(`ALTER TABLE \`receipt-promo\` DROP FOREIGN KEY \`FK_28ebbd5b4502a5140393e5a49b1\``);
        await queryRunner.query(`ALTER TABLE \`receipt-promo\` DROP FOREIGN KEY \`FK_59636cdd11e65847ed6301eacbf\``);
        await queryRunner.query(`ALTER TABLE \`receipt-promo\` DROP FOREIGN KEY \`FK_aef9f541f946257ef4f2f995af1\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP FOREIGN KEY \`FK_4a2e7e827d7881de2d34e2de6da\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP FOREIGN KEY \`FK_9843df3b87b38c7424f513a8d7d\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP FOREIGN KEY \`FK_6bbc7a32da0a87f37f093642244\``);
        await queryRunner.query(`ALTER TABLE \`receipts\` DROP COLUMN \`total\``);
        await queryRunner.query(`ALTER TABLE \`receipts\` ADD \`total\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`receipts\` DROP COLUMN \`subTotal\``);
        await queryRunner.query(`ALTER TABLE \`receipts\` ADD \`subTotal\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`receipt-products\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`receipt-products\` ADD \`price\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`receipt-product-topping\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`receipt-product-topping\` ADD \`price\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`packageId\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`comboId\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`productId\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`itemQuantity\``);
        await queryRunner.query(`ALTER TABLE \`receipt-products\` DROP COLUMN \`priceDiscounted\``);
        await queryRunner.query(`ALTER TABLE \`receipt-product-topping\` DROP COLUMN \`priceDiscounted\``);
        await queryRunner.query(`ALTER TABLE \`receipts\` ADD \`promoDiscount\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`receipt-products\` ADD \`promoDiscount\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`receipt-products\` ADD \`priceDiscount\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`receipt-product-topping\` ADD \`promoDiscount\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`receipt-product-topping\` ADD \`priceDiscount\` int NOT NULL`);
        await queryRunner.query(`DROP TABLE \`receipt-promo\``);
    }

}
