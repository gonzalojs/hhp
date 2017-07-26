const test = require('tape')
const spok = require('spok')
const spokUtl = require('./util/spok')
const clean = spokUtl.clean
const topic = spokUtl.topic
const parse = require('../')

const fs = require('fs')
const path = require('path')
const fixtures = path.join(__dirname, 'fixtures')
/* eslint-disable camelcase */
const holdem_ps = path.join(fixtures, 'holdem', 'pokerstars')

/* eslint-disable no-unused-vars */
const ocat = require('./util/ocat')
function insp(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 10, false))
}
function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true))
}
const save = require('./util/save')
/* eslint-ensable no-unused-vars */

test('\nHoldem.PokerStars: action on all streets', function(t) {
  const txt = fs.readFileSync(path.join(holdem_ps, 'actiononall.txt'), 'utf8')
  const res = parse(txt)

  spok(t, res,
    { seats:
      [ { seatno: 1
        , player: 'Fischersito'
        , chips: 15875
        , metadata: { lineno: 2, raw: 'Seat 1: Fischersito (15875 in chips)' } }
      , { seatno: 3
        , player: 'Irisha2'
        , chips: 14114
        , metadata: { lineno: 3, raw: 'Seat 3: Irisha2 (14114 in chips)' } }
      , { seatno: 4
        , player: 'DmelloH'
        , chips: 15451
        , metadata: { lineno: 4, raw: 'Seat 4: DmelloH (15451 in chips)' } }
      , { seatno: 9
        , player: 'held'
        , chips: 22060
        , metadata: { lineno: 5, raw: 'Seat 9: held (22060 in chips)' } } ]
    , posts:
      [ { player: 'Fischersito'
        , type: 'ante'
        , amount: 50
        , metadata: { lineno: 6, raw: 'Fischersito: posts the ante 50' } }
      , { player: 'Irisha2'
        , type: 'ante'
        , amount: 50
        , metadata: { lineno: 7, raw: 'Irisha2: posts the ante 50' } }
      , { player: 'DmelloH'
        , type: 'ante'
        , amount: 50
        , metadata: { lineno: 8, raw: 'DmelloH: posts the ante 50' } }
      , { player: 'held'
        , type: 'ante'
        , amount: 50
        , metadata: { lineno: 9, raw: 'held: posts the ante 50' } }
      , { player: 'DmelloH'
        , type: 'sb'
        , amount: 400
        , metadata: { lineno: 10, raw: 'DmelloH: posts small blind 400' } }
      , { player: 'held'
        , type: 'bb'
        , amount: 800
        , metadata: { lineno: 11, raw: 'held: posts big blind 800' } } ]
    , preflop:
      [ { player: 'Fischersito'
        , type: 'raise'
        , amount: 800
        , raiseTo: 1600
        , metadata: { lineno: 14, raw: 'Fischersito: raises 800 to 1600' } }
      , { player: 'Irisha2'
        , type: 'call'
        , amount: 1600
        , metadata: { lineno: 15, raw: 'Irisha2: calls 1600' } }
      , { player: 'DmelloH'
        , type: 'fold'
        , metadata: { lineno: 16, raw: 'DmelloH: folds' } }
      , { player: 'held'
        , type: 'fold'
        , metadata: { lineno: 17, raw: 'held: folds' } } ]
    , flop:
      [ { player: 'Fischersito'
        , type: 'bet'
        , amount: 2400
        , metadata: { lineno: 19, raw: 'Fischersito: bets 2400' } }
      , { player: 'Irisha2'
        , type: 'call'
        , amount: 2400
        , metadata: { lineno: 20, raw: 'Irisha2: calls 2400' } } ]
    , turn:
      [ { player: 'Fischersito'
        , type: 'check'
        , metadata: { lineno: 22, raw: 'Fischersito: checks' } }
      , { player: 'Irisha2'
        , type: 'bet'
        , amount: 1600
        , metadata: { lineno: 23, raw: 'Irisha2: bets 1600' } }
      , { player: 'Fischersito'
        , type: 'call'
        , amount: 1600
        , metadata: { lineno: 24, raw: 'Fischersito: calls 1600' } } ]
    , river:
      [ { player: 'Fischersito'
        , type: 'check'
        , metadata: { lineno: 26, raw: 'Fischersito: checks' } }
      , { player: 'Irisha2'
        , type: 'bet'
        , amount: 3200
        , metadata: { lineno: 27, raw: 'Irisha2: bets 3200' } }
      , { player: 'Fischersito'
        , type: 'call'
        , amount: 3200
        , metadata: { lineno: 28, raw: 'Fischersito: calls 3200' } } ]
    , showdown:
      [ { player: 'Irisha2'
        , type: 'show'
        , card1: 'Jh'
        , card2: 'Qs'
        , metadata:
           { lineno: 30
           , raw: 'Irisha2: shows [Jh Qs] (a full house, Threes full of Jacks)' }
        , desc: 'a full house, Threes full of Jacks' }
      , { player: 'Irisha2'
        , type: 'collect'
        , amount: 19000
        , metadata: { lineno: 32, raw: 'Irisha2 collected 19000 from pot' } } ]
    , summary:
      [ { type: 'pot'
        , single: true
        , amount: 19000
        , rake: 0
        , metadata: { lineno: 34, raw: 'Total pot 19000 | Rake 0' } }
      , { type: 'muck'
        , seatno: 1
        , player: 'Fischersito'
        , position: ''
        , card1: 'Td'
        , card2: 'Tc'
        , metadata: { lineno: 36, raw: 'Seat 1: Fischersito mucked [Td Tc]' } }
      , { type: 'showed'
        , won: true
        , seatno: 3
        , player: 'Irisha2'
        , position: 'bu'
        , card1: 'Jh'
        , card2: 'Qs'
        , amount: 19000
        , description: 'a full house, Threes full of Jacks'
        , metadata:
           { lineno: 37
           , raw: 'Seat 3: Irisha2 (button) showed [Jh Qs] and won (19000) with a full house, Threes full of Jacks' } }
      , { type: 'folded'
        , seatno: 4
        , player: 'DmelloH'
        , position: 'sb'
        , street: 'preflop'
        , bet: true
        , metadata:
           { lineno: 38
           , raw: 'Seat 4: DmelloH (small blind) folded before Flop' } }
      , { type: 'folded'
        , seatno: 9
        , player: 'held'
        , position: 'bb'
        , street: 'preflop'
        , bet: true
        , metadata:
           { lineno: 39
           , raw: 'Seat 9: held (big blind) folded before Flop' } } ]
    , info:
      { room: 'pokerstars'
      , handid: '149651992548'
      , currency: '$'
      , pokertype: 'holdem'
      , limit: 'nolimit'
      , sb: 400
      , bb: 800
      , year: 2016
      , month: 3
      , day: 1
      , hour: 1
      , min: 29
      , sec: 41
      , timezone: 'ET'
      , gameno: '1495192630'
      , level: 'xi'
      , gametype: 'tournament'
      , metadata:
         { lineno: 0
         , raw: 'PokerStars Hand #149651992548: Tournament #1495192630, $0.91+$0.09 USD Hold\'em No Limit - Level XI (400/800) - 2016/03/01 1:29:41 ET' }
      , donation: 0.91
      , rake: 0.09
      , buyin: 1
      , ante: 50 }
    , table:
      { tableno: 3
      , maxseats: 9
      , button: 3
      , metadata:
         { lineno: 1
         , raw: 'Table \'1495192630 3\' 9-max Seat #3 is the button' } }
    , hero: 'held'
    , holecards:
      { card1: '4c'
      , card2: '2d'
      , metadata: { lineno: 13, raw: 'Dealt to held [4c 2d]' } }
    , board:
      { card1: '3c'
      , card2: 'Jc'
      , card3: '3h'
      , card4: '6h'
      , card5: '3d'
      , metadata: { lineno: 35, raw: 'Board [3c Jc 3h 6h 3d]' } } })

  t.end()
})

