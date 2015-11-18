const lib = require('./index')
const test = require('tape')
const KF = lib.KF
const lerpKFs = lib.lerpKFs

test('linear works as expected', function (t) {
  const kfs = [
    new KF('linear', 0, 0),
    new KF('linear', 3, 9),
  ]
  const v0 = lerpKFs(kfs, 0)
  const v1 = lerpKFs(kfs, 1)
  const v2 = lerpKFs(kfs, 2)
  const v3 = lerpKFs(kfs, 3)

  t.same(v0, 0)
  t.same(v1, 3)
  t.same(v2, 6)
  t.same(v3, 9)
  t.end()
})

test('linear works for arrays', function (t) {
  const kfs = [
    new KF('linear', 0, [0, 0]),
    new KF('linear', 3, [9, 9]),
  ]

  const v0 = lerpKFs(kfs, 0)
  const v1 = lerpKFs(kfs, 1)
  const v2 = lerpKFs(kfs, 2)
  const v3 = lerpKFs(kfs, 3)

  t.same(v0, [0, 0])
  t.same(v1, [3, 3])
  t.same(v2, [6, 6])
  t.same(v3, [9, 9])
  t.end()
})
