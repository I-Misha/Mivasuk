let string = 'string';
let number = 'number';

function init() {
    let listValues = this.getMainDataDTO(mainData);
    $("#list").append(
        buildDOM(listValues)
      );
    
}
//TODO read text prop
function buildDOM(listValues) {
    let domElement = '<ul>';
    for (let i = 0; i < listValues.length; i++) {
        domElement+='<li>';
        domElement+= Object.keys(listValues[i]);
        let group = listValues[i]['group'];
        domElement += '<ul>';
        for (let j = 0; j < group.length; j++) {
            domElement+='<li>';
            
            domElement += '<ul>';
            for (let k = 0; k < Object.keys(group[j]).length; k++) {
                domElement+='<li>';
                let el = group[j][Object.keys(group[j])[k]];
                let textObj = el[0];
                domElement+= Object.keys(group[j])[k] + ': ' + JSON.stringify(textObj);
                domElement += '</li>';
            }
            domElement +='</ul>';
            domElement +='--------------------------';
            domElement+='</li>';
        }
        domElement +='</ul>';
        domElement +='--------------------------';
        domElement+='</li>';
    }
    domElement+='</ul>';
    return domElement;
}

function getMainDataDTO(structure) {
    for (let i = 0; i < structure.length; i++) {
        let obj = structure[i];
        let group = obj['group'];
        for (let j = 0; j < group.length; j++) {
            if (group[j].price) {
                for (let k = 0; k < group[j].price.length; k++) {
                    let price = group[j].price[k];
                    let priceValue = price.text;
                    group[j].price[k].text = convertToNumber(priceValue);
                }
            }
            if (group[j].rank) {
                for (let k = 0; k < group[k].rank.length; k++) {
                    let rank = group[j].rank[k];
                    let rankValue = rank.text;
                    group[k].text = convertToNumber(rankValue);
                }
            }
        }
        
    }
    return structure;
}
//TODO add regex
function convertToNumber(value) {
    let regex = '^\d+(\.\d{1,2})?$';
    return 1;
}