test('\nHoldem.PokerStars: all-in preflop', function(t) {
  const txt = fs.readFileSync(path.join(holdem_ps, 'allin-preflop.txt'), 'utf8')
  const res = parse(txt)

  spok(t, res,
    { seats:
      [ { seatno: 1
        , player: 'Fischersito'
        , chips: 3475
        , metadata: { lineno: 2, raw: 'Seat 1: Fischersito (3475 in chips)' } }
      , { seatno: 3
        , player: 'Irisha2'
        , chips: 24314
        , metadata: { lineno: 3, raw: 'Seat 3: Irisha2 (24314 in chips)' } }
      , { seatno: 4
        , player: 'DmelloH'
        , chips: 33302
        , metadata: { lineno: 4, raw: 'Seat 4: DmelloH (33302 in chips)' } }
      , { seatno: 9
        , player: 'held'
        , chips: 6409
        , metadata: { lineno: 5, raw: 'Seat 9: held (6409 in chips)' } } ]
    , posts:
      [ { player: 'Fischersito'
        , type: 'ante'
        , amount: 50
        , metadata: { lineno: 6, raw: 'Fischersito: posts the ante 50' } }
      , { player: 'Irisha2'
        , type: 'ante'
        , amount: 50
        , metadata: { lineno: 7, raw: 'Irisha2: posts the ante 50' } }
      , { player: 'DmelloH'
        , type: 'ante'
        , amount: 50
        , metadata: { lineno: 8, raw: 'DmelloH: posts the ante 50' } }
      , { player: 'held'
        , type: 'ante'
        , amount: 50
        , metadata: { lineno: 9, raw: 'held: posts the ante 50' } }
      , { player: 'DmelloH'
        , type: 'sb'
        , amount: 400
        , metadata: { lineno: 10, raw: 'DmelloH: posts small blind 400' } }
      , { player: 'held'
        , type: 'bb'
        , amount: 800
        , metadata: { lineno: 11, raw: 'held: posts big blind 800' } } ]
    , preflop:
      [ { player: 'Fischersito'
        , type: 'raise'
        , amount: 2625
        , raiseTo: 3425
        , allin: true
        , metadata:
           { lineno: 14
           , raw: 'Fischersito: raises 2625 to 3425 and is all-in' } }
      , { player: 'Irisha2'
        , type: 'fold'
        , metadata: { lineno: 15, raw: 'Irisha2: folds' } }
      , { player: 'DmelloH'
        , type: 'call'
        , amount: 3025
        , metadata: { lineno: 16, raw: 'DmelloH: calls 3025' } }
      , { player: 'held'
        , type: 'raise'
        , amount: 2934
        , raiseTo: 6359
        , allin: true
        , metadata: { lineno: 17, raw: 'held: raises 2934 to 6359 and is all-in' } }
      , { player: 'DmelloH'
        , type: 'call'
        , amount: 2934
        , metadata: { lineno: 18, raw: 'DmelloH: calls 2934' } } ]
    , flop: []
    , turn: []
    , river: []
    , showdown:
      [ { player: 'DmelloH'
        , type: 'show'
        , card1: '7h'
        , card2: '7d'
        , metadata: { lineno: 23, raw: 'DmelloH: shows [7h 7d] (a pair of Sevens)' }
        , desc: 'a pair of Sevens' }
      , { player: 'held'
        , type: 'show'
        , card1: 'Qd'
        , card2: 'Qs'
        , metadata: { lineno: 24, raw: 'held: shows [Qd Qs] (a pair of Queens)' }
        , desc: 'a pair of Queens' }
      , { player: 'held'
        , type: 'collect'
        , amount: 5868
        , metadata: { lineno: 25, raw: 'held collected 5868 from side pot' } }
      , { player: 'Fischersito'
        , type: 'show'
        , card1: '2c'
        , card2: 'Ad'
        , metadata:
           { lineno: 26
           , raw: 'Fischersito: shows [2c Ad] (a pair of Deuces)' }
        , desc: 'a pair of Deuces' }
      , { player: 'held'
        , type: 'collect'
        , amount: 10475
        , metadata: { lineno: 27, raw: 'held collected 10475 from main pot' } } ]
    , summary:
      [ { type: 'pot'
        , single: false
        , amount: 16343
        , main: 10475
        , side: 5868
        , rake: 0
        , metadata:
           { lineno: 30
           , raw: 'Total pot 16343 Main pot 10475. Side pot 5868. | Rake 0' } }
      , { type: 'showed'
        , won: false
        , seatno: 1
        , player: 'Fischersito'
        , position: ''
        , card1: '2c'
        , card2: 'Ad'
        , description: 'a pair of Deuces'
        , metadata:
           { lineno: 32
           , raw: 'Seat 1: Fischersito showed [2c Ad] and lost with a pair of Deuces' } }
      , { type: 'folded'
        , seatno: 3
        , player: 'Irisha2'
        , position: 'bu'
        , street: 'preflop'
        , bet: false
        , metadata:
           { lineno: 33
           , raw: 'Seat 3: Irisha2 (button) folded before Flop (didn\'t bet)' } }
      , { type: 'showed'
        , won: false
        , seatno: 4
        , player: 'DmelloH'
        , position: 'sb'
        , card1: '7h'
        , card2: '7d'
        , description: 'a pair of Sevens'
        , metadata:
           { lineno: 34
           , raw: 'Seat 4: DmelloH (small blind) showed [7h 7d] and lost with a pair of Sevens' } }
      , { type: 'showed'
        , won: true
        , seatno: 9
        , player: 'held'
        , position: 'bb'
        , card1: 'Qd'
        , card2: 'Qs'
        , amount: 16343
        , description: 'a pair of Queens'
        , metadata:
           { lineno: 35
           , raw: 'Seat 9: held (big blind) showed [Qd Qs] and won (16343) with a pair of Queens' } } ]
    , info:
      { room: 'pokerstars'
      , handid: '149652059422'
      , currency: '$'
      , pokertype: 'holdem'
      , limit: 'nolimit'
      , sb: 400
      , bb: 800
      , year: 2016
      , month: 3
      , day: 1
      , hour: 1
      , min: 33
      , sec: 54
      , timezone: 'ET'
      , gameno: '1495192630'
      , level: 'xi'
      , gametype: 'tournament'
      , metadata:
         { lineno: 0
         , raw: 'PokerStars Hand #149652059422: Tournament #1495192630, $0.91+$0.09 USD Hold\'em No Limit - Level XI (400/800) - 2016/03/01 1:33:54 ET' }
      , donation: 0.91
      , rake: 0.09
      , buyin: 1
      , ante: 50 }
    , table:
      { tableno: 3
      , maxseats: 9
      , button: 3
      , metadata:
         { lineno: 1
         , raw: 'Table \'1495192630 3\' 9-max Seat #3 is the button' } }
    , hero: 'held'
    , holecards:
      { card1: 'Qd'
      , card2: 'Qs'
      , metadata: { lineno: 13, raw: 'Dealt to held [Qd Qs]' } }
    , board:
      { card1: '8h'
      , card2: 'Kd'
      , card3: '2s'
      , card4: '6s'
      , card5: '4s'
      , metadata: { lineno: 31, raw: 'Board [8h Kd 2s 6s 4s]' } } })

  t.end()
})

