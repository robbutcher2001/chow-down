'use strict';

const recipes = [{
    id: '15a41870-b0fe-49da-a9aa-fa34660dcb55',
    title: 'Chilli con carne',
    url: 'https://www.bbcgoodfood.com/recipes/3228/chilli-con-carne',
    description: 'This great chilli recipe has to be one of the best dishes to serve to friends for a casual get-together. An easy sharing favourite that uses up storecupboard ingredients.',
    image: ''
}, {
    id: '164a7d2b-e9bf-464b-8496-0e86986ad2b0',
    title: 'Spiced carrot & lentil soup',
    url: 'https://www.bbcgoodfood.com/recipes/2089/spiced-carrot-and-lentil-soup',
    description: 'A delicious, spicy blend, packed full of iron and low fat to boot. It\'s ready in under half an hour or can be made in a slow cooker.',
    image: ''
}, {
    id: '5552043a-d801-4aaf-8bea-f4d6aa0fe058',
    title: 'Chicken & chorizo jambalaya',
    url: 'https://www.bbcgoodfood.com/recipes/1167651/chicken-and-chorizo-jambalaya',
    description: 'A Cajun-inspired rice pot recipe with spicy Spanish sausage, sweet peppers and tomatoes',
    image: ''
}, {
    id: '8e3873e7-fcfc-4c3c-b74b-e2b351f45f73',
    title: 'Summer-in-winter chicken',
    url: 'https://www.bbcgoodfood.com/recipes/1521/summerinwinter-chicken',
    description: 'Pining for summer? This simply seasoned chicken fried with beautiful, ripe, cherry tomatoes in a creamy sauce is guaranteed to hit the spot. Add a dollop of pesto for an extra layer of nutty flavours.',
    image: ''
}, {
    id: 'f5e1ddf0-e022-438d-9fcd-88611bdf3525',
    title: 'Mustard-stuffed chicken',
    url: 'https://www.bbcgoodfood.com/recipes/4814/mustardstuffed-chicken',
    description: 'This is so good we\'d be surprised if this chicken fillet recipe doesn\'t become a firm favourite. Save it to your My Good Food collection and enjoy.',
    image: ''
}, {
    id: '7a0ec2bf-1d94-49c1-8407-90c39e46ceaf',
    title: 'Creamy courgette lasagne',
    url: 'https://www.bbcgoodfood.com/recipes/4716/creamy-courgette-lasagne',
    description: 'Serve up this creamy quick dish for a last minute dinner party and impress veggie friends.',
    image: ''
}, {
    id: '38c8fa7a-241a-482c-8274-c58b0304a493',
    title: 'Spicy root & lentil casserole',
    url: 'https://www.bbcgoodfood.com/recipes/1364/spicy-root-and-lentil-casserole',
    description: 'The potatoes in this recipe take on the spicy flavours beautifully - our idea of the perfect veggie supper.',
    image: ''
}, {
    id: 'df16b0c0-bc7b-4584-bcd3-4b30354396da',
    title: 'Chicken biryani',
    url: 'https://www.bbcgoodfood.com/recipes/4686/chicken-biryani',
    description: 'A great one-pot rice dish that can still be served up a few days later, perfect for leftovers.',
    image: ''
}, {
    id: '89539b96-d68b-484f-8d09-bbf7dcd969ad',
    title: 'Red lentil, chickpea & chilli soup',
    url: 'https://www.bbcgoodfood.com/recipes/333614/red-lentil-chickpea-and-chilli-soup',
    description: 'Come home to a warming bowlful of this filling, low-fat soup.',
    image: ''
}, {
    id: '10fc8391-2855-4c77-bb5f-39154f78e14d',
    title: 'One-pot chicken chasseur',
    url: 'https://www.bbcgoodfood.com/recipes/9100/onepot-chicken-chasseur',
    description: 'This French bistro classic is easy to make at home and fabulous with creamy mash or crusty bread.',
    image: ''
}];

const getRecipes = () => recipes;

const apiGatewayResp = payload => ({
    statusCode: 200,
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
    isBase64Encoded: false
});

exports.handler = (event, context, callback) => {
    callback(null, apiGatewayResp({
        status: 'success',
        data: {
            recipes: getRecipes()
        }
    }));
};