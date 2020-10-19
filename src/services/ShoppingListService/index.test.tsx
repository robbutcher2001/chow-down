import { Day } from '../../store/domain/days/types';

import aggregate from '.';

test('ShoppingListService should return a single ingredient when given a single ingredient in one day', () => {
  const singleDay: {
    [date: string]: Day
  } = {
    today: {
      date: 'today',
      recipe: {
        title: '',
        rating: 0,
        image: '',
        url: '',
        ingredients: [{
          quantity: 3,
          unit: {
            id: 'unit1',
            singular: 'tin',
            plural: 'tins'
          },
          ingredient: {
            id: 'ingredient1',
            name: 'tomatoes'
          }
        }]
      }
    }
  };

  const expected = [{
    quantity: 3,
    unit: {
      id: 'unit1',
      singular: 'tin',
      plural: 'tins'
    },
    name: 'tomatoes'
  }];

  const aggregation = aggregate(singleDay);

  expect(aggregation).toEqual(expected);
});

test('ShoppingListService should return two different ingredients when given two different ingredients in one day', () => {
  const singleDay: {
    [date: string]: Day
  } = {
    today: {
      date: 'today',
      recipe: {
        title: '',
        rating: 0,
        image: '',
        url: '',
        ingredients: [{
          quantity: 3,
          unit: {
            id: 'unit1',
            singular: 'tin',
            plural: 'tins'
          },
          ingredient: {
            id: 'ingredient1',
            name: 'tomatoes'
          }
        },
        {
          quantity: 2,
          unit: {
            id: 'unit2',
            singular: 'teaspoon',
            plural: 'teaspoons'
          },
          ingredient: {
            id: 'ingredient2',
            name: 'chilli flakes'
          }
        }]
      }
    }
  };

  const expected = [{
    quantity: 3,
    unit: {
      id: 'unit1',
      singular: 'tin',
      plural: 'tins'
    },
    name: 'tomatoes'
  },
  {
    quantity: 2,
    unit: {
      id: 'unit2',
      singular: 'teaspoon',
      plural: 'teaspoons'
    },
    name: 'chilli flakes'
  }];

  const aggregation = aggregate(singleDay);

  expect(aggregation).toEqual(expected);
});

test('ShoppingListService should return one non-aggregated ingredient and one aggregated ingredient when given three ingredients in one day', () => {
  const singleDay: {
    [date: string]: Day
  } = {
    today: {
      date: 'today',
      recipe: {
        title: '',
        rating: 0,
        image: '',
        url: '',
        ingredients: [{
          quantity: 3,
          unit: {
            id: 'unit1',
            singular: 'tin',
            plural: 'tins'
          },
          ingredient: {
            id: 'ingredient1',
            name: 'tomatoes'
          }
        },
        {
          quantity: 2,
          unit: {
            id: 'unit2',
            singular: 'teaspoon',
            plural: 'teaspoons'
          },
          ingredient: {
            id: 'ingredient2',
            name: 'chilli flakes'
          }
        },
        {
          quantity: 2,
          unit: {
            id: 'unit1',
            singular: 'tin',
            plural: 'tins'
          },
          ingredient: {
            id: 'ingredient1',
            name: 'tomatoes'
          }
        }]
      }
    }
  };

  const expected = [{
    quantity: 5,
    unit: {
      id: 'unit1',
      singular: 'tin',
      plural: 'tins'
    },
    name: 'tomatoes'
  },
  {
    quantity: 2,
    unit: {
      id: 'unit2',
      singular: 'teaspoon',
      plural: 'teaspoons'
    },
    name: 'chilli flakes'
  }];

  const aggregation = aggregate(singleDay);

  expect(aggregation).toEqual(expected);
});

test('ShoppingListService should return an aggregated ingredient when given the same single ingredient across two days', () => {
  const days: {
    [date: string]: Day
  } = {
    today: {
      date: 'today',
      recipe: {
        title: '',
        rating: 0,
        image: '',
        url: '',
        ingredients: [{
          quantity: 3,
          unit: {
            id: 'unit1',
            singular: 'tin',
            plural: 'tins'
          },
          ingredient: {
            id: 'ingredient1',
            name: 'tomatoes'
          }
        }]
      }
    },
    tomorrow: {
      date: 'tomorrow',
      recipe: {
        title: '',
        rating: 0,
        image: '',
        url: '',
        ingredients: [{
          quantity: 5,
          unit: {
            id: 'unit1',
            singular: 'tin',
            plural: 'tins'
          },
          ingredient: {
            id: 'ingredient1',
            name: 'tomatoes'
          }
        }]
      }
    }
  };

  const expected = [{
    quantity: 8,
    unit: {
      id: 'unit1',
      singular: 'tin',
      plural: 'tins'
    },
    name: 'tomatoes'
  }];

  const aggregation = aggregate(days);

  expect(aggregation).toEqual(expected);
});

test('ShoppingListService should return two different ingredients when given two different ingredients across two days', () => {
  const days: {
    [date: string]: Day
  } = {
    today: {
      date: 'today',
      recipe: {
        title: '',
        rating: 0,
        image: '',
        url: '',
        ingredients: [{
          quantity: 3,
          unit: {
            id: 'unit1',
            singular: 'tin',
            plural: 'tins'
          },
          ingredient: {
            id: 'ingredient1',
            name: 'tomatoes'
          }
        }]
      }
    },
    tomorrow: {
      date: 'tomorrow',
      recipe: {
        title: '',
        rating: 0,
        image: '',
        url: '',
        ingredients: [{
          quantity: 200,
          unit: {
            id: 'unit2',
            singular: 'gram',
            plural: 'grams'
          },
          ingredient: {
            id: 'ingredient2',
            name: 'chicken'
          }
        }]
      }
    }
  };

  const expected = [{
    quantity: 3,
    unit: {
      id: 'unit1',
      singular: 'tin',
      plural: 'tins'
    },
    name: 'tomatoes'
  },
  {
    quantity: 200,
    unit: {
      id: 'unit2',
      singular: 'gram',
      plural: 'grams'
    },
    name: 'chicken'
  }];

  const aggregation = aggregate(days);

  expect(aggregation).toEqual(expected);
});

