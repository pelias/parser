module.exports =
{
  'libpostal': {
    'af': {
      'personal_titles': '!kort|k\n!korte|kte'
    },
    'all': {
      'surnames': '!street\n'
    },
    'de': {
      'concatenated_suffixes_separable': 'str\npark\nkanal\n',
      'place_names': '!ma\n',
      'street_types': "# abbrviation for 'chaussee' conflicts with Swiss countrycode\n!ch"
    },
    'en': {
      'place_names': 'temple\ncathedral\nstop\n!dist\nbuilding\nfield\n!parish\n',
      'road_types': 'county highway|ch|c.h.|c.h|c h|c.hw|c hw|co.hw|co hw|cty.hw|cty hw|c.hgwy|c hgwy|co.hgwy|co hgwy|cty.hgwy|cty hgwy|c.hway|c hway|co.hway|co hway|cty.hway|cty hway|c.hwy|c hwy|co.hwy|co hwy|cty.hwy|cty hwy|c.hi|c hi|co.hi|co hi|cty.hi|cty hi\ncounty road|cr|c.r.|c.r|c r|co.r|co r|c.rd|c rd|co.rd|co rd|cty.r|cty r|cty.rd|cty rd\ncounty route|cr|c.r.|c.r|c r|co.r|co r|c.rt|c rt|co.rt|co rt|cty.r|cty r|cty.rt|cty rt|c.rte|c rte|co.rte|co rte|cty.rte|cty rte|county touring route\nhighroad|hrd|high road|hird|hi.rd|hi rd\nhighway|hgwy|hw|hway|hwy|hi|hwye|hywy\nroad|rd|ro|r|roa|raod\nroute|rt|rte\nstate highway|s.highway|s highway|st.highway|st highway|sh|s.h.|s.h|s h|st.h|st h|s.hw|s hw|st.hw|st hw|s.hwy|s hwy|shwy|s.hgwy|s hgwy|st.hgwy|st hgwy|s.hway|s hway|st.hway|st hway|s.hwy|s hwy|st.hwy|st hwy|s.hi|s hi|st.hi|st hi|statehighway\nstate road|sr|stateroad|s.r.|s.r|s r|s.road|s road|st.road|st road|staterd|srd|s.rd|s rd|state rd|strd|st.rd|st rd\nstate route|sr|stateroute|s.r.|s.r|s r|s.route|s route|st.route|st route|statert|srt|s.rt|s rt|srte|s.rte|s rte|state rt|state rte|strt|strte|st.rt|st rt|st.rte|st rte\ntownship highway|th|t.h.|t.h|t h|twp.h|twp h|tshp.h|tshp h|t.hw|t hw|twp.hw|twp hw|tshp.hw|tshp hw|t.hgwy|t hgwy|twp.hgwy|twp hgwy|tshp.hgwy|tshp hgwy|t.hway|t hway|twp.hway|twp hway|tshp.hway|tshp hway|t.hwy|t hwy|twp.hwy|twp hwy|tshp.hwy|tshp hwy|t.hi|t hi|twp.hi|twp hi|tshp.hi|tshp hi\ntownship road|tr|t.r.|t.r|t r|t rd|t.rd|trd|twpr|twp.r|twp r|twp.rd|twp rd|tshp.r|tshp r|tshp.rd|tshp rd|township rd|tp rd\ntownship route|tr|t.r.|t.r|t r|t rt|t.rt|trt|t.rte|t rte|twpr|twp.r|twp r|twp.rt|twp rt|twp.rte|twp rte|tshp.r|tshp r|tshp.rt|tshp rt|tshp.rte|tshp rte\ninterstate highway|interstate|i|ih|i h\n\n# https://en.wikipedia.org/wiki/Farm-to-market_road\nfarm road|fm\nranch road|rm\n',
      'street_names': '# bad abbreviation for the very uncommon suffix "Artery"\n!art\n',
      'street_types': '# 183 Vista Paku, Pauanui, 3579, New Zealand\npaku\n\n# Rushendon Furlong, Pitstone, England\nfurlong\n\n# bad abbreviation for the very uncommon suffix "Artery"\n!art\n\n# 1384 Cambridge beltway, Cambridge, MD 21613, USA\nbeltway\n\n# https://github.com/pelias/parser/issues/140\n!broadway|bdwy|bway|bwy|brdway\n!esplanade|esp|espl\nmarket\n',
      'unit_types_numbered': '!shop|shp\n!stop\n!store|stor\n'
    },
    'es': {
      'street_types': '# conflicts with US state abbreviation\n!ca'
    },
    'fr': {
      'personal_titles': "l'amiral\nadjudant|l'adjudant\nempereur|l'empereur\ninspecteur|l'inspecteur",
      'street_types': 'cité|cite\ncités|cites\n\n# https://github.com/pelias/parser/pull/141#issuecomment-895230721\n!esplanades|esps\n'
    },
    'it': {
      'street_types': '# this Italian contracted form of Androna causes issues in English\n!and'
    },
    'ko': {
      'street_types': '!ga\n'
    },
    'nb': {
      'concatenated_suffixes_inseparable': 'plass|pl.|p.\nhaugen\nskogen|skog\ngården|gård\nåsen\nhaugen\nskogen|skog\ngården|gård\nåsen\ngård|gården\nholm|holmen\nhaugen|Haugane\nkrysset\nskogen|skog\ngrend|grenda\nflat|flaten\nvåg|vågen\nstrand|stranda|stranden\nvik|vika\nplatå\nstad\nterrasse\nhage|hagen\nøya\nlund|lunden\nholm|holmen\nberg|berget\nlanda|lande|landet\ndal|dalen\nsund\nbakke|bakken\nhøgda|høgde\nborg|borgen\ngard|garden|garda\nmark|marka\nvoll|vollen\nsjø|sjøen\nlie\nsti|stien\ntangen',
      'directionals': 'øvre|ovre\nøvste|ovste\nnedre\nmidtre\nytre\nindre\nsør|sor|s\nsørre|sorre',
      'street_types': 'plass\nhaugen\nskogen|skog\ngården|gård\nåsen\ngård|gården\nholm|holmen\nhaugen|Haugane\nkrysset\nskogen|skog\ngrend|grenda\nflat|flaten\nvåg|vågen\nstrand|stranda|stranden\nvik|vika\nplatå\nstad\nterrasse\nhage|hagen|hager\nøya\nlund|lunden\nholm|holmen\nberg|berget\nlanda|lande|landet\ndal|dalen\nsund\nbakke|bakken\nhøgda|høgde\nborg|borgen\ngard|garden|garda\nmark|marka\nvoll|vollen\nsjø|sjøen\nlie\nsti|stien\ntangen'
    },
    'nl': {
      'concatenated_suffixes_inseparable': 'burg|brg|bg',
      'concatenated_suffixes_separable': 'baan\ndaal\ndijk\ndreef\n!plain|pln.\nplein|pln\nplantsoen|plnts\nsingel|sngl\n',
      'directionals': 'noordzijde|nz|n.z.|n.z|n z\noostzijde|oz|o.z.|o.z|o z\nwestzijde|wz|w.z.|w.z|w z\nzuidzijde|zz|z.z.|z.z|z z',
      'personal_suffixes': 'junior|jr|jnr\nsenior|sr|snr\n# st is not a personal suffix in Dutch\n!st',
      'personal_titles': '!kort|k\n!korte|kte\naalmoezenier\nadmiraal|adm\nbisschop|biss\n#typo in LibPostal resource\n!burgermeester|burg|bgm\nburgemeester|burg|bgm\ncommissaris|comm\ndeken|dkn\ndirecteur|dir\nfrater|fr\ngraaf\ngravin\ngoeverneur|goev\ngouverneur|gouv\nheer|hr\njonker|jkr\njuffrouw|juffr\nhertog|htg\nkanunnik|kan\nkapelaan|kap\nkapitein|kapt\nkeizer\nluitenant generaal|lt gen\n!mevrouw|mevr\nmevrouw|mevr|mw\nmadame|mad\nmajoor|maj\nnotaris|not\noverste|ov\npater|ptr\nprelaat|prlt\nrector|rect\nschepen|sch\nschout|sch\nschout bij nacht|sbn\nsecretaris|secr\nsekretaris|sekr\nveldmaarschalk|veldm\nvicaris|vic\nwethouder|weth\nzusters|zr'
    },
    'pl': {
      'place_names': 'wojsko|wojska|wojsk\n',
      'synonyms': 'polskiego|polski|pol\n'
    },
    'sv': {
      'concatenated_suffixes_separable': 'vägen|vagen|v.'
    }
  },
  'whosonfirst': {
    'locality': {
      'name:eng_x_preferred': '\n# these are the only two decent values in file: locality/abrv:eng_x_preferred.txt\nnyc\nsf\n# add in NYC boroughs\nmanhattan\nqueens\nbrooklyn\nstaten island\nbronx\n# remove problematic locality names\n!italy\n!college\n!university\n!hospital\n!temple\n!cathedral\n!airport\n!deli\n!us\n!germany\n!japan\n!empire\n!unit\n# 18 person county in texas\n!art\n# remove any localities which share a name with a US state\n!alabama\n!alaska\n!arizona\n!arkansas\n!california\n!colorado\n!connecticut\n!delaware\n!florida\n!georgia\n!hawaii\n!idaho\n!illinois\n!indiana\n!iowa\n!kansas\n!kentucky\n!louisiana\n!maine\n!maryland\n!massachusetts\n!michigan\n!minnesota\n!mississippi\n!missouri\n!montana\n!nebraska\n!nevada\n!new hampshire\n!new jersey\n!new mexico\n#!new york\n!north carolina\n!north dakota\n!ohio\n!oklahoma\n!oregon\n!pennsylvania rhode island\n!south carolina\n!south dakota\n!tennessee\n!texas\n!utah\n!vermont\n!virginia\n#!washington\n!west virginia\n!wisconsin\n!wyoming\n\n# https://github.com/pelias/parser/issues/140\n!broadway\n!esplanade\n!market\n',
      'name:fra_x_preferred': '# https://github.com/pelias/parser/issues/140\n!broadway\n'
    },
    'region': {
      'name:eng_x_preferred': '# This is not used as region\n!paris'
    }
  }
}
