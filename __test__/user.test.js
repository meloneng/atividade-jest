const fs = require('fs');
const request = require('supertest');
const app = require('../src/app');
const animaisData = require('../src/data/animals.json');

describe('Inserção de animais', () => {

    afterAll(() => {
        while (animaisData.length > 0) {
            animaisData.pop();
        }
        fs.writeFileSync('src/data/animais.json', JSON.stringify(animaisData));
    });



    it('Deve cadastrar um usuário com sucesso', async () => {
        const res = await request(app).post('animais?nome=Dog&especie=Cachorro&idade=4');
        expect(res.status).toBe(201);
    });

    it('Deve falhar no cadastro pois a idade não é um número', async () => {
        const res = await request(app).post('animais?nome=Dog&especie=Cachorro&idade=a');
        expect(res.status).toBe(400);
    })

});

describe('Requisição de animais', () => {

    beforeAll(() => {
        animaisData.push({
            'id': 'trefdd',
            'nome': 'maria',
            'especie': 'chitzu',
            'idade': 3,
        });
        animaisData.push({
            'id': 'hfgjfg',
            'nome': 'nina',
            'especie': 'polimero',
            'idade': 3,
        });
        animaisData.push({
            'id': 'jdgffvzsxs',
            'nome': 'laica',
            'especie': 'manga',
            'idade': 3,
        });
        fs.writeFileSync('src/data/animais.json', JSON.stringify(animaisData));
    });
    
    afterAll(() => {
        while (animaisData.length > 0) {
            animaisData.pop();
        }
        fs.writeFileSync('src/data/animais.json', JSON.stringify(animaisData));
    });
    
    

    it('Deve retornar todos os animais', async () => {
        const res = await request(app).get('/animais');
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(3);
    });

});