const mainData = [
    {
      'group': [
        {
          'brand': [
            {
              'text': 'Coca-Cola',
            },
          ],
          'price': [
            {
              'text': ' price 1.95 euro',
            },
          ],
          'category': [
            {
              'text': 'Boissons',
            },
          ],
          'productUrl': [
            {
              'text': '/epicerie-en-ligne/allees/boissons/boissons-gazeuses/cola/boisson-gazeuse/p/067000104831',
            },
          ],
          'thumbnail': [
            {
              'text': 'https://product-images.metro.ca/images/h3f/hc9/9704124809246.jpg',
            },
          ],
          'name': [
            {
              'text': 'Boisson gazeuse',
            },
          ],
          'nameExtended': [
            {
              'text': 'Boisson gazeuse 12x355 mL',
            },
          ],
          'rankOrganic': [
            {
              'text': '1',
            },
          ],
          'rank': [
            {
              'text': '1',
            },
          ],
        },
        {
          'brand': [
            {
              'text': 'Coca-Cola',
            },
          ],
          'price': [
            {
              'text': ' price 5,55 euro',
            },
          ],
          'category': [
            {
              'text': 'Boissons',
            },
          ],
          'productUrl': [
            {
              'text': '/epicerie-en-ligne/allees/boissons/boissons-gazeuses/cola/boisson-gazeuse/p/067000109836',
            },
          ],
          'thumbnail': [
            {
              'text': 'https://product-images.metro.ca/images/hd8/hc0/9704066351134.jpg',
            },
          ],
          'name': [
            {
              'text': 'Boisson gazeuse',
            },
          ],
          'nameExtended': [
            {
              'text': 'Boisson gazeuse 6x222 mL',
            },
          ],
          'rankOrganic': [
            {
              'text': '2',
            },
          ],
          'rank': [
            {
              'text': '2',
            },
          ],
        },
        {
          'brand': [
            {
              'text': 'Coca-Cola',
            },
          ],
          'price': [],
          'category': [
            {
              'text': 'Boissons',
            },
          ],
          'productUrl': [
            {
              'text': '/epicerie-en-ligne/allees/boissons/boissons-gazeuses/cola/boisson-gazeuse/p/067000004278',
            },
          ],
          'thumbnail': [
            {
              'text': 'https://product-images.metro.ca/images/h38/h3c/9704082702366.jpg',
            },
          ],
          'name': [
            {
              'text': 'Boisson gazeuse',
            },
          ],
          'nameExtended': [
            {
              'text': 'Boisson gazeuse 2 L',
            },
          ],
          'rankOrganic': [
            {
              'text': '3',
            },
          ],
          'rank': [
            {
              'text': '3',
            },
          ],
        },
        {
          'brand': [
            {
              'text': 'Coca-Cola',
            },
          ],
          'price': [
            {
              'text': '',
            },
          ],
          'category': [
            {
              'text': 'Boissons',
            },
          ],
          'productUrl': [
            {
              'text': '/epicerie-en-ligne/allees/boissons/boissons-gazeuses/cola/boisson-gazeuse/p/067000004629',
            },
          ],
          'thumbnail': [
            {
              'text': 'https://product-images.metro.ca/images/h4a/h4e/9704077361182.jpg',
            },
          ],
          'name': [
            {
              'text': 'Boisson gazeuse',
            },
          ],
          'nameExtended': [
            {
              'text': 'Boisson gazeuse 500 mL',
            },
          ],
          'rankOrganic': [
            {
              'text': '4',
            },
          ],
          'rank': [
            {
              'text': '4',
            },
          ],
        }
      ]
    },
    {
      'group': [
        {
          'brand': [
            {
              'text': 'Coke Diète',
            },
          ],
          'price': [
            {
              'text': '5$',
            },
          ],
          'category': [
            {
              'text': 'Boissons',
            },
          ],
          'productUrl': [
            {
              'text': '/epicerie-en-ligne/allees/boissons/boissons-gazeuses/cola-diete/boisson-gazeuse-sans-cafeine/p/067000004414',
            },
          ],
          'thumbnail': [
            {
              'text': 'https://product-images.metro.ca/images/h7d/hb2/9704072085534.jpg',
            },
          ],
          'name': [
            {
              'text': 'Boisson gazeuse sans caféine',
            },
          ],
          'nameExtended': [
            {
              'text': 'Boisson gazeuse sans caféine 2 L',
            },
          ],
          'rankOrganic': [
            {
              'text': '25',
            },
          ],
          'rank': [
            {
              'text': '25',
            },
          ],
        },
        {
          'brand': [
            {
              'text': 'Coke Diète',
            },
          ],
          'category': [
            {
              'text': 'Boissons',
            },
          ],
          'productUrl': [
            {
              'text': '/epicerie-en-ligne/allees/boissons/boissons-gazeuses/cola-diete/boisson-gazeuse/p/067000009068',
            },
          ],
          'thumbnail': [
            {
              'text': 'https://product-images.metro.ca/images/hc7/he1/9731744333854.jpg',
            },
          ],
          'name': [
            {
              'text': 'Boisson gazeuse',
            },
          ],
          'nameExtended': [
            {
              'text': 'Boisson gazeuse 1 L',
            },
          ],
          'rankOrganic': [
            {
              'text': '26',
            },
          ],
          'rank': [
            {
              'text': '26',
            },
          ],
        },
        {
          'brand': [
            {
              'text': 'Coca-Cola Zero',
            },
          ],
          'category': [
            {
              'text': 'Boissons',
            },
          ],
          'productUrl': [
            {
              'text': '/epicerie-en-ligne/allees/boissons/boissons-gazeuses/cola-diete/boisson-gazeuse-sans-calories/p/067000003776',
            },
          ],
          'thumbnail': [
            {
              'text': 'https://product-images.metro.ca/images/h8e/h34/9731746463774.jpg',
            },
          ],
          'name': [
            {
              'text': 'Boisson gazeuse sans calories',
            },
          ],
          'nameExtended': [
            {
              'text': 'Boisson gazeuse sans calories 1 L',
            },
          ],
          'rankOrganic': [
            {
              'text': '27',
            },
          ],
          'rank': [
            {
              'text': '27',
            },
          ],
        },
      ],
    },
  ];
  