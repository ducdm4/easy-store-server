import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmployeeServiceTracking1727670749200 implements MigrationInterface {
    name = 'AddEmployeeServiceTracking1727670749200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`employee-service-tracking\` (\`id\` int NOT NULL AUTO_INCREMENT, \`totalEarned\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`employeeId\` int NULL, \`receiptId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`receipts\` ADD \`createdById\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`receiptProducts\` ADD \`packageId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`receipts\` ADD CONSTRAINT \`FK_a8590867edda0c86986b022c090\` FOREIGN KEY (\`createdById\`) REFERENCES \`employee-info\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`receiptProducts\` ADD CONSTRAINT \`FK_986e6df7df989dd69e2eeb59cc3\` FOREIGN KEY (\`packageId\`) REFERENCES \`packages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee-service-tracking\` ADD CONSTRAINT \`FK_b66ec345dbb98cfa35872f344b7\` FOREIGN KEY (\`employeeId\`) REFERENCES \`employee-info\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee-service-tracking\` ADD CONSTRAINT \`FK_a43b0f547f645f23908e2335a3c\` FOREIGN KEY (\`receiptId\`) REFERENCES \`receipts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee-service-tracking\` DROP FOREIGN KEY \`FK_a43b0f547f645f23908e2335a3c\``);
        await queryRunner.query(`ALTER TABLE \`employee-service-tracking\` DROP FOREIGN KEY \`FK_b66ec345dbb98cfa35872f344b7\``);
        await queryRunner.query(`ALTER TABLE \`receiptProducts\` DROP FOREIGN KEY \`FK_986e6df7df989dd69e2eeb59cc3\``);
        await queryRunner.query(`ALTER TABLE \`receipts\` DROP FOREIGN KEY \`FK_a8590867edda0c86986b022c090\``);
        await queryRunner.query(`ALTER TABLE \`receiptProducts\` DROP COLUMN \`packageId\``);
        await queryRunner.query(`ALTER TABLE \`receipts\` DROP COLUMN \`createdById\``);
        await queryRunner.query(`DROP TABLE \`employee-service-tracking\``);
    }

}