test('ShoppingListService should return one non-aggregated ingredient and one aggregated ingredient when given three ingredients across two days', () => {
  const days: {
    [date: string]: Day
  } = {
    today: {
      date: 'today',
      recipe: {
        title: '',
        rating: 0,
        image: '',
        url: '',
        ingredients: [{
          quantity: 3,
          unit: {
            id: 'unit1',
            singular: 'tin',
            plural: 'tins'
          },
          ingredient: {
            id: 'ingredient1',
            name: 'tomatoes'
          }
        },
        {
          quantity: 2,
          unit: {
            id: 'unit2',
            singular: 'teaspoon',
            plural: 'teaspoons'
          },
          ingredient: {
            id: 'ingredient2',
            name: 'chilli flakes'
          }
        }]
      }
    },
    tomorrow: {
      date: 'tomorrow',
      recipe: {
        title: '',
        rating: 0,
        image: '',
        url: '',
        ingredients: [{
          quantity: 3,
          unit: {
            id: 'unit2',
            singular: 'teaspoon',
            plural: 'teaspoons'
          },
          ingredient: {
            id: 'ingredient2',
            name: 'chilli flakes'
          }
        }]
      }
    }
  };

  const expected = [{
    quantity: 3,
    unit: {
      id: 'unit1',
      singular: 'tin',
      plural: 'tins'
    },
    name: 'tomatoes'
  },
  {
    quantity: 5,
    unit: {
      id: 'unit2',
      singular: 'teaspoon',
      plural: 'teaspoons'
    },
    name: 'chilli flakes'
  }];

  const aggregation = aggregate(days);

  expect(aggregation).toEqual(expected);
});

test('ShoppingListService should return several aggregated ingredients when given multiple ingredients across two days', () => {
  const days: {
    [date: string]: Day
  } = {
    today: {
      date: 'today',
      recipe: {
        title: '',
        rating: 0,
        image: '',
        url: '',
        ingredients: [{
          quantity: 200,
          unit: {
            id: 'unit3',
            singular: 'gram',
            plural: 'grams'
          },
          ingredient: {
            id: 'ingredient3',
            name: 'chicken'
          }
        },
        {
          quantity: 3,
          unit: {
            id: 'unit2',
            singular: 'teaspoon',
            plural: 'teaspoons'
          },
          ingredient: {
            id: 'ingredient4',
            name: 'thyme'
          }
        },
        {
          quantity: 3,
          unit: {
            id: 'unit1',
            singular: 'tin',
            plural: 'tins'
          },
          ingredient: {
            id: 'ingredient1',
            name: 'tomatoes'
          }
        },
        {
          quantity: 2,
          unit: {
            id: 'unit2',
            singular: 'teaspoon',
            plural: 'teaspoons'
          },
          ingredient: {
            id: 'ingredient2',
            name: 'chilli flakes'
          }
        }]
      }
    },
    tomorrow: {
      date: 'tomorrow',
      recipe: {
        title: '',
        rating: 0,
        image: '',
        url: '',
        ingredients: [{
          quantity: 2.5,
          unit: {
            id: 'unit1',
            singular: 'tin',
            plural: 'tins'
          },
          ingredient: {
            id: 'ingredient1',
            name: 'tomatoes'
          }
        },
        {
          quantity: 650,
          unit: {
            id: 'unit3',
            singular: 'gram',
            plural: 'grams'
          },
          ingredient: {
            id: 'ingredient3',
            name: 'chicken'
          }
        },
        {
          quantity: 0.5,
          unit: {
            id: 'unit2',
            singular: 'teaspoon',
            plural: 'teaspoons'
          },
          ingredient: {
            id: 'ingredient4',
            name: 'thyme'
          }
        }]
      }
    }
  };

  const expected = [{
    quantity: 850,
    unit: {
      id: 'unit3',
      singular: 'gram',
      plural: 'grams'
    },
    name: 'chicken'
  },
  {
    quantity: 3.5,
    unit: {
      id: 'unit2',
      singular: 'teaspoon',
      plural: 'teaspoons'
    },
    name: 'thyme'
  },
  {
    quantity: 5.5,
    unit: {
      id: 'unit1',
      singular: 'tin',
      plural: 'tins'
    },
    name: 'tomatoes'
  },
  {
    quantity: 2,
    unit: {
      id: 'unit2',
      singular: 'teaspoon',
      plural: 'teaspoons'
    },
    name: 'chilli flakes'
  }];

  const aggregation = aggregate(days);

  expect(aggregation).toEqual(expected);
});

test('ShoppingListService should return empty ingredient aggregation when passed no days', () => {
  const aggregation = aggregate({});

  expect(aggregation).toEqual([]);
});

test('ShoppingListService should return empty ingredient aggregation when passed null days', () => {
  const aggregation = aggregate(null);

  expect(aggregation).toEqual([]);
});

test('ShoppingListService should return empty ingredient aggregation when passed undefined days', () => {
  const aggregation = aggregate(undefined);

  expect(aggregation).toEqual([]);
});