test('\nHoldem.PokerStars: call all-in', function(t) {
  const txt = fs.readFileSync(path.join(holdem_ps, 'call-allin.txt'), 'utf8')
  const res = parse(txt)
  // ensure we correctly detect all-in for call and raise which happened on the flop for this hand
  spok(t, clean(res.flop), topic('flop',
    [ { player: 'DmelloH'
      , type: 'bet'
      , amount: 4598
      , metadata: { lineno: 19, raw: 'DmelloH: bets 4598' } }
    , { player: 'held'
      , type: 'raise'
      , amount: 14063
      , raiseTo: 18661
      , allin: true
      , metadata: { lineno: 20, raw: 'held: raises 14063 to 18661 and is all-in' } }
    , { player: 'DmelloH'
      , type: 'call'
      , amount: 10454
      , allin: true
      , metadata: { lineno: 21, raw: 'DmelloH: calls 10454 and is all-in' } } ]))
  t.end()
})

test('\nHoldem.PokerStars: player sitting out', function(t) {
  const txt = fs.readFileSync(path.join(holdem_ps, 'player-sitting-out.txt'), 'utf8')
  const res = parse(txt)
  const players = res.seats.map(x => x.player)
  // UP.itAA007 is sitting out, make sure he his include in the seats
  spok(t, players, topic('seats.player',
    [ 'vilmondesm',
      'josyyane',
      'FelP CasT',
      'Le0_nAArdo',
      'andreirsousa',
      'held',
      'frazioneto',
      'UP.itAA007',
      'ramonrdg' ]
  ))
  t.end()
})

