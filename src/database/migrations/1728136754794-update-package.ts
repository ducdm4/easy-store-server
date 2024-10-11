import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePackage1728136754794 implements MigrationInterface {
    name = 'UpdatePackage1728136754794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`combo-quantity\` DROP FOREIGN KEY \`FK_9e03959a360bae75465531e7e47\``);
        await queryRunner.query(`ALTER TABLE \`packages\` DROP FOREIGN KEY \`FK_47ec6b75876906c640c4ee6ddb1\``);
        await queryRunner.query(`ALTER TABLE \`packages\` DROP FOREIGN KEY \`FK_7a4fff9ea1e8dc22c48b7fb22ee\``);
        await queryRunner.query(`ALTER TABLE \`package-purchased\` CHANGE \`remaining\` \`purchasedAt\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`package-tracking\` CHANGE \`quantityUsed\` \`usedAt\` int NOT NULL`);
        await queryRunner.query(`CREATE TABLE \`package-product-quantity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL DEFAULT '1', \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`packageId\` int NULL, \`productId\` int NULL, \`comboId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`package-tracking-product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantityUsed\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`packageTrackingId\` int NULL, \`productId\` int NULL, \`comboId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`combo-quantity\` DROP COLUMN \`comboUsedId\``);
        await queryRunner.query(`ALTER TABLE \`packages\` DROP COLUMN \`comboId\``);
        await queryRunner.query(`ALTER TABLE \`packages\` DROP COLUMN \`productId\``);
        await queryRunner.query(`ALTER TABLE \`package-purchased\` DROP COLUMN \`purchasedAt\``);
        await queryRunner.query(`ALTER TABLE \`package-purchased\` ADD \`purchasedAt\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`package-tracking\` DROP COLUMN \`usedAt\``);
        await queryRunner.query(`ALTER TABLE \`package-tracking\` ADD \`usedAt\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`package-product-quantity\` ADD CONSTRAINT \`FK_77610edc7215b502b2c23d46c5c\` FOREIGN KEY (\`packageId\`) REFERENCES \`packages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`package-product-quantity\` ADD CONSTRAINT \`FK_71ba1ff0d3abcc3d86e5c4166f3\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`package-product-quantity\` ADD CONSTRAINT \`FK_c3d8d6685ca0b7ff4b2a4b36752\` FOREIGN KEY (\`comboId\`) REFERENCES \`combos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`package-tracking-product\` ADD CONSTRAINT \`FK_dd3a52f46100529c82574108397\` FOREIGN KEY (\`packageTrackingId\`) REFERENCES \`package-tracking\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`package-tracking-product\` ADD CONSTRAINT \`FK_5bcaa50f4077d2bc579709a698b\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`package-tracking-product\` ADD CONSTRAINT \`FK_8ca5d7d97e75f46d7d0513c52bb\` FOREIGN KEY (\`comboId\`) REFERENCES \`combos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`package-tracking-product\` DROP FOREIGN KEY \`FK_8ca5d7d97e75f46d7d0513c52bb\``);
        await queryRunner.query(`ALTER TABLE \`package-tracking-product\` DROP FOREIGN KEY \`FK_5bcaa50f4077d2bc579709a698b\``);
        await queryRunner.query(`ALTER TABLE \`package-tracking-product\` DROP FOREIGN KEY \`FK_dd3a52f46100529c82574108397\``);
        await queryRunner.query(`ALTER TABLE \`package-product-quantity\` DROP FOREIGN KEY \`FK_c3d8d6685ca0b7ff4b2a4b36752\``);
        await queryRunner.query(`ALTER TABLE \`package-product-quantity\` DROP FOREIGN KEY \`FK_71ba1ff0d3abcc3d86e5c4166f3\``);
        await queryRunner.query(`ALTER TABLE \`package-product-quantity\` DROP FOREIGN KEY \`FK_77610edc7215b502b2c23d46c5c\``);
        await queryRunner.query(`ALTER TABLE \`package-tracking\` DROP COLUMN \`usedAt\``);
        await queryRunner.query(`ALTER TABLE \`package-tracking\` ADD \`usedAt\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`package-purchased\` DROP COLUMN \`purchasedAt\``);
        await queryRunner.query(`ALTER TABLE \`package-purchased\` ADD \`purchasedAt\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`packages\` ADD \`productId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`packages\` ADD \`comboId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`combo-quantity\` ADD \`comboUsedId\` int NULL`);
        await queryRunner.query(`DROP TABLE \`package-tracking-product\``);
        await queryRunner.query(`DROP TABLE \`package-product-quantity\``);
        await queryRunner.query(`ALTER TABLE \`package-tracking\` CHANGE \`usedAt\` \`quantityUsed\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`package-purchased\` CHANGE \`purchasedAt\` \`remaining\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`packages\` ADD CONSTRAINT \`FK_7a4fff9ea1e8dc22c48b7fb22ee\` FOREIGN KEY (\`comboId\`) REFERENCES \`combos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`packages\` ADD CONSTRAINT \`FK_47ec6b75876906c640c4ee6ddb1\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`combo-quantity\` ADD CONSTRAINT \`FK_9e03959a360bae75465531e7e47\` FOREIGN KEY (\`comboUsedId\`) REFERENCES \`combos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
