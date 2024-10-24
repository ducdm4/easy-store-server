import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateQuantityFloat1729142292572 implements MigrationInterface {
    name = 'UpdateQuantityFloat1729142292572'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_5baea1af19d8746fb213523e77\` ON \`packages\``);
        await queryRunner.query(`ALTER TABLE \`combo-product-topping\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`combo-product-topping\` ADD \`quantity\` decimal(5,1) NOT NULL DEFAULT '1.0'`);
        await queryRunner.query(`ALTER TABLE \`combo-quantity\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`combo-quantity\` ADD \`quantity\` decimal(5,1) NOT NULL DEFAULT '1.0'`);
        await queryRunner.query(`ALTER TABLE \`package-product-quantity\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`package-product-quantity\` ADD \`quantity\` decimal(5,1) NOT NULL DEFAULT '1.0'`);
        await queryRunner.query(`ALTER TABLE \`receipt-products\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`receipt-products\` ADD \`quantity\` decimal(5,1) NOT NULL DEFAULT '1.0'`);
        await queryRunner.query(`ALTER TABLE \`receipt-product-topping\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`receipt-product-topping\` ADD \`quantity\` decimal(5,1) NOT NULL DEFAULT '1.0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipt-product-topping\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`receipt-product-topping\` ADD \`quantity\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`receipt-products\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`receipt-products\` ADD \`quantity\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`package-product-quantity\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`package-product-quantity\` ADD \`quantity\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`combo-quantity\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`combo-quantity\` ADD \`quantity\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`combo-product-topping\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`combo-product-topping\` ADD \`quantity\` int NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_5baea1af19d8746fb213523e77\` ON \`packages\` (\`imageId\`)`);
    }

}