test('\nHoldem.PokerStars: player collected before showdown', function(t) {
  const txt = fs.readFileSync(path.join(holdem_ps, 'collect-on-flop.txt'), 'utf8')
  const res = parse(txt)
  // trips1126 collected 97 during flop
  const lastFlopAction = res.flop.pop()
  spok(t, lastFlopAction,
    { $topic: 'last flop action'
    , player: 'trips1126'
    , type: 'collect'
    , amount: 97
    , metadata: { lineno: 39, raw: 'trips1126 collected 97 from pot' } })

  t.end()
})

test('\nHoldem.PokerStars: player with " " in name collected at showdown', function(t) {
  const txt = fs.readFileSync(path.join(holdem_ps, 'collected-on-showdown.txt'), 'utf8')
  const res = parse(txt)
  // marco capile collected 3080 from pot
  spok(t, res.showdown.pop(),
    { $topic: 'last showdown action'
    , player: 'marco capile'
    , type: 'collect'
    , amount: 3080
    , metadata: { lineno: 41, raw: 'marco capile collected 3080 from pot' } })

  t.end()
})

test('\nHoldem.PokerStars: player all-in vs. smaller stack has uncalled bet returned', function(t) {
  const txt = fs.readFileSync(path.join(holdem_ps, 'uncalled-bet-returned.txt'), 'utf8')
  const res = parse(txt)
  // Uncalled bet (325) returned to GuiTrettel
  spok(t, res.turn.pop(),
    { $topic: 'last turn action'
    , player: 'GuiTrettel'
    , type: 'bet-returned'
    , amount: 325
    , metadata: { lineno: 42, raw: 'Uncalled bet (325) returned to GuiTrettel' } })

  t.end()
})
