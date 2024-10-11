import { MigrationInterface, QueryRunner } from "typeorm";

export class AddReceiptProductTopping1727929788862 implements MigrationInterface {
    name = 'AddReceiptProductTopping1727929788862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`combo-quantity\` DROP FOREIGN KEY \`FK_d3a7e5e3ec3de49cdb1a156a667\``);
        await queryRunner.query(`CREATE TABLE \`receipt-products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL, \`price\` int NOT NULL, \`priceDiscount\` int NOT NULL, \`promoDiscount\` int NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`receiptId\` int NULL, \`productId\` int NULL, \`comboId\` int NULL, \`packageId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`receipt-product-topping\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL, \`price\` int NOT NULL, \`priceDiscount\` int NOT NULL, \`promoDiscount\` int NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`receiptProductId\` int NULL, \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`combo-trackings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantityUsed\` int NOT NULL, \`remaining\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`comboId\` int NULL, \`customerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`receipt-products_promo_codes_promo-codes\` (\`receiptProductsId\` int NOT NULL, \`promoCodesId\` int NOT NULL, INDEX \`IDX_a83d2af91483affe2095a7e528\` (\`receiptProductsId\`), INDEX \`IDX_4df32f88b9e860269bc7b0aa2d\` (\`promoCodesId\`), PRIMARY KEY (\`receiptProductsId\`, \`promoCodesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`receipt-product-topping_promo_codes_promo-codes\` (\`receiptProductToppingId\` int NOT NULL, \`promoCodesId\` int NOT NULL, INDEX \`IDX_9b1410120e4a6828337cea7e6e\` (\`receiptProductToppingId\`), INDEX \`IDX_3fa1f05758481feb3e2b548106\` (\`promoCodesId\`), PRIMARY KEY (\`receiptProductToppingId\`, \`promoCodesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`combo-quantity\` DROP COLUMN \`productId\``);
        await queryRunner.query(`ALTER TABLE \`combo-quantity\` ADD \`productUsedId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`combo-quantity\` ADD \`comboUsedId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`combo-quantity\` ADD CONSTRAINT \`FK_e38221ca38f2cbfd6b2abe0d26c\` FOREIGN KEY (\`productUsedId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`combo-quantity\` ADD CONSTRAINT \`FK_9e03959a360bae75465531e7e47\` FOREIGN KEY (\`comboUsedId\`) REFERENCES \`combos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`receipt-products\` ADD CONSTRAINT \`FK_a0413924f4060581cc63492b7cc\` FOREIGN KEY (\`receiptId\`) REFERENCES \`receipts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`receipt-products\` ADD CONSTRAINT \`FK_d290bc6b1fa19f16967d0aa1330\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`receipt-products\` ADD CONSTRAINT \`FK_8d94d21a8f1cfbf165a6067981e\` FOREIGN KEY (\`comboId\`) REFERENCES \`combos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`receipt-products\` ADD CONSTRAINT \`FK_ade8d1bbd818ae6c1ef49fcfe78\` FOREIGN KEY (\`packageId\`) REFERENCES \`packages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`receipt-product-topping\` ADD CONSTRAINT \`FK_ba5a65454e17c0c559360604b75\` FOREIGN KEY (\`receiptProductId\`) REFERENCES \`receipt-products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`receipt-product-topping\` ADD CONSTRAINT \`FK_385d4c3a0dfa828943e59e6f9e4\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`combo-trackings\` ADD CONSTRAINT \`FK_2a1dee5d9475ab85d4b714fa274\` FOREIGN KEY (\`comboId\`) REFERENCES \`combos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`combo-trackings\` ADD CONSTRAINT \`FK_2dca5e1ec185841659b52245052\` FOREIGN KEY (\`customerId\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`receipt-products_promo_codes_promo-codes\` ADD CONSTRAINT \`FK_a83d2af91483affe2095a7e5286\` FOREIGN KEY (\`receiptProductsId\`) REFERENCES \`receipt-products\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`receipt-products_promo_codes_promo-codes\` ADD CONSTRAINT \`FK_4df32f88b9e860269bc7b0aa2db\` FOREIGN KEY (\`promoCodesId\`) REFERENCES \`promo-codes\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`receipt-product-topping_promo_codes_promo-codes\` ADD CONSTRAINT \`FK_9b1410120e4a6828337cea7e6ee\` FOREIGN KEY (\`receiptProductToppingId\`) REFERENCES \`receipt-product-topping\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`receipt-product-topping_promo_codes_promo-codes\` ADD CONSTRAINT \`FK_3fa1f05758481feb3e2b548106f\` FOREIGN KEY (\`promoCodesId\`) REFERENCES \`promo-codes\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipt-product-topping_promo_codes_promo-codes\` DROP FOREIGN KEY \`FK_3fa1f05758481feb3e2b548106f\``);
        await queryRunner.query(`ALTER TABLE \`receipt-product-topping_promo_codes_promo-codes\` DROP FOREIGN KEY \`FK_9b1410120e4a6828337cea7e6ee\``);
        await queryRunner.query(`ALTER TABLE \`receipt-products_promo_codes_promo-codes\` DROP FOREIGN KEY \`FK_4df32f88b9e860269bc7b0aa2db\``);
        await queryRunner.query(`ALTER TABLE \`receipt-products_promo_codes_promo-codes\` DROP FOREIGN KEY \`FK_a83d2af91483affe2095a7e5286\``);
        await queryRunner.query(`ALTER TABLE \`combo-trackings\` DROP FOREIGN KEY \`FK_2dca5e1ec185841659b52245052\``);
        await queryRunner.query(`ALTER TABLE \`combo-trackings\` DROP FOREIGN KEY \`FK_2a1dee5d9475ab85d4b714fa274\``);
        await queryRunner.query(`ALTER TABLE \`receipt-product-topping\` DROP FOREIGN KEY \`FK_385d4c3a0dfa828943e59e6f9e4\``);
        await queryRunner.query(`ALTER TABLE \`receipt-product-topping\` DROP FOREIGN KEY \`FK_ba5a65454e17c0c559360604b75\``);
        await queryRunner.query(`ALTER TABLE \`receipt-products\` DROP FOREIGN KEY \`FK_ade8d1bbd818ae6c1ef49fcfe78\``);
        await queryRunner.query(`ALTER TABLE \`receipt-products\` DROP FOREIGN KEY \`FK_8d94d21a8f1cfbf165a6067981e\``);
        await queryRunner.query(`ALTER TABLE \`receipt-products\` DROP FOREIGN KEY \`FK_d290bc6b1fa19f16967d0aa1330\``);
        await queryRunner.query(`ALTER TABLE \`receipt-products\` DROP FOREIGN KEY \`FK_a0413924f4060581cc63492b7cc\``);
        await queryRunner.query(`ALTER TABLE \`combo-quantity\` DROP FOREIGN KEY \`FK_9e03959a360bae75465531e7e47\``);
        await queryRunner.query(`ALTER TABLE \`combo-quantity\` DROP FOREIGN KEY \`FK_e38221ca38f2cbfd6b2abe0d26c\``);
        await queryRunner.query(`ALTER TABLE \`combo-quantity\` DROP COLUMN \`comboUsedId\``);
        await queryRunner.query(`ALTER TABLE \`combo-quantity\` DROP COLUMN \`productUsedId\``);
        await queryRunner.query(`ALTER TABLE \`combo-quantity\` ADD \`productId\` int NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_3fa1f05758481feb3e2b548106\` ON \`receipt-product-topping_promo_codes_promo-codes\``);
        await queryRunner.query(`DROP INDEX \`IDX_9b1410120e4a6828337cea7e6e\` ON \`receipt-product-topping_promo_codes_promo-codes\``);
        await queryRunner.query(`DROP TABLE \`receipt-product-topping_promo_codes_promo-codes\``);
        await queryRunner.query(`DROP INDEX \`IDX_4df32f88b9e860269bc7b0aa2d\` ON \`receipt-products_promo_codes_promo-codes\``);
        await queryRunner.query(`DROP INDEX \`IDX_a83d2af91483affe2095a7e528\` ON \`receipt-products_promo_codes_promo-codes\``);
        await queryRunner.query(`DROP TABLE \`receipt-products_promo_codes_promo-codes\``);
        await queryRunner.query(`DROP TABLE \`combo-trackings\``);
        await queryRunner.query(`DROP TABLE \`receipt-product-topping\``);
        await queryRunner.query(`DROP TABLE \`receipt-products\``);
        await queryRunner.query(`ALTER TABLE \`combo-quantity\` ADD CONSTRAINT \`FK_d3a7e5e3ec3de49cdb1a156a667\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
