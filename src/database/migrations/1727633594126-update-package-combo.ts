import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePackageCombo1727633594126 implements MigrationInterface {
    name = 'UpdatePackageCombo1727633594126'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`packages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`price\` int NOT NULL DEFAULT '0', \`expiryTime\` int NULL, \`timesCanUse\` int NOT NULL DEFAULT '1', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`storeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`package-purchased\` (\`id\` int NOT NULL AUTO_INCREMENT, \`remaining\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`customerId\` int NULL, \`packageId\` int NULL, \`storeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`package-tracking\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantityUsed\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`packagePurchasedId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`spends\` ADD \`type\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`quantity\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`packages\` ADD CONSTRAINT \`FK_84d332f43a30502aef998713c1f\` FOREIGN KEY (\`storeId\`) REFERENCES \`stores\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`package-purchased\` ADD CONSTRAINT \`FK_087d7c57a42f5dafd88d785ed53\` FOREIGN KEY (\`customerId\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`package-purchased\` ADD CONSTRAINT \`FK_00a11cb4b0296445fa113d92600\` FOREIGN KEY (\`packageId\`) REFERENCES \`packages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`package-purchased\` ADD CONSTRAINT \`FK_e112e7103b6210b099b13fe8144\` FOREIGN KEY (\`storeId\`) REFERENCES \`stores\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`package-tracking\` ADD CONSTRAINT \`FK_33831f2945faeb6dec1406f3157\` FOREIGN KEY (\`packagePurchasedId\`) REFERENCES \`package-purchased\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`package-tracking\` DROP FOREIGN KEY \`FK_33831f2945faeb6dec1406f3157\``);
        await queryRunner.query(`ALTER TABLE \`package-purchased\` DROP FOREIGN KEY \`FK_e112e7103b6210b099b13fe8144\``);
        await queryRunner.query(`ALTER TABLE \`package-purchased\` DROP FOREIGN KEY \`FK_00a11cb4b0296445fa113d92600\``);
        await queryRunner.query(`ALTER TABLE \`package-purchased\` DROP FOREIGN KEY \`FK_087d7c57a42f5dafd88d785ed53\``);
        await queryRunner.query(`ALTER TABLE \`packages\` DROP FOREIGN KEY \`FK_84d332f43a30502aef998713c1f\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`spends\` DROP COLUMN \`type\``);
        await queryRunner.query(`DROP TABLE \`package-tracking\``);
        await queryRunner.query(`DROP TABLE \`package-purchased\``);
        await queryRunner.query(`DROP TABLE \`packages\``);
    }

}
