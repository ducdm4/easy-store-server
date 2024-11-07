import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePromo1730967067175 implements MigrationInterface {
    name = 'UpdatePromo1730967067175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipts\` CHANGE \`memberDiscount\` \`pointRewarded\` int NULL`);
        await queryRunner.query(`CREATE TABLE \`promo-campaign-bonus\` (\`id\` int NOT NULL AUTO_INCREMENT, \`discountType\` tinyint NOT NULL DEFAULT '0', \`discountAmount\` decimal(5,2) NOT NULL DEFAULT '0.00', \`quantity\` int NOT NULL DEFAULT '0', \`expiryDate\` int NOT NULL DEFAULT '0', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`promoCampaignsId\` int NULL, \`productId\` int NULL, \`comboId\` int NULL, \`packageId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`promo-campaign-conditions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` decimal(5,2) NOT NULL DEFAULT '0.00', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`promoCampaignsId\` int NULL, \`productId\` int NULL, \`comboId\` int NULL, \`packageId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`promo-campaigns\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NULL, \`description\` text NULL, \`timeStart\` datetime NULL, \`timeEnd\` datetime NULL, \`canUseWithOther\` tinyint NOT NULL DEFAULT 1, \`isPaused\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`storeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`un-used-promo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`discountType\` tinyint NOT NULL DEFAULT '0', \`discountAmount\` decimal(5,2) NOT NULL DEFAULT '0.00', \`dueDate\` datetime NULL, \`used\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`customerId\` int NULL, \`productId\` int NULL, \`comboId\` int NULL, \`packageId\` int NULL, \`fromReceiptId\` int NULL, \`storeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`receipts_promo_campaign_list_promo-campaigns\` (\`receiptsId\` int NOT NULL, \`promoCampaignsId\` int NOT NULL, INDEX \`IDX_e1b7cee9e6f0dcef233a88c956\` (\`receiptsId\`), INDEX \`IDX_9489ff4b8395dfc5a6de0e1ee6\` (\`promoCampaignsId\`), PRIMARY KEY (\`receiptsId\`, \`promoCampaignsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`member-ranks\` DROP COLUMN \`discount\``);
        await queryRunner.query(`ALTER TABLE \`member-ranks\` DROP COLUMN \`requirement1\``);
        await queryRunner.query(`ALTER TABLE \`member-ranks\` DROP COLUMN \`requirement2\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`isAutoApply\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`total\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` DROP COLUMN \`canUseWithOther\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`member-ranks\` ADD \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`member-ranks\` ADD \`requirement\` int NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`member-ranks\` ADD \`dropRankInMonth\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`customers\` ADD \`point\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`code\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD UNIQUE INDEX \`IDX_cdf2a0ce026904f32a75095b26\` (\`code\`)`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`quantity\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`discountAmount\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`canUseWithOther\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` ADD \`canUseWithOther\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` ADD \`discountType\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` ADD \`total\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` ADD \`isAutoApply\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`total\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`isAutoApply\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` CHANGE \`discountType\` \`discountType\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` CHANGE \`discountType\` \`discountType\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-campaign-bonus\` ADD CONSTRAINT \`FK_4a3c6ccbdb545ec5777a4f6fab0\` FOREIGN KEY (\`promoCampaignsId\`) REFERENCES \`promo-campaigns\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`promo-campaign-bonus\` ADD CONSTRAINT \`FK_b42c990ffa1bc435cc14b3b9223\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`promo-campaign-bonus\` ADD CONSTRAINT \`FK_730e6eb611d089867c74c7263f0\` FOREIGN KEY (\`comboId\`) REFERENCES \`combos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`promo-campaign-bonus\` ADD CONSTRAINT \`FK_e71e5b2f68df8a66ebd38a79cc0\` FOREIGN KEY (\`packageId\`) REFERENCES \`packages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`promo-campaign-conditions\` ADD CONSTRAINT \`FK_f3c0fc5f6c15d538ddec0e6b431\` FOREIGN KEY (\`promoCampaignsId\`) REFERENCES \`promo-campaigns\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`promo-campaign-conditions\` ADD CONSTRAINT \`FK_0d236a83aa54754d95ba16b390d\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`promo-campaign-conditions\` ADD CONSTRAINT \`FK_ca07d827bea9ccc6c376f4251b3\` FOREIGN KEY (\`comboId\`) REFERENCES \`combos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`promo-campaign-conditions\` ADD CONSTRAINT \`FK_8c53d8606ff7e6475df98f46ac0\` FOREIGN KEY (\`packageId\`) REFERENCES \`packages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` ADD CONSTRAINT \`FK_e6727e4fef7beea4cbe1a5a7ad6\` FOREIGN KEY (\`storeId\`) REFERENCES \`stores\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`un-used-promo\` ADD CONSTRAINT \`FK_28fde2744a9083fdebca4b9d54f\` FOREIGN KEY (\`customerId\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`un-used-promo\` ADD CONSTRAINT \`FK_2f5ea54e4393f9ab60fd4fc0569\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`un-used-promo\` ADD CONSTRAINT \`FK_3ec4aaac2b2e0bd970eb698da90\` FOREIGN KEY (\`comboId\`) REFERENCES \`combos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`un-used-promo\` ADD CONSTRAINT \`FK_503bf544a955a7ef13629796745\` FOREIGN KEY (\`packageId\`) REFERENCES \`packages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`un-used-promo\` ADD CONSTRAINT \`FK_77c91722a14d17faaeb7e809181\` FOREIGN KEY (\`fromReceiptId\`) REFERENCES \`receipts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`un-used-promo\` ADD CONSTRAINT \`FK_22048173140feb324f292a927b1\` FOREIGN KEY (\`storeId\`) REFERENCES \`stores\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`receipts_promo_campaign_list_promo-campaigns\` ADD CONSTRAINT \`FK_e1b7cee9e6f0dcef233a88c9567\` FOREIGN KEY (\`receiptsId\`) REFERENCES \`receipts\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`receipts_promo_campaign_list_promo-campaigns\` ADD CONSTRAINT \`FK_9489ff4b8395dfc5a6de0e1ee6e\` FOREIGN KEY (\`promoCampaignsId\`) REFERENCES \`promo-campaigns\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipts_promo_campaign_list_promo-campaigns\` DROP FOREIGN KEY \`FK_9489ff4b8395dfc5a6de0e1ee6e\``);
        await queryRunner.query(`ALTER TABLE \`receipts_promo_campaign_list_promo-campaigns\` DROP FOREIGN KEY \`FK_e1b7cee9e6f0dcef233a88c9567\``);
        await queryRunner.query(`ALTER TABLE \`un-used-promo\` DROP FOREIGN KEY \`FK_22048173140feb324f292a927b1\``);
        await queryRunner.query(`ALTER TABLE \`un-used-promo\` DROP FOREIGN KEY \`FK_77c91722a14d17faaeb7e809181\``);
        await queryRunner.query(`ALTER TABLE \`un-used-promo\` DROP FOREIGN KEY \`FK_503bf544a955a7ef13629796745\``);
        await queryRunner.query(`ALTER TABLE \`un-used-promo\` DROP FOREIGN KEY \`FK_3ec4aaac2b2e0bd970eb698da90\``);
        await queryRunner.query(`ALTER TABLE \`un-used-promo\` DROP FOREIGN KEY \`FK_2f5ea54e4393f9ab60fd4fc0569\``);
        await queryRunner.query(`ALTER TABLE \`un-used-promo\` DROP FOREIGN KEY \`FK_28fde2744a9083fdebca4b9d54f\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` DROP FOREIGN KEY \`FK_e6727e4fef7beea4cbe1a5a7ad6\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaign-conditions\` DROP FOREIGN KEY \`FK_8c53d8606ff7e6475df98f46ac0\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaign-conditions\` DROP FOREIGN KEY \`FK_ca07d827bea9ccc6c376f4251b3\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaign-conditions\` DROP FOREIGN KEY \`FK_0d236a83aa54754d95ba16b390d\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaign-conditions\` DROP FOREIGN KEY \`FK_f3c0fc5f6c15d538ddec0e6b431\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaign-bonus\` DROP FOREIGN KEY \`FK_e71e5b2f68df8a66ebd38a79cc0\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaign-bonus\` DROP FOREIGN KEY \`FK_730e6eb611d089867c74c7263f0\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaign-bonus\` DROP FOREIGN KEY \`FK_b42c990ffa1bc435cc14b3b9223\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaign-bonus\` DROP FOREIGN KEY \`FK_4a3c6ccbdb545ec5777a4f6fab0\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` CHANGE \`discountType\` \`discountType\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` CHANGE \`discountType\` \`discountType\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`isAutoApply\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`total\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` DROP COLUMN \`isAutoApply\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` DROP COLUMN \`total\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` DROP COLUMN \`discountType\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` DROP COLUMN \`canUseWithOther\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`canUseWithOther\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`discountAmount\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP INDEX \`IDX_cdf2a0ce026904f32a75095b26\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`customers\` DROP COLUMN \`point\``);
        await queryRunner.query(`ALTER TABLE \`member-ranks\` DROP COLUMN \`dropRankInMonth\``);
        await queryRunner.query(`ALTER TABLE \`member-ranks\` DROP COLUMN \`requirement\``);
        await queryRunner.query(`ALTER TABLE \`member-ranks\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`code\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`quantity\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` ADD \`canUseWithOther\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`type\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`total\` float NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`isAutoApply\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`member-ranks\` ADD \`requirement2\` int NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`member-ranks\` ADD \`requirement1\` int NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`member-ranks\` ADD \`discount\` tinyint NULL DEFAULT '0'`);
        await queryRunner.query(`DROP INDEX \`IDX_9489ff4b8395dfc5a6de0e1ee6\` ON \`receipts_promo_campaign_list_promo-campaigns\``);
        await queryRunner.query(`DROP INDEX \`IDX_e1b7cee9e6f0dcef233a88c956\` ON \`receipts_promo_campaign_list_promo-campaigns\``);
        await queryRunner.query(`DROP TABLE \`receipts_promo_campaign_list_promo-campaigns\``);
        await queryRunner.query(`DROP TABLE \`un-used-promo\``);
        await queryRunner.query(`DROP TABLE \`promo-campaigns\``);
        await queryRunner.query(`DROP TABLE \`promo-campaign-conditions\``);
        await queryRunner.query(`DROP TABLE \`promo-campaign-bonus\``);
        await queryRunner.query(`ALTER TABLE \`receipts\` CHANGE \`pointRewarded\` \`memberDiscount\` int NULL`);
    }

}
