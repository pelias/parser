const libpostal = require('./libpostal')

module.exports.tests = {}

module.exports.tests.generatePlurals = (test) => {
  test('generatePlurals: pluralize english tokens', (t) => {
    const index = {
      'cat': { langs: { en: true } }
    }
    libpostal.generatePlurals(index)

    t.deepEqual(index, {
      'cat': { langs: { en: true } },
      'cats': { langs: { en: true } }
    })
    t.end()
  })
  test('generatePlurals: pluralize mixed eng/xxx language tokens', (t) => {
    const index = {
      'cat': { langs: { en: true, fr: true } }
    }
    libpostal.generatePlurals(index)

    t.deepEqual(index, {
      'cat': { langs: { en: true, fr: true } },
      'cats': { langs: { en: true } } // not assigned to fr
    })
    t.end()
  })
  test('generatePlurals: ignore non-english tokens', (t) => {
    const index = {
      'cat': { langs: { fr: true } }
    }
    libpostal.generatePlurals(index)

    t.deepEqual(index, {
      'cat': { langs: { fr: true } }
    })
    t.end()
  })
  test('generatePlurals: english - functional', (t) => {
    const index = {
      'cat': { langs: { en: true } },
      'dog': { langs: { en: true } },
      'dogs': { langs: { en: true } }, // already plural
      'fish': { langs: { en: true } } // same word singular/plural in English
    }
    libpostal.generatePlurals(index)

    t.deepEqual(index, {
      'cat': { langs: { en: true } },
      'dog': { langs: { en: true } },
      'dogs': { langs: { en: true } },
      'fish': { langs: { en: true } },
      'cats': { langs: { en: true } }
    })
    t.end()
  })
  test('generatePlurals: english - identical singular plural', (t) => {
    const index = {
      'bison': { langs: { en: true } },
      'buffalo': { langs: { en: true } },
      'deer': { langs: { en: true } },
      'fish': { langs: { en: true } },
      'moose': { langs: { en: true } },
      'pike': { langs: { en: true } },
      'plankton': { langs: { en: true } },
      'salmon': { langs: { en: true } },
      'sheep': { langs: { en: true } },
      'swine': { langs: { en: true } },
      'trout': { langs: { en: true } }
    }
    libpostal.generatePlurals(index)

    t.deepEqual(index, {
      'bison': { langs: { en: true } },
      'buffalo': { langs: { en: true } },
      'deer': { langs: { en: true } },
      'fish': { langs: { en: true } },
      'moose': { langs: { en: true } },
      'pike': { langs: { en: true } },
      'plankton': { langs: { en: true } },
      'salmon': { langs: { en: true } },
      'sheep': { langs: { en: true } },
      'swine': { langs: { en: true } },
      'trout': { langs: { en: true } }
    })
    t.end()
  })
  test('generatePlurals: english - sibilant sound', (t) => {
    const index = {
      'kiss': { langs: { en: true } },
      'phase': { langs: { en: true } },
      'dish': { langs: { en: true } },
      'massage': { langs: { en: true } },
      'witch': { langs: { en: true } },
      'judge': { langs: { en: true } }
    }
    libpostal.generatePlurals(index)

    t.deepEqual(index, {
      'kiss': { langs: { en: true } },
      'phase': { langs: { en: true } },
      'dish': { langs: { en: true } },
      'massage': { langs: { en: true } },
      'witch': { langs: { en: true } },
      'judge': { langs: { en: true } },

      'kisses': { langs: { en: true } },
      'phases': { langs: { en: true } },
      'dishes': { langs: { en: true } },
      'massages': { langs: { en: true } },
      'witches': { langs: { en: true } },
      'judges': { langs: { en: true } }
    })
    t.end()
  })
  test('generatePlurals: english - voiceless consonant', (t) => {
    const index = {
      'lap': { langs: { en: true } },
      'cat': { langs: { en: true } },
      'clock': { langs: { en: true } },
      'cuff': { langs: { en: true } },
      'death': { langs: { en: true } }
    }
    libpostal.generatePlurals(index)

    t.deepEqual(index, {
      'lap': { langs: { en: true } },
      'cat': { langs: { en: true } },
      'clock': { langs: { en: true } },
      'cuff': { langs: { en: true } },
      'death': { langs: { en: true } },

      'laps': { langs: { en: true } },
      'cats': { langs: { en: true } },
      'clocks': { langs: { en: true } },
      'cuffs': { langs: { en: true } },
      'deaths': { langs: { en: true } }
    })
    t.end()
  })
  test('generatePlurals: english - regular plural', (t) => {
    const index = {
      'boy': { langs: { en: true } },
      'girl': { langs: { en: true } },
      'chair': { langs: { en: true } }
    }
    libpostal.generatePlurals(index)

    t.deepEqual(index, {
      'boy': { langs: { en: true } },
      'girl': { langs: { en: true } },
      'chair': { langs: { en: true } },

      'boys': { langs: { en: true } },
      'girls': { langs: { en: true } },
      'chairs': { langs: { en: true } }
    })
    t.end()
  })
  test('generatePlurals: english - nouns ending in -o', (t) => {
    const index = {
      'hero': { langs: { en: true } },
      'potato': { langs: { en: true } },
      'volcano': { langs: { en: true } }
    }
    libpostal.generatePlurals(index)

    t.deepEqual(index, {
      'hero': { langs: { en: true } },
      'potato': { langs: { en: true } },
      'volcano': { langs: { en: true } },

      'heroes': { langs: { en: true } },
      'potatoes': { langs: { en: true } },
      'volcanoes': { langs: { en: true } }
    })
    t.end()
  })
  test('generatePlurals: english - nouns ending in -o (Italian loanwords)', (t) => {
    const index = {
      'canto': { langs: { en: true } },
      'hetero': { langs: { en: true } },
      'photo': { langs: { en: true } },
      'zero': { langs: { en: true } },
      'piano': { langs: { en: true } },
      'portico': { langs: { en: true } },
      'pro': { langs: { en: true } },
      'quarto': { langs: { en: true } },
      'kimono': { langs: { en: true } }
    }
    libpostal.generatePlurals(index)

    t.deepEqual(index, {
      'canto': { langs: { en: true } },
      'hetero': { langs: { en: true } },
      'photo': { langs: { en: true } },
      'zero': { langs: { en: true } },
      'piano': { langs: { en: true } },
      'portico': { langs: { en: true } },
      'pro': { langs: { en: true } },
      'quarto': { langs: { en: true } },
      'kimono': { langs: { en: true } },

      'cantos': { langs: { en: true } },
      'heteros': { langs: { en: true } },
      'photos': { langs: { en: true } },
      'zeros': { langs: { en: true } },
      'pianos': { langs: { en: true } },
      'porticos': { langs: { en: true } },
      'pros': { langs: { en: true } },
      'quartos': { langs: { en: true } },
      'kimonos': { langs: { en: true } }
    })
    t.end()
  })
  test('generatePlurals: english - nouns ending in -y', (t) => {
    const index = {
      'cherry': { langs: { en: true } },
      'lady': { langs: { en: true } },
      'sky': { langs: { en: true } }
    }
    libpostal.generatePlurals(index)

    t.deepEqual(index, {
      'cherry': { langs: { en: true } },
      'lady': { langs: { en: true } },
      'sky': { langs: { en: true } },

      'cherries': { langs: { en: true } },
      'ladies': { langs: { en: true } },
      'skies': { langs: { en: true } }
    })
    t.end()
  })
  test('generatePlurals: english - nouns ending in -quy', (t) => {
    const index = {
      'soliloquy': { langs: { en: true } }
    }
    libpostal.generatePlurals(index)

    t.deepEqual(index, {
      'soliloquy': { langs: { en: true } },

      'soliloquies': { langs: { en: true } }
    })
    t.end()
  })
  test('generatePlurals: english - voiceless fricatives', (t) => {
    const index = {
      'bath': { langs: { en: true } },
      'mouth': { langs: { en: true } },
      'calf': { langs: { en: true } },
      'leaf': { langs: { en: true } },
      'knife': { langs: { en: true } },
      'life': { langs: { en: true } },
      'house': { langs: { en: true } },
      'moth': { langs: { en: true } },
      'proof': { langs: { en: true } }
    }
    libpostal.generatePlurals(index)

    t.deepEqual(index, {
      'bath': { langs: { en: true } },
      'mouth': { langs: { en: true } },
      'calf': { langs: { en: true } },
      'leaf': { langs: { en: true } },
      'knife': { langs: { en: true } },
      'life': { langs: { en: true } },
      'house': { langs: { en: true } },
      'moth': { langs: { en: true } },
      'proof': { langs: { en: true } },

      'baths': { langs: { en: true } },
      'mouths': { langs: { en: true } },
      'calves': { langs: { en: true } },
      'leaves': { langs: { en: true } },
      'knives': { langs: { en: true } },
      'lives': { langs: { en: true } },
      'houses': { langs: { en: true } },
      'moths': { langs: { en: true } },
      'proofs': { langs: { en: true } }
    })
    t.end()
  })
  test('generatePlurals: english - nouns ending in -f', (t) => {
    const index = {
      'dwarf': { langs: { en: true } },
      'hoof': { langs: { en: true } },
      'elf': { langs: { en: true } },
      'turf': { langs: { en: true } }
    }
    libpostal.generatePlurals(index)

    t.deepEqual(index, {
      'dwarf': { langs: { en: true } },
      'hoof': { langs: { en: true } },
      'elf': { langs: { en: true } },
      'turf': { langs: { en: true } },

      'dwarves': { langs: { en: true } },
      'hooves': { langs: { en: true } },
      'elves': { langs: { en: true } },
      'turfs': { langs: { en: true } }
    })
    t.end()
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`libpostal: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
