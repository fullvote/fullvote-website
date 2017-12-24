const Right = x => ({
  map: f => Right(f(x)),
  mapRespective: (f, g) => Right(g(x)),
  fold: (f, g) => g(x),
  val: () => x,
  inspect: () => `Right(${x})`
});

const Left = x => ({
  map: f => Left(x),
  mapRespective: (f, g) => Left(f(x)),
  fold: (f, g) => f(x),
  val: () => {
    throw x;
  },
  inspect: () => `Left(${x})`
});

module.exports = {
  Right,
  Left
};
