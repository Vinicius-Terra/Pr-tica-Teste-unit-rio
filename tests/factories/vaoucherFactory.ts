import { faker }  from '@faker-js/faker';

export default async function vaoucherFactory() {
    return {
        code: faker.random.alphaNumeric(),
        discount: Number(faker.random.numeric(2))
    };
}