import  prisma  from '../../src/config/database';
import vaoucherFactory from '../factories/vaoucherFactory'
import voucherFunctions from "../../src/services/voucherService";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "vouchers"`;
});


describe("voucherFunctions", () => {
    it("should create a voucher", async () => {
      const {code, discount} =  await vaoucherFactory();
  
      const newVoucher = await voucherFunctions.createVoucher(code, discount);
  
      expect(newVoucher);
    });
  
    it("should not create a voucher with same code", async () => {
      const {code, discount} =  await vaoucherFactory();
  
      await voucherFunctions.createVoucher(code, discount);
      const newVoucher = await voucherFunctions.createVoucher(code, discount);

      expect(newVoucher).toBeFalsy();
    });
  
    it("should not use a voucher more than once", async () => {
        const {code, discount} =  await vaoucherFactory();
        await voucherFunctions.createVoucher(code, discount);

        await voucherFunctions.applyVoucher(code, 130);
        const result = await voucherFunctions.applyVoucher(code, 130);
  
        expect(result.applied).toBeFalsy
    });
  
    it("should not accept values minors than 100", async () => {
        const {code, discount} =  await vaoucherFactory();
        await voucherFunctions.createVoucher(code, discount);
  
        const result = await voucherFunctions.applyVoucher(code, 98);
    
        expect(result.applied).toBeFalsy
    });
  
    it("should successfully use the voucher", async () => {
        const {code, discount} =  await vaoucherFactory();
        await voucherFunctions.createVoucher(code, discount);
  
        const result = await voucherFunctions.applyVoucher(code, 130);
    
        expect(result.applied).toBeTruthy;
    });
  
  });


afterAll(async () => {
    await prisma.$disconnect();
  });
  